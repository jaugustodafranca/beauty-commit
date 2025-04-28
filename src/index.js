#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import enquirer from "enquirer";
const { Select, Input } = enquirer;

import { createCommit } from "./utils/commit.js";
import { hasStagedFiles } from "./utils/git.js";
import { COMMIT_TYPES } from "./utils/constants.js";
import { getProjectName } from "./utils/getProjectName.js";
import {
  getCurrentBranchName,
  extractTicketFromBranch,
} from "./utils/gitHelpers.js";

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

    // Select commit type
    const typePrompt = new Select({
      name: "type",
      message: "Select the type of commit:",
      choices: COMMIT_TYPES,
    });
    const type = await typePrompt.run();

    // Project name (suggestion)
    const suggestedProjectName = getProjectName();
    const projectPrompt = new Input({
      name: "repoName",
      message: "Enter project name (optional):",
      initial: suggestedProjectName,
    });
    const repoName = await projectPrompt.run();

    // Ticket number (suggestion from branch)
    const branchName = getCurrentBranchName();
    const suggestedTicket = extractTicketFromBranch(branchName);
    const ticketPrompt = new Input({
      name: "ticketNumber",
      message: "Enter ticket number (optional):",
      initial: suggestedTicket,
    });
    const ticketNumber = await ticketPrompt.run();

    // Commit message
    const messagePrompt = new Input({
      name: "message",
      message: "Enter commit description:",
      validate: (input) => (input ? true : "Description is required"),
    });
    const message = await messagePrompt.run();

    await createCommit(type, repoName, ticketNumber, message);
  } catch (error) {
    console.error(chalk.red("Error creating commit:"), error.message);
  }
});

program.parse();
