import chalk from "chalk";

export const COMMIT_TYPES = [
  {
    message: `${chalk.cyan("feat")}: New feature`,
    value: "feat",
  },
  { message: `${chalk.cyan("fix")}: Bug fix`, value: "fix" },
  {
    message: `${chalk.cyan("refactor")}: Code refactoring`,
    value: "refactor",
  },
  {
    message: `${chalk.cyan("chore")}: Build process or tooling changes`,
    value: "chore",
  },
  {
    message: `${chalk.cyan("revert")}: Reverts a previous commit`,
    value: "revert",
  },
  {
    message: `${chalk.cyan("style")}: Code style changes (formatting, etc)`,
    value: "style",
  },
  {
    message: `${chalk.cyan("ci")}: CI related changes`,
    value: "ci",
  },
  {
    message: `${chalk.cyan("perf")}: Performance improvements`,
    value: "perf",
  },
  {
    message: `${chalk.cyan("docs")}: Documentation changes`,
    value: "docs",
  },
  {
    message: `${chalk.cyan("test")}: Adding or updating tests`,
    value: "test",
  },
];
