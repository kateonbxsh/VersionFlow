# VersionFlow

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
  Set a custom commit/tag message when updating the version. This is mandatory if using git for version management.

## Examples

1. **View Current Version**:
    ```
    versionflow
    ```

2. **Increment Patch Version**:
    ```
    versionflow --update patch
    ```

3. **Set a Specific Version**:
    ```
    versionflow --set 1.2.3
    ```

4. **Update Phase to Beta**:
    ```
    versionflow --phase beta
    ```

5. **Silent Version Update Without Committing**:
    ```
    versionflow --update minor --silent
    ```

6. **Initialize VersionFlow in a New Project**:
    ```
    versionflow --init
    ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## Support

If you encounter any issues or have questions, feel free to open an issue on [GitHub](https://github.com/yourusername/versionflow/issues).

## Author

- **kateonbxsh** - [kateonbxsh](https://github.com/kateonbxsh)


