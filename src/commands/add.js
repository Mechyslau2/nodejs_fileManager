import path from "path";
import { createWriteStream } from "fs";
import { lstat } from "fs/promises";
import { EOL } from "os";

export const add = async (url, target) => {
  const [fileName] = target.map((item) => item.trim());

  if (target.length > 1) {
    console.log('Invalid input', EOL);
    return;
  }

  try {
    const file = await lstat(path.join(url, fileName));
    if (file.isFile()) {
      console.log(`Operation failed${EOL}`);
      return;
    }
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  const writeStream = createWriteStream(path.join(url, fileName), (error) => {
    if (error) {
      console.log(`Operation failed${EOL}`);
    }
  });

  writeStream.end();
};
