import * as vscode from "vscode";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  warnIfLegacyBasePath();

  let disposable = vscode.commands.registerCommand(
    "openInGitlab.open",
    (uri: vscode.Uri) => {
      // Fall back to the active text editor when invoked from the command palette
      if (!uri) {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
          vscode.window.showErrorMessage("No file is currently open.");
          return;
        }
        uri = editor.document.uri;
      }

      const filePath = uri.fsPath;
      const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);

      if (!workspaceFolder) {
        vscode.window.showErrorMessage("Workspace folder not found.");
        return;
      }

      // Read settings from configuration
      const config = vscode.workspace.getConfiguration("openInGitlab");
      const instanceUrl = config
        .get<string>("instanceUrl", "https://gitlab.com")!
        .replace(/\/$/, "");

      // Extract repository name from workspace folder
      const repoName = workspaceFolder.name;
      const branch = getRepoHeadName(uri);

      // Get the file path relative to the repository root, normalizing to forward slashes
      const relativeFilePath = path
        .relative(workspaceFolder.uri.fsPath, filePath)
        .split(path.sep)
        .join("/");

      // Construct the GitLab URL, filtering empty segments to avoid double slashes
      const gitlabUrl = [instanceUrl, repoName, "-/blob", branch, relativeFilePath]
        .filter(Boolean)
        .join("/");

      console.log("GitLab URL:", gitlabUrl);

      vscode.env.openExternal(vscode.Uri.parse(gitlabUrl));
    }
  );
  context.subscriptions.push(disposable);
}

function warnIfLegacyBasePath() {
  const config = vscode.workspace.getConfiguration("openInGitlab");
  const inspected = config.inspect<string>("basePath");
  const isSet =
    inspected?.globalValue !== undefined ||
    inspected?.workspaceValue !== undefined ||
    inspected?.workspaceFolderValue !== undefined;

  if (isSet) {
    vscode.window
      .showWarningMessage(
        "Open in GitLab: The 'openInGitlab.basePath' setting has been replaced by 'openInGitlab.instanceUrl'. Please update your settings.",
        "Open Settings"
      )
      .then((selection) => {
        if (selection === "Open Settings") {
          vscode.commands.executeCommand(
            "workbench.action.openSettings",
            "openInGitlab.instanceUrl"
          );
        }
      });
  }
}

function getRepoHeadName(workspaceUri: vscode.Uri): string {
  const gitExtension = vscode.extensions.getExtension("vscode.git")?.exports;
  if (!gitExtension) {
    vscode.window.showErrorMessage("Git extension is not available.");
    return "";
  }

  const api = gitExtension.getAPI(1);
  const { repositories } = api;
  const headName = repositories[0].repository.HEAD.name;

  if (!headName) {
    vscode.window.showErrorMessage(
      "Open in Gitlab: No head found. Make sure you're in an initialized git repository."
    );
    return "";
  }

  return headName;
}

export function deactivate() {}
