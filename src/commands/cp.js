import path from "path";
import { EOL } from "os";
import { createWriteStream, createReadStream } from "fs";
import { lstat, realpath, rm } from "fs/promises";
import { pipeline } from "stream/promises";

import { splitFilePath, getTargetFolderPath } from "../utils/utils.js";

export const cp = async (url, target, deleteFlag = false) => {
  if (target.length <= 1) {
    console.log(`Operation failed${EOL}`);
    return;
  }

  const [copedFile, targetFolder] = target.map((item) => item.trim());
  const copedFileArray = copedFile.split('/');

  const [copedFileName, copedFolderPath] = splitFilePath(url, copedFileArray);
  const targetFolderPath = getTargetFolderPath(url, targetFolder);

  try {
    await realpath(path.join(copedFolderPath, copedFileName));
  } catch ({ code }) {
    if (code === "ENOENT") {
      console.log(`Operation failed${EOL}`);
    }
  }

  try {
    await realpath(path.join(targetFolderPath));
  }catch ({ code }) {
    if (code === "ENOENT") {
      console.log(`Operation failed${EOL}`);
    }
  }

  try {
    const targetFileInFolder = await lstat(
      path.join(targetFolderPath, copedFileName)
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
      path.join(copedFolderPath, copedFileName),
      { encoding: "utf8" }
    );

    const writeStream = createWriteStream(
      path.join(targetFolderPath, copedFileName)
    );

    await pipeline(readStream, writeStream);

    if (deleteFlag) {
      await rm(path.join(copedFolderPath, copedFileName));
    }
  } catch ({ code }) {
    if (code === "EEXIST") {
      console.log(`Operation failed${EOL}`);
    }
  }
};
