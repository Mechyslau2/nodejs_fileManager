import { EOL } from "os";

const runManager = (args) => {
  const userName = args.join("").replace("--username=", "");

  process.stdout.write(`Welcome to the File Manager, ${userName}!${EOL}`);
  process.stdin.on("data", (data) => {
    if (data.toString().match(".exit")) {
      process.stdout.write(
        `Thank you for using File Manager, ${userName}!${EOL}`
      );
      process.exit(0);
    }
  });

  process.on("SIGINT", () => {
    console.log(`Thank you for using File Manager, ${userName}!${EOL}`);
  });
};

runManager(process.argv.splice(2));
