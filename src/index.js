#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";

import { listRepositories } from "./utils/repositories.js";
import { createCommit } from "./utils/commit.js";
import { hasStagedFiles } from "./utils/git.js";
import { COMMIT_TYPES } from "./utils/constants.js";
import { showRepositoriesMenu } from "./utils/repositoriesMenu.js";

console.log(chalk.magenta("\n✨ 💅 Beauty Commit 💫 ✨\n"));
console.log(chalk.cyan("A CLI tool to help standardize git commit messages\n"));

program.name("commit").version("1.0.0");

program
  .command("config")
  .description("Configure repositories")
  .action(showRepositoriesMenu);

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

    const { useRepository } = await inquirer.prompt([
      {
        type: "list",
        name: "useRepository",
        message: "Do you want to specify a repository?",
        choices: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
      },
    ]);

    let repoName = "";
    if (useRepository) {
      const repositories = listRepositories();

      if (repositories.length === 0) {
        console.log(
          chalk.yellow(
            '\nNo repositories configured. Please run "commit config" first.'
          )
        );

        const { continueWithout } = await inquirer.prompt([
          {
            type: "list",
            name: "continueWithout",
            message: "Continue without repository?",
            choices: [
              { name: "Yes", value: true },
              { name: "No", value: false },
            ],
          },
        ]);

        if (!continueWithout) {
          return;
        }
      } else {
        const { selectedRepo } = await inquirer.prompt([
          {
            type: "list",
            name: "selectedRepo",
            message: "Select repository:",
            choices: repositories.map((repo) => ({ name: repo, value: repo })),
          },
        ]);
        repoName = selectedRepo;
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
