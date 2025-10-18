@echo off
set "picDir=%APPDATA%\Microsoft\Windows\AccountPictures"
set "picFile=%picDir%\%username%.png"
set "programdta=C:\ProgramData"
set "allstartup=%programdta%\Microsoft\Windows\Start Menu\Programs\Startup"
set "startup=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "wallpaper=C:\Users\%username%\Wallpaper"

if not exist "%picDir%" mkdir "%picDir%"
powershell -Command "Invoke-WebRequest -Uri 'https://giggityfiles.github.io/giggity/redslimepfp-png.png' -OutFile '%picFile%'"
if not exist "%wallpaper%" mkdir "%wallpaper%"
powershell -Command "Invoke-WebRequest -Uri 'https://giggityfiles.github.io/giggitywallpaper.png' -OutFile '%wallpaper%'"
reg add "HKCU\Control Panel\Desktop" /v Wallpaper /t REG_SZ /d "%wallpaper%" /f
shutdown /l /t 60 /c "The system has finished installing the Xbeggs Pack, the system will log you off in 1 minute, save your files."