import { EOL } from "os";
import cd from "../commands/cd.js";
import ls from "../commands/ls.js";
import up from "../commands/up.js";

const COMMANDS = {
  ls: (url) => ls(url),
  up: (url) => up(url),
  cd: (url, nextFolder) => cd(url, nextFolder),
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
