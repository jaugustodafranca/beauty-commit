# ✨ 💅 Beauty Commit 💫 ✨

A CLI tool to help standardize git commit messages

## Installation

```bash
# Using yarn
yarn global add beauty-commit

# Using npm
npm install -g beauty-commit
```

## Usage

The CLI provides a single command:

### Create a commit

```bash
commit
```

This will guide you through an interactive process:

1. Check if there are staged files for commit
2. Select the type of commit (feat, fix, refactor, etc.)
3. Choose whether to include the project name (optional)
   - The project name will be automatically read from the `package.json` in the root of your project but you can also edit.
4. Enter an optional ticket number
   - The ticket will be automatically read from branch name based in the format `text/TEAM-123`, in other words, the ticket should be after `/`. In this example the suggestion will be `TEAM-123`
5. Enter a commit description

The commit message will be formatted as: `type(project): [TICKET-123] description`

> **Note**: The command automatically checks if there are staged files for commit. If there are none, it will show an error message and not proceed with the process.

#### How the project name is determined

If you choose to include the project name, the CLI will search for a `package.json` file starting from your current directory and moving up to the root. The value of the `name` field in the first `package.json` found will be used as the project name.  
If no `package.json` is found, the commit will proceed without a project name.

## Troubleshooting

### Command not found after installing with Yarn

If you installed with `yarn global add beauty-commit` but get a "command not found" error when trying to run `commit`, you need to add Yarn's global bin directory to your PATH:

1. Find where Yarn installs global binaries:

   ```bash
   yarn global bin
   ```

2. Add this path to your shell profile (.bashrc, .zshrc, etc.):

   ```bash
   # For zsh (add to ~/.zshrc)
   export PATH="$(yarn global bin):$PATH"

   # For bash (add to ~/.bashrc or ~/.bash_profile)
   export PATH="$(yarn global bin):$PATH"
   ```

3. Reload your terminal or run:
   ```bash
   source ~/.zshrc  # or source ~/.bashrc
   ```

Alternatively, you can use npm for global installations:

```bash
npm install -g beauty-commit
```

## License

MIT
