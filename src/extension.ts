import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.commands.registerCommand('json-table-viewer.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from json-table-viewer!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
