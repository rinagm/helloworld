// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// Create decoration type once to avoid memory leaks
const greetingDecoration = vscode.window.createTextEditorDecorationType({
	color: '#FFA500',
	backgroundColor: '#702525',
	fontWeight: 'bold',
});

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld" is now active!');

	// Command 1: Hello World y Time
	const helloWorldCommand = vscode.commands.registerCommand('helloworld.helloWorld', 
		() => {
			vscode.window.showInformationMessage('Update version 🚀');
		
			const now = new Date();
    		const time = now.toLocaleTimeString();
    		vscode.window.showInformationMessage(`Hour: ${time}`);
		}
	);			

	// Command 2: Ask Name
	const askNameCommand = vscode.commands.registerCommand('extension.askName',
		async () => {
			const name = await vscode.window.showInputBox({ prompt: "What is your name?"});
			if (name) {
			vscode.window.showInformationMessage(`Hello, ${name}! 👋`);}
		});

	// Command 3: Insert Greeting
	const insertGreetingCommand = vscode.commands.registerCommand(
	'extension.insertGreeting',
		async () => {
		const editor = vscode.window.activeTextEditor;
		// If not open editor, show warning message
		if (!editor) {
			vscode.window.showWarningMessage('There is no active editor');
			return;
		}

		const name = await vscode.window.showInputBox({
			prompt: 'What is your name?',
		});

		// If no name, return
		if (!name) {
			return;
		}

        // Insert greeting at cursor position
		const position = editor.selection.active;
		const text = `Hello ${name} 👋`;

		await editor.edit(editBuilder => {
    		editBuilder.insert(position, text);
		});

		// Get the current editor again to ensure we have the right one
		const currentEditor = vscode.window.activeTextEditor;
		if (currentEditor) {
			const start = position;
			const end = position.translate(0, text.length);
			const range = new vscode.Range(start, end);
			currentEditor.setDecorations(greetingDecoration, [range]);
		}
});

	context.subscriptions.push(insertGreetingCommand);
	context.subscriptions.push(helloWorldCommand, askNameCommand);
	context.subscriptions.push(greetingDecoration);
}

// This method is called when your extension is deactivated
export function deactivate() {}
