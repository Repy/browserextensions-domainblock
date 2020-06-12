import "./lib/WebExtensions";
import "./DomainBlock";

document.addEventListener('DOMContentLoaded', () => {
	(<any>window).DomainBlockOptions = new DomainBlockOptions();
});

class DomainBlockOptions {
	private FormDomain: HTMLTextAreaElement;
	private ButtonSave: HTMLButtonElement;

	constructor() {
		this.ButtonSave = <HTMLButtonElement>document.getElementById("save");
		this.FormDomain = <HTMLTextAreaElement>document.getElementById("domain");
		this.ButtonSave.addEventListener('click', () => { this.saveclick(); });
		browser.runtime.getBackgroundPage((backgroundWindow) => {
			if (!backgroundWindow) return;
			this.FormDomain.value = backgroundWindow.background.getList().join("\n");
		});
	}

	public saveclick() {
		let domaintext = this.FormDomain.value;
		let domainlist = domaintext.split("\n");
		browser.runtime.getBackgroundPage((backgroundWindow) => {
			if (!backgroundWindow) return;
			backgroundWindow.background.reset();
			backgroundWindow.background.append(domainlist);
			backgroundWindow.background.save();
			backgroundWindow.background.setCallback();
		});
	}
}
