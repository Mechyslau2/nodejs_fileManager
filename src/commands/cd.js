import path, { isAbsolute, normalize } from "path";
import { realpath } from "fs/promises";
import { EOL } from "os";

const cd = async (url, target) => {
  const targetPath = target.map((item) => item.trim()).join(" ");

  const isAbsolutePath = isAbsolute(targetPath);
  const pathToFolder = isAbsolutePath ? targetPath : path.join(url, targetPath);

  try {
    const realPath = await realpath(pathToFolder);
    const normalizedPath = normalize(realPath);
    return normalizedPath;
  } catch ({ code }) {
    if (code === "ENOENT") {
      console.log(`Operation failed${EOL}`);
    }
  }
};

export default cd;
