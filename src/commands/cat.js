import { createReadStream } from "fs";
import path from "path";
import { EOL } from "os";
import { splitFilePath } from "../utils/utils.js";

export const cat = async (url, target) => {
  if (target.length > 1) {
    console.log('Invalid input', EOL);
    return;
  }
  
  const [fileToRead] = target;
  const fileToReadArray = fileToRead.split("/");

  const [readFileName, readFolderPath] = splitFilePath(url, fileToReadArray);

  try {
    const content = createReadStream(path.join(readFolderPath, readFileName), {
      encoding: "utf8",
    });

    content.on("data", (data) => {
      console.log(`${data}${EOL}`);
    });

    content.on("error", ({ code }) => {
      if (code === "ENOENT") {
        console.log(`Operation failed${EOL}`);
      }
    });
  } catch ({ code }) {
    if (code === "ENOENT") {
      console.log(`Operation failed${EOL}`);
    }
  }
};
