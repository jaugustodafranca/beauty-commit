import { execSync } from "child_process";

export const getCurrentBranchName = () => {
  try {
    return execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
  } catch {
    return "";
  }
};

export const extractTicketFromBranch = (branchName) => {
  const match = branchName.match(/\/([A-Za-z]+-\d+)/);
  return match ? match[1] : "";
};
