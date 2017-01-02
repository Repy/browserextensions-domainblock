%~d0
cd "%~dp0"
node.exe node_modules\typescript\lib\tsc.js -p .
cd src
del ..\DomainBlocker.zip
..\7za.exe a -tzip ..\DomainBlocker.zip *

