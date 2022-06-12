import { EOL } from "os";
import path from "path";
import { rm as remove } from "fs/promises";

import { splitFilePath } from "../utils/utils.js";

export const rm = async (url, target) => {
  if (target?.length > 1) {
    console.log(`Operation failed${EOL}`);
    return;
  }

  const [fileToRemove] = target.map((item) => item.trim());
  const fileToRemoveArray = fileToRemove.split("/");

  if (fileToRemove.length <= 1) {
    console.log(`Operation failed${EOL}`);
    return;
  }

  const [removedFileName, removedFolderPath] = splitFilePath(
    url,
    fileToRemoveArray
  );

  try {
    await remove(path.join(removedFolderPath, removedFileName));
  } catch ({ code }) {
    if (code === "ENOENT") {
      console.log(`Operation failed${EOL}`);
    }
  }
};
