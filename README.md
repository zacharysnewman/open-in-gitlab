# Open in Gitlab

## Overview

**Open in Gitlab** is a Visual Studio Code extension that allows you to quickly open files from your project directly in Gitlab. With a simple right-click, you can navigate to the corresponding file in your organization's Gitlab instance.

## Features

- **Quick Access:** Open any file in Gitlab directly from VS Code.
- **Customizable Settings:** Configure the Gitlab base path to match your project's structure.
- **Seamless Integration:** Integrates with the VS Code explorer context menu for easy access.

## Installation

1. **Install the Extension:**

   - Open the Extensions view in VS Code (`Ctrl+Shift+X` or `Cmd+Shift+X`).
   - Search for "**Open in Gitlab**".
   - Click **Install** to add the extension to your VS Code.

## Usage

1. **Configure the Extension Settings:**

   - Open VS Code settings (`Ctrl+,` or `Cmd+,`).
   - Search for **Open in Gitlab** to find the extension's settings.
   - Set the following configuration options:

     - **Base Path (`openInGitlab.basePath`):**

       - The base path used in the Gitlab URL (e.g., "code.company.com/path").

2. **Using the Extension:**

   - In the VS Code explorer, right-click on a file.
   - Select **Open in Gitlab** from the context menu.
   - The corresponding file will open in your default web browser via Gitlab.

## Configuration Options

The extension can be customized through the following settings:

### `openInGitlab.basePath`

- **Type:** `string`
- **Default:** "your-base-path"
- **Description:** The base path in the Gitlab URL after the domain. This may include paths specific to your organization's Gitlab setup.

## Example Configuration

You should configure the extension settings as follows:

- **Base Path:**

  "https://code.company.com/path"

With these settings, the extension constructs the Gitlab URL as:

```
https://code.company.com/path/<workspace-folder>/-/blob/<headBranchName>/<relativeFilePath>
```

## Troubleshooting

- **Incorrect URL Structure:**

  - Double-check your `basePath` settings to ensure they match your organization's Gitlab URL structure.

## License

This extension is licensed under the MIT License.
