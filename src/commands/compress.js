import path from "path";
import { EOL } from "os";
import { createWriteStream, createReadStream } from "fs";
import { realpath, lstat } from "fs/promises";
import { pipeline } from "stream/promises";
import zlib from "zlib";

import { splitFilePath, getTargetFolderPath } from "../utils/utils.js";

export const compress = async (url, params) => {
  if (params.length > 2) {
    console.log('Invalid input', EOL);
    return;
  }

  let [compressedFile, targetFolder] = params.map((item) => item.trim());
  const compressedFileArray = compressedFile.split("/");

  const [compressedFileName, compressedFolderPath] = splitFilePath(
    url,
    compressedFileArray
  );

  targetFolder = targetFolder || compressedFolderPath;
  const targetFolderPath = getTargetFolderPath(url, targetFolder);

  try {
    await realpath(path.join(compressedFolderPath, compressedFileName));
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

  const newFileName = `${compressedFileName}.br`;

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
      path.join(compressedFolderPath, compressedFileName),
      { encoding: "utf8" }
    );

    const writeStream = createWriteStream(
      path.join(targetFolderPath, newFileName)
    );
    const brotliCompress = zlib.createBrotliCompress();

    await pipeline(readStream, writeStream, brotliCompress);
  } catch ({ code }) {
    if (code === "EEXIST") {
      console.log(`Operation failed${EOL}`);
    }
  }
};
