import fs from "fs";
import path from "path";
import os from "os";
import chalk from "chalk";

const CONFIG_DIR = path.join(os.homedir(), ".beauty-commit");
const CONFIG_FILE = path.join(CONFIG_DIR, "config.json");

const ensureConfigDir = () => {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
};

const migrateConfig = (config) => {
  if (config.repositories) {
    config.projects = [...config.repositories];
    delete config.repositories;
    console.log(
      chalk.cyan("Migrated configuration from 'repositories' to 'projects'")
    );
    saveConfig(config);
    return config;
  }

  if (!config.projects) {
    config.projects = [];
  }

  return config;
};

export const getConfig = () => {
  ensureConfigDir();
  if (!fs.existsSync(CONFIG_FILE)) {
    return { projects: [] };
  }
  try {
    const configData = fs.readFileSync(CONFIG_FILE, "utf8");
    const config = JSON.parse(configData);
    return migrateConfig(config);
  } catch (error) {
    console.error(chalk.red("Error reading config file:"), error.message);
    return { projects: [] };
  }
};

export const saveConfig = (config) => {
  ensureConfigDir();
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
  } catch (error) {
    console.error(chalk.red("Error saving config file:"), error.message);
    throw error;
  }
};
