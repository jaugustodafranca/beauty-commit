import { getConfig, saveConfig } from "./configStorage.js";

export const listRepositories = () => {
  const config = getConfig();
  return config.repositories;
};

export const addRepository = (repoName) => {
  const config = getConfig();

  if (config.repositories.includes(repoName)) {
    throw new Error("Repository already configured.");
  }

  config.repositories.push(repoName);
  saveConfig(config);
};

export const removeRepository = (repoName) => {
  const config = getConfig();

  const index = config.repositories.indexOf(repoName);
  if (index === -1) {
    throw new Error("Repository not found in configuration.");
  }

  config.repositories.splice(index, 1);
  saveConfig(config);
};
