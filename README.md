# Open in Gitlab

## Overview

**Open in Gitlab** is a Visual Studio Code extension that allows you to quickly open files from your project directly in Gitlab. With a simple right-click, you can navigate to the corresponding file in your organization's Gitlab instance.

## Features

- **Quick Access:** Open any file in Gitlab directly from VS Code.
- **Customizable Settings:** Configure the GitLab instance URL to point at gitlab.com or any self-hosted instance.
- **Seamless Integration:** Integrates with the VS Code explorer context menu and command palette for easy access.

## Installation

| Editor | Link |
|--------|------|
| VS Code | [Install from Marketplace](https://marketplace.visualstudio.com/items?itemName=zacharysnewman.open-in-gitlab) |
| Cursor / other VS Code-compatible editors | [Install from Open VSX](https://open-vsx.org/extension/zacharysnewman/open-in-gitlab) |

Or search for **"Open in Gitlab"** in your editor's Extensions panel.

## Usage

1. **Configure the Extension Settings:**

   - Open VS Code settings (`Ctrl+,` or `Cmd+,`).
   - Search for **Open in Gitlab** to find the extension's settings.
   - Set the following configuration options:

     - **Instance URL (`openInGitlab.instanceUrl`):**

       - The full URL of your GitLab instance (e.g., `https://gitlab.com` or `https://gitlab.mycompany.com`). Defaults to `https://gitlab.com`.

2. **Using the Extension:**

   - In the VS Code explorer, right-click on a file and select **Open in Gitlab** from the context menu, **or**
   - Open the command palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and run **Open in Gitlab** to open the currently active file.
   - The corresponding file will open in your default web browser.

## Configuration Options

The extension can be customized through the following settings:

### `openInGitlab.instanceUrl`

- **Type:** `string`
- **Default:** `"https://gitlab.com"`
- **Description:** The full URL of your GitLab instance. Use the default for gitlab.com or set this to your self-hosted instance (e.g. `https://gitlab.mycompany.com`).

## Example Configuration

For a self-hosted instance, set:

```json
"openInGitlab.instanceUrl": "https://gitlab.mycompany.com"
```

With that setting, the extension constructs URLs in the form:

```
https://gitlab.mycompany.com/<workspace-folder>/-/blob/<branch>/<relativeFilePath>
```

## Troubleshooting

- **Incorrect URL Structure:**

  - Double-check your `instanceUrl` setting and ensure it includes the protocol (`https://`) and no trailing slash.

## License

This extension is licensed under the MIT License.
