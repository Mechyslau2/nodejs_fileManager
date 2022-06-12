import { EOL } from "os";
import {
  add,
  cat,
  cd,
  ls,
  up,
  cp,
  rn,
  mv,
  rm,
  hash,
  compress,
  decompress,
} from "../commands/index.js";
import { os } from "../commands/os/os.js";

const COMMANDS = {
  cat: (url, file) => cat(url, file),
  add: (url, newFile) => add(url, newFile),
  cp: (url, file) => cp(url, file),
  mv: (url, file) => mv(url, file),
  ls: (url, params) => ls(url, params),
  up: (url, params) => up(url, params),
  cd: (url, nextFolder) => cd(url, nextFolder),
  rn: (url, params) => rn(url, params),
  rm: (url, removeFilepath) => rm(url, removeFilepath),
  os: (url, params) => os(url, params),
  hash: (url, filePath) => hash(url, filePath),
  compress: (url, params) => compress(url, params),
  decompress: (url, params) => decompress(url, params),
};

const runCommand = (command, url, params) => {
  const inputCommand = command.trim();
  const paramsArray = params.map(item => item.trim()).filter(item => item);

  if (Object.keys(COMMANDS).includes(inputCommand)) {
    return COMMANDS[inputCommand](url, paramsArray);
  } else {
    console.log(`Invalid input ${EOL}`);
  }
};

export default runCommand;
