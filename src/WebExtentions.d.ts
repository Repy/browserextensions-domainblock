/// <reference path="../node_modules/@types/chrome/index.d.ts" />
declare var browser: typeof chrome;

interface Window {
	DomainBlock: DomainBlock;
}

declare namespace chrome.runtime {
	export function getBrowserInfo(callback: (browserInfo: BrowserInfo) => void): void;

	interface BrowserInfo {
		name: string; // value representing the browser name, for example "Firefox".
		vendor: string; // value representing the browser's vendor, for example "Mozilla".
		version: string; // representing the browser's version, for example "51.0" or "51.0a2".
		buildID: string; // representing the specific build of the browser, for example "20161018004015".
	}

}
