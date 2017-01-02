/// <reference path="../node_modules/@types/chrome/index.d.ts" />
declare var browser: any;

interface DomainBlockWindow extends Window {
	DomainBlock: DomainBlock;
}

class DomainBlock {
	private storage: chrome.storage.LocalStorageArea;
	private onBeforeRequest: chrome.webRequest.WebRequestBodyEvent;
	constructor() {
		this.storage = browser.storage.local;
		this.onBeforeRequest = browser.webRequest.onBeforeRequest;
		this.list = [];
		this.load(() => {
			this.setCallback();
		});
	}

	private list: string[];
	public getList(): string[] {
		return this.list.concat();
	}

	public reset() {
		this.list = [];
	}

	public append(domains: string[]) {
		let alllist = this.list.concat(domains);
		let newlist = [];
		for (let i = 0; i < alllist.length; i++) {
			if (alllist[i] === "") continue;
			let j = 0;
			for (j = 0; j < newlist.length; j++) {
				if (alllist[i] === newlist[j]) break;
			}
			if (j == newlist.length) newlist.push(alllist[i]);
		}
		this.list = newlist;
	}

	public remove(domains: string[]) {
		let newlist = [];
		for (let i = 0; i < this.list.length; i++) {
			let j = 0;
			for (j = 0; j < domains.length; j++) {
				if (this.list[i] === domains[j]) break;
			}
			if (j == domains.length) newlist.push(this.list[i]);
		}
		this.list = newlist;
	}

	public load(callback: Function) {
		this.storage.get(["domain"],
			(config) => {
				let domainlist = []
				if (typeof config["domain"] === "object" && typeof config["domain"].length === "number" && typeof config["domain"].join === "function") {
					domainlist = config["domain"];
				}
				this.list = domainlist;
				callback();
			}
		);
	}

	private callback = (details: chrome.webRequest.WebRequestBodyDetails): any => {
		return { cancel: true };
	};
	public setCallback() {
		this.onBeforeRequest.removeListener(this.callback);

		let filter: chrome.webRequest.RequestFilter = {
			urls: [],
			types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "xbl", "xslt", "ping", "beacon", "xml_dtd", "font", "media", "websocket", "csp_report", "imageset", "web_manifest", "other"]
		};

		for (let i = 0; i < this.list.length; i++) {
			filter.urls.push("http://*." + this.list[i] + "/*");
			filter.urls.push("https://*." + this.list[i] + "/*");
		}

		this.onBeforeRequest.addListener(
			this.callback,
			filter,
			["blocking"]
		);
	}

	public save() {
		this.storage.set({ "domain": this.list });
	}
}
