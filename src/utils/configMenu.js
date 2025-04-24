import chalk from "chalk";
import inquirer from "inquirer";
import { addProject, removeProject, listProjects } from "./projects.js";

export const showConfigMenu = async () => {
  try {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          { name: "List projects", value: "list" },
          { name: "Add project", value: "add" },
          { name: "Remove project", value: "remove" },
          { name: "Exit", value: "exit" },
        ],
      },
    ]);

    switch (action) {
      case "list":
        const projects = listProjects();
        if (projects.length === 0) {
          console.log(chalk.yellow("\nNo projects configured.\n"));
        } else {
          console.log(chalk.blue("\nConfigured projects:"));
          projects.forEach((project, index) => {
            console.log(chalk.cyan(`${index + 1}. ${project}`));
          });
          console.log();
        }
        await showConfigMenu();
        break;

      case "add":
        const { repoName } = await inquirer.prompt([
          {
            type: "input",
            name: "repoName",
            message: "Enter project name:",
            validate: (input) => {
              if (!input) return "Project name is required";
              return true;
            },
          },
        ]);
        addProject(repoName);
        console.log(chalk.green("\nProject added successfully!\n"));
        await showConfigMenu();
        break;

      case "remove":
        const list = listProjects();
        if (list.length === 0) {
          console.log(chalk.yellow("\nNo projects to remove.\n"));
          await showConfigMenu();
        } else {
          const { projectToRemove } = await inquirer.prompt([
            {
              type: "list",
              name: "projectToRemove",
              message: "Select project to remove:",
              choices: list.map((project) => ({
                name: project,
                value: project,
              })),
            },
          ]);
          removeProject(projectToRemove);
          console.log(chalk.green("\nProject removed successfully!\n"));
          await showConfigMenu();
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
