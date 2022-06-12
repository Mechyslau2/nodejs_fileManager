import path, { format, parse } from "path";
import { EOL } from 'os';

const getUpFolderPath = (srcObject) => {
  const { root, dir: currentDirection } = srcObject;
  const prevFolder = parse(currentDirection);

  return prevFolder.base === root
    ? srcObject
    : { ...srcObject, ...prevFolder };
};

export const up = (url, params) => {
  if (params.length) {
    console.log('Invalid input', EOL);
    return;
  }

  const srcObject = path.parse(url);
  const newUrl = getUpFolderPath(srcObject);
  return format(newUrl);
};
