import path, { format, parse } from "path";

const getUpFolderPath = (srcObject) => {
  const { root, dir: currentDirection } = srcObject;
  const prevFolder = parse(currentDirection);
  return prevFolder.dir.localeCompare(root) > 0
    ? srcObject
    : { ...srcObject, ...prevFolder };
};

const up = (url) => {
  const srcObject = path.parse(url);
  const newUrl = getUpFolderPath(srcObject);
  return format(newUrl);
};

export default up;
