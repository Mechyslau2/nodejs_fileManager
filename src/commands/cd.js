import path, { isAbsolute, normalize } from "path";
import { realpath } from "fs/promises";
import { EOL } from "os";

export const cd = async (url, target) => {
  const targetPath = target.map((item) => item.trim()).join(" ");

  const isAbsolutePath = isAbsolute(targetPath);
  const pathToFolder = isAbsolutePath ? targetPath : path.join(url, targetPath);
  const encodedPath = Buffer.from(pathToFolder, { encoding: 'utf8'}).toString();

  try {
    const realPath = await realpath(encodedPath);
    return normalize(realPath);
  } catch ({ code }) {
    if (code === "ENOENT") {
      console.log(`Operation failed${EOL}`);
    }
  }
};
