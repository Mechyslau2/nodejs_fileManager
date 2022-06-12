import path from "path";
import { EOL } from "os";
import { rename, lstat } from "fs/promises";
import { realpath } from "fs";
import { splitFilePath } from "../utils/utils.js";

export const rn = async (url, target) => {
  if (target.length > 2) {
    console.log('Invalid input', EOL);
    return;
  }

  const [originFilePath, newFileName] = target;
  const originFileArray = originFilePath.split('/');
  const [renamedFile, folderPath] = splitFilePath(url, originFileArray);

  try {
    realpath(folderPath);
  } catch ({ code }) {
    if (code === "ENOENT") {
      console.log(`Operation failed${EOL}`);
    }
  }

  try {
    const targetName = await lstat(path.join(folderPath, newFileName));
    if (targetName.isFile()) {
      console.log(`Operation failed${EOL}`);
      return;
    }
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  try {
    await rename(
      path.join(folderPath, renamedFile),
      path.join(folderPath, newFileName)
    );
  } catch ({ code }) {
    if (code === "EEXIST") {
      console.log(`Operation failed${EOL}`);
    }
  }
};
