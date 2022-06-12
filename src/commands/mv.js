import { cp } from "./cp.js";

export const mv = async (url, target) => {
  await cp(url, target, true);
};
