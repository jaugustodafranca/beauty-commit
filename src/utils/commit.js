import { execSync } from "child_process";
import chalk from "chalk";
import { hasStagedFiles } from "./git.js";

export const createCommit = async (
  type,
  repoName = "",
  ticketNumber = "",
  message
) => {
  if (!hasStagedFiles()) {
    throw new Error(
      'No files staged for commit. Use "git add <file>" to stage files first.'
    );
  }

  try {
    const repoInfo = repoName ? `(${repoName})` : "";
    const ticketInfo = ticketNumber ? `[${ticketNumber}] ` : "";
    const commitMessage = `${type}${repoInfo}: ${ticketInfo}${message}`;
    execSync(`git commit -m "${commitMessage}"`);
    console.log(chalk.blue(`\nCommit message:`));
    console.log(chalk.blue(`${commitMessage}\n`));
    console.log(chalk.green("Commit created successfully!"));
  } catch (error) {
    throw new Error(`Failed to create commit: ${error.message}`);
  }
};
