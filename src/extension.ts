// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld" is now active!');

	// 1️⃣ Command 1: Hello World y Hour
	const helloWorldCommand = vscode.commands.registerCommand(
		'helloworld.helloWorld', 
		() => {
			vscode.window.showInformationMessage('Hello from my first extension🚀');
		
			const now = new Date();
    		const time = now.toLocaleTimeString();

    		vscode.window.showInformationMessage(now.toLocaleString());
		}
	);			

	// 2️⃣ Command 2: Ask Name
	const askNameCommand = vscode.commands.registerCommand(
		'extension.askName',
		async () => {
			const name = await vscode.window.showInputBox({prompt: 'What is your name?'});
			if (name) {
			vscode.window.showInformationMessage(`Hello, ${name}!👋`);}
		});

	// 3️⃣ Command 3: Greeting with Time Insertion
	const greetingWithTimeCommand = vscode.commands.registerCommand(
    	'extension.greetingWithTime',
    	async () => {
        	const editor = vscode.window.activeTextEditor;
			if (!editor) {
				vscode.window.showErrorMessage('No active text editor found.');
				return;
			}

        	const now = new Date();
        	const time = now.toLocaleTimeString();

        	await editor.edit(editBuilder => {
            	editBuilder.insert(editor.selection.active, `Hour: (${time})`);
        	});
	});

	// 4️⃣ Command 4: Uppercase
	const uppercaseCommand = vscode.commands.registerCommand(
		'extension.uppercase',
		async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				vscode.window.showErrorMessage('No active text editor found.');
				return;
			}
			
			const selection = editor.selection; // Get the current selection
				if (!editor) {
					vscode.window.showErrorMessage('No active text editor found.');
					return;
			}

			const text = editor.document.getText(selection); // Get the selected text
			await editor.edit(editBuilder => {
				editBuilder.replace(selection, text.toUpperCase()); // Replace with uppercase text
			});
	}
);
	// Add commands to the context's subscriptions
	context.subscriptions.push(helloWorldCommand);
	context.subscriptions.push(askNameCommand);
	context.subscriptions.push(greetingWithTimeCommand);
	context.subscriptions.push(uppercaseCommand);
}

// This method is called when your extension is deactivated
export function deactivate() {}
