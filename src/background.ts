import "./lib/WebExtensions";
import { DomainBlock } from "./DomainBlock";

window.background = new DomainBlock();

browser.browserAction.onClicked.addListener((tab: chrome.tabs.Tab) => {
	window.background.toggle();
});
