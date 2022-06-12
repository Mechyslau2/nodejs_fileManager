import path from "path";
import { EOL } from "os";
import { createWriteStream, createReadStream } from "fs";
import { realpath, lstat } from "fs/promises";
import { pipeline } from "stream/promises";
import zlib from "zlib";

import { splitFilePath, getTargetFolderPath } from "../utils/utils.js";

export const decompress = async (url, params) => {
  if (params.length > 2) {
    console.log('Invalid input', EOL);
    return;
  }

  let [decompressedFile, targetFolder] = params.map((item) => item.trim());
  const decompressedFileArray = decompressedFile.split("/");

  const [decompressedFileName, decompressedFolderPath] = splitFilePath(
    url,
    decompressedFileArray
  );

  targetFolder = targetFolder || decompressedFolderPath;
  const targetFolderPath = getTargetFolderPath(url, targetFolder);

  try {
    await realpath(path.join(decompressedFolderPath, decompressedFileName));
  } catch ({ code }) {
    if (code === "ENOENT") {
      console.log(`Operation failed${EOL}`);
    }
  }

  try {
    await realpath(path.join(targetFolderPath));
  } catch ({ code }) {
    if (code === "ENOENT") {
      console.log(`Operation failed${EOL}`);
    }
  }

  const newFileName = decompressedFileName.slice(0, -3);

  try {
    const targetFileInFolder = await lstat(
      path.join(targetFolderPath, newFileName)
    );
    if (targetFileInFolder.isFile()) {
      console.log(`Operation failed${EOL}`);
      return;
    }
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  try {
    const readStream = createReadStream(
      path.join(decompressedFolderPath, decompressedFileName)
    );

    const writeStream = createWriteStream(
      path.join(targetFolderPath, newFileName)
    );
    const unzip = zlib.createBrotliDecompress();

    await pipeline(unzip, readStream, writeStream);
  } catch ({ code }) {
    if (code === "EEXIST") {
      console.log(`Operation failed${EOL}`);
    }
  }
};
