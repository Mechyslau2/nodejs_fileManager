import path, { format, parse } from "path";

const getUpFolderPath = (srcObject) => {
  const { root, dir: currentDirection } = srcObject;
  const prevFolder = parse(currentDirection);

  return prevFolder.base === root
    ? srcObject
    : { ...srcObject, ...prevFolder };
};

export const up = (url) => {
  const srcObject = path.parse(url);
  const newUrl = getUpFolderPath(srcObject);
  return format(newUrl);
};
