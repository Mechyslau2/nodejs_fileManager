import { EOL, homedir } from "os";
import runCommand from "./src/core/fileController.js";

const runManager = (args) => {
  const userName = args.join("").replace("--username=", "");
  let homePath = homedir();

  console.log(homePath);
  process.stdout.write(
    `Welcome to the File Manager, ${userName}!\nYou are currently in ${homePath} ${EOL}`
  );

  process.stdin.on("data", async(data) => {
    if (data.toString().match(".exit")) {
      process.stdout.write(
        `Thank you for using File Manager, ${userName}!${EOL}`
      );
      process.exit(0);
    } else if (data.toString().trim()) {
      const [command, ...params] = data.toString().split(" ");
      const src = await runCommand(command, homePath, params);
      homePath = src ? src : homePath;
      process.stdout.write(`You are currently in ${homePath} ${EOL}`);
    }
  });

  process.on("SIGINT", () => {
    console.log(`Thank you for using File Manager, ${userName}!${EOL}`);
    process.exit(0);
  });
};

runManager(process.argv.splice(2));
