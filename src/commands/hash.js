import { EOL } from "os";
import path from "path";
import { createReadStream } from "fs";
import { createHash } from "crypto";

import { splitFilePath } from "../utils/utils.js";

export const hash = async (url, target) => {
  if (target.length > 1) {
    console.log(`Operation failed${EOL}`);
    return;
  }

  const [fileToHash] = target.map((item) => item.trim());
  const fileToHashArray = fileToHash.split("/");

  if (fileToHash.length <= 1) {
    console.log(`Operation failed${EOL}`);
    return;
  }

  const [hashFileName, hashFolderPath] = splitFilePath(url, fileToHashArray);

  try {
    const hash = createHash("sha256");

    const hashFile = await new Promise((res, rej) => {
      const stream = createReadStream(path.join(hashFolderPath, hashFileName), {
        encoding: "utf8",
      });
      stream.on("data", res);
      stream.on("error", rej);
    });

    const update = await hash.update(hashFile);
    const result = await update.digest("hex");
    console.log(result, EOL);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(`Operation failed${EOL}`);
    }
  }
};
