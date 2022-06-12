import { readdir } from 'fs/promises';
import { EOL } from 'os';

export const ls = async(url) => {
 try {
    const currentDir = await readdir(url);
    console.log(currentDir, EOL);
 } catch (error) {
    if (code === "ENOENT") {
        console.log(`Operation failed${EOL}`);
      }
 }
};
