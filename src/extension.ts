import * as vscode from "vscode";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "openInGitlab.open",
    (uri: vscode.Uri) => {
      const filePath = uri.fsPath;
      const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);

      if (!workspaceFolder) {
        vscode.window.showErrorMessage("Workspace folder not found.");
        return;
      }

      // Read settings from configuration
      const config = vscode.workspace.getConfiguration("openInGitlab");
      const basePath = config.get<string>("basePath", "your-base-path");

      // Extract repository name from workspace folder
      const repoName = workspaceFolder.name;
      const branch = getRepoHeadName(uri);

      // Get the file path relative to the repository root
      const relativeFilePath = path.relative(
        workspaceFolder.uri.fsPath,
        filePath
      );

      // Construct the Gitlab URL
      const gitlabUrl = path.join(
        basePath,
        repoName,
        "/-/blob/",
        branch,
        relativeFilePath
      );

      console.log("GitLab URL:", gitlabUrl);

      vscode.env.openExternal(vscode.Uri.parse(gitlabUrl));
    }
  );
  context.subscriptions.push(disposable);
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
