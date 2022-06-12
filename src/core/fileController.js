import { EOL } from "os";
import { add, cat, cd, ls, up, cp, rn, mv, rm } from "../commands/index.js";

const COMMANDS = {
  cat: (url, file) => cat(url, file),
  add: (url, newFile) => add(url, newFile),
  cp: (url, file) => cp(url, file),
  mv: (url, file) => mv(url, file),
  ls: (url) => ls(url),
  up: (url) => up(url),
  cd: (url, nextFolder) => cd(url, nextFolder),
  rn: (url, params) => rn(url, params),
  rm: (url, removeFilepath) => rm(url, removeFilepath),
};

const runCommand = (command, url, params) => {
  const inputCommand = command.trim();
  if (Object.keys(COMMANDS).includes(inputCommand)) {
    return COMMANDS[inputCommand](url, params);
  } else {
    console.log(`Invalid input ${EOL}`);
  }
};

export default runCommand;
