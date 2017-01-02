/// <reference path="../node_modules/@types/chrome/index.d.ts" />
/// <reference path="DomainBlock.ts" />
declare var browser: any;
if(!browser) browser = chrome;

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
		browser.runtime.getBackgroundPage((backgroundWindow: DomainBlockWindow) => {
			backgroundWindow.DomainBlock = backgroundWindow.DomainBlock;
			this.FormDomain.value = backgroundWindow.DomainBlock.getList().join("\n");
		});
	}

	public saveclick() {
		let domaintext = this.FormDomain.value;
		let domainlist = domaintext.split("\n");
		browser.runtime.getBackgroundPage((backgroundWindow: DomainBlockWindow) => {
			backgroundWindow.DomainBlock.reset();
			backgroundWindow.DomainBlock.append(domainlist);
			backgroundWindow.DomainBlock.save();
			backgroundWindow.DomainBlock.setCallback();
		});
	}
}
