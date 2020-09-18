%~d0
cd "%~dp0"
call npm run build
del DomainBlocker.zip
cd dist
..\7za.exe a -tzip ..\DomainBlocker.zip *
cd "%~dp0"
