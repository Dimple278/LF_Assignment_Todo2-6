import fs from "fs";
import path from "path";

const getFilePath = (fileName: string): string => {
  return path.resolve(__dirname, `../data/${fileName}.json`);
};

export const readFromFile = (fileName: string): any => {
  const filePath = getFilePath(fileName);
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

export const writeToFile = (fileName: string, data: any): void => {
  const filePath = getFilePath(fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};
