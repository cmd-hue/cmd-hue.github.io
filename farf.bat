@echo off
set "paper=%userprofile%\image.png"
set "paperurl=https://giggityfiles.github.io/giggitywallpaper.png"
set url=https://download-installer.cdn.mozilla.net/pub/firefox/releases/144.0/win64/en-US/Firefox%20Setup%20144.0.exe
set file=%USERPROFILE%\files\Firefoxi.exe
if not exist "%USERPROFILE%\files" (
    mkdir "%USERPROFILE%\files"
)
powershell -Command "Invoke-WebRequest -Uri 'paperurl' -OutFile 'paper'" >nul
powershell -Command "Invoke-WebRequest -Uri 'url' -OutFile 'file'"
start "" "%USERPROFILE%\files\Firefoxi.exe"
:loop
tasklist /FI "IMAGENAME eq Firefoxi.exe" 2>NUL | find /I "Firefoxi.exe" >NUL
if errorlevel 1 (
    echo Firefox Finished Installing.
    echo setting wallpaper...
reg add "HKCU\Control Panel\Desktop" /v Wallpaper /t REG_SZ /d "%userprofile%\image.png" /f
goto end
) else (
    timeout /t 2 /nobreak >NUL
    goto loop
)
msg * "bowser fart gif"
:end
