import * as vscode from 'vscode';
import * as tmp from 'tmp';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "leetcode-to-vscode" is now active!');

	const disposable = vscode.commands.registerCommand('leetcode-to-vscode.sync', async () => {
		try {
			const tempFile = tmp.fileSync({ postfix: '.py' });

			fs.writeFileSync(tempFile.name, 'print("Hello, World!")');

			const document = await vscode.workspace.openTextDocument(tempFile.name);
			await vscode.window.showTextDocument(document);

			vscode.window.showInformationMessage(`Temporary file created: ${tempFile.name}`);
		} catch (error) {
			vscode.window.showErrorMessage(`Failed to create temporary file: ${error}`);
		}
	});

	context.subscriptions.push(disposable);

	const handleUri = (uri: vscode.Uri) => {
		vscode.commands.executeCommand('leetcode-to-vscode.sync');
	};
	
	context.subscriptions.push(vscode.window.registerUriHandler({
		handleUri,
	}));
}

// This method is called when your extension is deactivated
export function deactivate() {
	console.log('LeetCode to VSCode extension is deactivated!');
}

