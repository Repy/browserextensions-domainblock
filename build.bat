%~d0
cd "%~dp0"
node.exe node_modules\typescript\lib\tsc.js -p .
del DomainBlocker.zip
cd src
..\7za.exe a -tzip ..\DomainBlocker.zip *
cd "%~dp0"

