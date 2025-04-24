#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";

import { listProjects } from "./utils/projects.js";
import { createCommit } from "./utils/commit.js";
import { hasStagedFiles } from "./utils/git.js";
import { COMMIT_TYPES } from "./utils/constants.js";
import { showConfigMenu } from "./utils/configMenu.js";

console.log(chalk.magenta("\n✨ 💅 Beauty Commit 💫 ✨\n"));
console.log(chalk.cyan("A CLI tool to help standardize git commit messages\n"));

program.name("commit").version("1.0.0");

program
  .command("config")
  .description("Configure projects")
  .action(showConfigMenu);

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
      const projects = listProjects();

      if (projects.length === 0) {
        console.log(
          chalk.yellow(
            '\nNo projects configured. Please run "commit config" first.'
          )
        );

        const { continueWithout } = await inquirer.prompt([
          {
            type: "list",
            name: "continueWithout",
            message: "Continue without Project?",
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
            message: "Select Project:",
            choices: projects.map((repo) => ({ name: repo, value: repo })),
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
