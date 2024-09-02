# VersionFlow

[![NPM Version](https://img.shields.io/npm/v/versionflow.svg?style=flat)]()
[![NPM License](https://img.shields.io/npm/l/all-contributors.svg?style=flat)](LICENSE)
[![NPM Downloads](https://img.shields.io/npm/dt/versionflow.svg?style=flat)]()

[![NPM](https://nodei.co/npm/versionflow.png?downloads=true)](https://www.npmjs.com/package/versionflow)

**VersionFlow** is a simple CLI tool for managing version flows in your projects. It helps you view and update the version of your project seamlessly, providing options to increment the version, update the phase, and manage versioning without the need for manual edits.

## Features

- View the current project version.
- Increment versions using semantic versioning ("patch", "minor", "major").
- Update the release phase (e.g., "alpha", "beta", "rc").
- Automatically commits, and creates a tag for you in your git repo.
- Updates your package.json version along the way, and provides a `.version` file, for in-code versioning.
- Silent updates without committing or tagging.
- Customize commit and tag messages.

## Installation

Install `versionflow` globally via npm:

```bash
npm install -g versionflow
```

## Usage

```bash
versionflow
```

### Basic Commands

- **View Current Version**:  
  Run `versionflow` with no arguments to display the current version.

- **Update Version**:  
  Use `versionflow [arguments]` to update the version or modify version flow.

### Arguments

- **`-h, --help`**  
  Displays the help information.

- **`-u, --update [patch/minor/major]`**  
  Increment the version. If no increment type is provided, the version will be updated without incrementing.

- **`-p, --phase <phase>`**  
  Update the phase (e.g., "alpha", "beta", "rc"). This does not increment the version unless specified.

- **`-s, --silent`**  
  Update the version without committing or tagging.

- **`-i, --init`**  
  Initialize VersionFlow in the current directory by creating a ".version" file.

- **`-S, --set <version>`**  
  Manually set a specific version.

- **`-m, --message <message>`**  
  Set a custom commit/tag message when updating the version. This is mandatory if you don't use `--silent`.

- **`-P, --push`**  
  Pushes after committing, this will run `git push --follow-tags`, which pushes all annotated tags to remote.


## Examples

1. **View Current Version**:
    ```
    versionflow
    ```
2. **Initialize VersionFlow in a New Project**:
    ```
    versionflow --init
    ```

3. **Increment Patch Version**:
    ```
    versionflow --update patch --message "fix latest bugs"
    ```

4. **Update phase to beta, Set version to 1.2.3, without committing**:
    ```
    versionflow --set 1.2.3 --phase beta --silent
    ```

5. **Silent version update without committing**:
    ```
    versionflow --update minor --silent
    ```


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## Support

If you encounter any issues or have questions, feel free to open an issue on [GitHub](https://github.com/kateonbxsh/VersionFlow/issues).

## Author

- **kateonbxsh** - [kateonbxsh](https://github.com/kateonbxsh)


