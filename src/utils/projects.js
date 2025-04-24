import { getConfig, saveConfig } from "./configFileManager.js";

export const listProjects = () => {
  const config = getConfig();
  return config.projects;
};

export const addProject = (repoName) => {
  const config = getConfig();

  if (config.projects.includes(repoName)) {
    throw new Error("Project already configured.");
  }

  config.projects.push(repoName);
  saveConfig(config);
};

export const removeProject = (repoName) => {
  const config = getConfig();

  const index = config.projects.indexOf(repoName);
  if (index === -1) {
    throw new Error("Project not found in configuration.");
  }

  config.projects.splice(index, 1);
  saveConfig(config);
};
