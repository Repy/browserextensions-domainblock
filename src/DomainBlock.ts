/// <reference path="WebExtentions.d.ts" />
if (!window["browser"]) window["browser"] = window.chrome;

interface Window {
	domainblock: DomainBlock;
}

class DomainBlock {
	private constructor() {
		this.list = [];
		this.load(() => {
			this.setCallback();
		});
	}

	private lastClick: number = 0;
	public toggle(){
		if(this.hasCallback()){
			this.removeCallback();
		}else{
			this.setCallback();
		}
		if (this.lastClick + 1000 > (new Date()).getTime()){
			browser.tabs.create({
				url: browser.runtime.getURL("options.html")
			});
		}
		this.lastClick = (new Date()).getTime();
	}

	public static getInstance(): DomainBlock{
		if(!window.domainblock)	window.domainblock = new DomainBlock();
		return window.domainblock;
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
		browser.storage.local.get(["domain"],
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

	private callbackval = { cancel: true };

	private callback = (details: chrome.webRequest.WebRequestBodyDetails): any => {
		return this.callbackval;
	};

	public hasCallback(): boolean{
		return browser.webRequest.onBeforeRequest.hasListener(this.callback);
	}

	public removeCallback(){
		if (this.hasCallback()) {
			browser.webRequest.onBeforeRequest.removeListener(this.callback);
			browser.browserAction.setBadgeText({ text: "OFF" });
		}
	}

	public setCallback() {
		this.removeCallback();

		let filter: chrome.webRequest.RequestFilter = {
			urls: ["http://demo.demo.demo.demo/"],
			// types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "xbl", "xslt", "ping", "beacon", "xml_dtd", "font", "media", "websocket", "csp_report", "imageset", "web_manifest", "other"]
		};

		for (let i = 0; i < this.list.length; i++) {
			filter.urls.push("http://*." + this.list[i] + "/*");
			filter.urls.push("https://*." + this.list[i] + "/*");
		}

		browser.webRequest.onBeforeRequest.addListener(
			this.callback,
			filter,
			["blocking"]
		);
		browser.browserAction.setBadgeText({ text: "ON" });
	}

	public save() {
		browser.storage.local.set({ "domain": this.list });
	}
}
