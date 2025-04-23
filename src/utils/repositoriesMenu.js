import chalk from "chalk";
import inquirer from "inquirer";
import {
  addRepository,
  removeRepository,
  listRepositories,
} from "./repositories.js";

/**
 * Interactive menu to manage repositories
 */
export const showRepositoriesMenu = async () => {
  try {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          { name: "List repositories", value: "list" },
          { name: "Add repository", value: "add" },
          { name: "Remove repository", value: "remove" },
          { name: "Exit", value: "exit" },
        ],
      },
    ]);

    switch (action) {
      case "list":
        const repositories = listRepositories();
        if (repositories.length === 0) {
          console.log(chalk.yellow("\nNo repositories configured.\n"));
        } else {
          console.log(chalk.blue("\nConfigured repositories:"));
          repositories.forEach((repo, index) => {
            console.log(chalk.cyan(`${index + 1}. ${repo}`));
          });
          console.log();
        }
        await showRepositoriesMenu();
        break;

      case "add":
        const { repoName } = await inquirer.prompt([
          {
            type: "input",
            name: "repoName",
            message: "Enter repository name:",
            validate: (input) => {
              if (!input) return "Repository name is required";
              return true;
            },
          },
        ]);
        addRepository(repoName);
        console.log(chalk.green("\nRepository added successfully!\n"));
        await showRepositoriesMenu();
        break;

      case "remove":
        const repos = listRepositories();
        if (repos.length === 0) {
          console.log(chalk.yellow("\nNo repositories to remove.\n"));
          await showRepositoriesMenu();
        } else {
          const { repoToRemove } = await inquirer.prompt([
            {
              type: "list",
              name: "repoToRemove",
              message: "Select repository to remove:",
              choices: repos.map((repo) => ({ name: repo, value: repo })),
            },
          ]);
          removeRepository(repoToRemove);
          console.log(chalk.green("\nRepository removed successfully!\n"));
          await showRepositoriesMenu();
        }
        break;

      case "exit":
        console.log(chalk.blue("\nGoodbye!"));
        break;
    }
  } catch (error) {
    console.error(chalk.red("Error:"), error.message);
  }
};
