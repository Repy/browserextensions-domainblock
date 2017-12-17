/// <reference path="../node_modules/@types/chrome/index.d.ts" />
/// <reference path="DomainBlock.ts" />

DomainBlock.getInstance();

browser.browserAction.onClicked.addListener((tab: chrome.tabs.Tab) => {
	DomainBlock.getInstance().toggle();
});
