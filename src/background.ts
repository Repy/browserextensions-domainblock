/// <reference path="../node_modules/@types/chrome/index.d.ts" />
/// <reference path="DomainBlock.ts" />
declare var browser: typeof chrome;
if(!browser) browser = chrome;

window.DomainBlock = new DomainBlock();

