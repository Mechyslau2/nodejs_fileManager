import { EOL, cpus, homedir, arch } from "os";
import path from "path";

export const os = (url = "", params) => {
  if (params.length > 1) {
    console.log("Invalid input", EOL);
    return;
  }

  const paramsCommand = params.join("");

  switch (paramsCommand) {
    case "--EOL": {
      const eol = JSON.stringify(EOL);
      console.log(`EOL: ${eol}`, EOL);
      return;
    }
    case "--cpus": {
      let cpusInfo = cpus().reduce((acc, processorInfo) => {
        const { model: info } = processorInfo;
        const [modelInfo, speed] = info.split("@").map((item) => item.trim());
        const model = modelInfo.replace("CPU", "").trim();
        acc.push({ model, speed });
        return acc;
      }, []);
      const totalCPU = cpus().length;
      cpusInfo = [{ totalCPU }, ...cpusInfo];

      console.log(cpusInfo, EOL);
      return;
    }
    case "--username": {
      const userName = homedir().split(path.sep).pop();
      console.log(`Username: ${userName}`, EOL);
      return;
    }
    case "--homedir": {
      console.log(`Home direction: ${homedir()}`, EOL);
      return;
    }
    case "--architecture": {
      console.log(`Architecture: ${arch()}`, EOL);
      return;
    }
    default: {
      console.log("Invalid input", EOL);
    }
  }
};
