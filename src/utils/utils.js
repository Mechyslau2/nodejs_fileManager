import path, { isAbsolute, normalize } from "path";

export const getTargetFolderPath = (url, stringPath) => {
  const resolvedFolderPath = isAbsolute(stringPath)
    ? stringPath
    : path.join(url, stringPath);
  return normalize(resolvedFolderPath);
};

export const splitFilePath = (url, originFilePathArray) => {
  const fileName = originFilePathArray.pop();
  const copyPath = originFilePathArray.join("/");
  const normalizedPath = getTargetFolderPath(url, copyPath);

  const folderPath = normalizedPath || url;
  const targetFileName = fileName || filePath;

  return [targetFileName, folderPath];
};
