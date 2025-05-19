import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.commands.registerCommand('json-table-viewer.showJsonAsTable', () => {
		const panel = vscode.window.createWebviewPanel("webview", "React", vscode.ViewColumn.One, {
            enableScripts: true
        });

		const scriptSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "react-webview", "dist", "assets", "index.js"));
		const styleSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "react-webview", "dist", "assets", "index.css"));

		panel.webview.html = `
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>React Webview</title>
				<link rel="stylesheet" href="${styleSrc}">
			</head>
			<body>
				<div id="root"></div>
				<script src="${scriptSrc}"></script>
			</body>
		</html>
		`;
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
