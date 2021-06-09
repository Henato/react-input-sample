import { posix } from "path";
import * as vscode from "vscode";

function mountReactHtml(title: string, source: vscode.Uri): string {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>

      <meta http-equiv="Content-Security-Policy"
        content="default-src 'none';
                img-src https: vscode-resource:;
                script-src 'unsafe-eval' 'unsafe-inline' vscode-resource:;
                style-src vscode-resource: 'unsafe-inline';">
    </head>
    <body>
      <div id="root"></div>
      <script src="${source}"></script>
    </body>
    </html>
  `;
}

function getWebviewContent(panel: vscode.WebviewPanel, extensionPath: string) {
  const reactAppPathOnDisk = vscode.Uri.file(
    posix.join(extensionPath, "out", "view.js").replace(/\\/g, "/")
  );
  const reactAppUri = panel.webview.asWebviewUri(reactAppPathOnDisk);
  if (!reactAppUri) {
    throw new Error("Panel was not initialized correctly.");
  }
  return mountReactHtml("Input View", reactAppUri);
}

function createPanel() {
  return vscode.window.createWebviewPanel(
    `input sample`,
    `input sample`,
    vscode.ViewColumn.Active,
    {
      retainContextWhenHidden: true,
      enableScripts: true,
    }
  );
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("extension.showView", () => {
    const panel =  createPanel();
    panel.webview.html = getWebviewContent(panel, context.extensionPath);
    panel.reveal();
  });
  context.subscriptions.push(disposable);
}
