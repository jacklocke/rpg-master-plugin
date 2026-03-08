import { Plugin, Notice } from "obsidian";

export default class RPGMasterPlugin extends Plugin {

		// dichiaro le variabili della classe
		statusBarTextElement: HTMLSpanElement;

		async onload() {
			console.log("RPG Master Plugin loaded");
		
			// Aggiunge alla sidebar una icona cliccabile
			this.addRibbonIcon('dice', 'Greet', () => {
				new Notice('Hello, world!');
			});

		// Aggiunge un elemento alla status bar
		this.statusBarTextElement = this.addStatusBarItem().createEl('span');
		this.statusBarTextElement.setText('RPG Master Plugin is active');

		// chiamo all'onload la funzione per leggere il file attivo e aggiornare il contatore di righe
		this.leggiFileAttivoEAggiornaConteggioRighe();

		// Aggiorna il contatore di righe quando il file attivo cambia
		this.app.workspace.on('active-leaf-change', async () => {
			this.leggiFileAttivoEAggiornaConteggioRighe();
		});

		// Aggiorna il contatore ad ogni cambio di contenuto del file attivo
		this.app.workspace.on('editor-change', editor => {
			const file = editor.getDoc().getValue();
			this.aggiornaConteggioRighe(file);
		});

	}

	onunload() {
		console.log("RPG Master Plugin unloaded");
	}

	private async leggiFileAttivoEAggiornaConteggioRighe() {
		const file = this.app.workspace.getActiveFile();
		if (file) {
			const content = await this.app.vault.read(file);
			//console.log(`Contenuto del file attivo: ${content}`);
			this.aggiornaConteggioRighe(content);
		} else {
			this.aggiornaConteggioRighe();
		}
	}

	private aggiornaConteggioRighe(contenutoFile?: string) {
		const conta = contenutoFile ? contenutoFile.split('\n').length : 0;
		this.statusBarTextElement.setText(`Righe: ${conta}`);
	}
}
