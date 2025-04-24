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

The CLI provides two commands:

### 1. Create a commit

```bash
commit
```


This will guide you through an interactive process:

1. Check if there are staged files for commit
2. Select the type of commit (feat, fix, refactor, etc.)
3. Select a project (optional)
4. Enter an optional ticket number (optional)
5. Enter a commit description

Create a commit with the format: `type(project): [TICKET-123] description`

> **Note**: The command automatically checks if there are staged files for commit. If there are none, it will show an error message and not proceed with the process.

### 2. Configure project

```bash
commit config
```
ou
```bash
beauty-commit config
```

This will show an interactive menu where you can:

- List configured project
- Add a new project
- Remove a project
- Exit

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
