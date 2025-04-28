#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";

import { createCommit } from "./utils/commit.js";
import { hasStagedFiles } from "./utils/git.js";
import { COMMIT_TYPES } from "./utils/constants.js";
import { getProjectName } from "./utils/getProjectName.js";

console.log(chalk.magenta("\n✨ 💅 Beauty Commit 💫 ✨\n"));
console.log(chalk.cyan("A CLI tool to help standardize git commit messages\n"));

program.name("commit").version("1.1.2");

program.action(async () => {
  try {
    if (!hasStagedFiles()) {
      console.error(chalk.red("Error: No files staged for commit."));
      console.log(
        chalk.yellow('Tip: Use "git add <file>" to stage files first.')
      );
      return;
    }

    const { type } = await inquirer.prompt([
      {
        type: "list",
        name: "type",
        message: "Select the type of commit:",
        choices: COMMIT_TYPES,
      },
    ]);

    const { useProject } = await inquirer.prompt([
      {
        type: "list",
        name: "useProject",
        message: "Do you want to specify a Project?",
        choices: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
      },
    ]);

    let repoName = "";
    if (useProject) {
      repoName = getProjectName();
      if (!repoName) {
        console.log(
          chalk.red(
            "\nCould not find project name in package.json. Commit will proceed without project name.\n"
          )
        );
      }
    }

    const { ticketNumber } = await inquirer.prompt([
      {
        type: "input",
        name: "ticketNumber",
        message: "Enter ticket number (optional):",
        default: "",
      },
    ]);

    const { message } = await inquirer.prompt([
      {
        type: "input",
        name: "message",
        message: "Enter commit description:",
        validate: (input) => {
          if (!input) return "Description is required";
          return true;
        },
      },
    ]);

    await createCommit(type, repoName, ticketNumber, message);
  } catch (error) {
    console.error(chalk.red("Error creating commit:"), error.message);
  }
});

program.parse();
