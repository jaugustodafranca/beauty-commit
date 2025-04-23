import { execSync } from "child_process";
import chalk from "chalk";

export const hasStagedFiles = () => {
  try {
    const stagedFiles = execSync("git diff --staged --name-only")
      .toString()
      .trim();
    return stagedFiles.length > 0;
  } catch (error) {
    console.error(chalk.red("Error checking staged files:"), error.message);
    return false;
  }
};
