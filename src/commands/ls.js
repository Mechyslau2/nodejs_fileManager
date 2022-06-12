import { readdir } from 'fs/promises';
import { EOL } from 'os';

export const ls = async(url, params) => {
   if (params.length) {
      console.log('Invalid input', EOL);
      return;
   }

 try {
    const currentDir = await readdir(url);
    console.log(currentDir, EOL);
 } catch (error) {
    if (code === "ENOENT") {
        console.log(`Operation failed${EOL}`);
      }
 }
};
