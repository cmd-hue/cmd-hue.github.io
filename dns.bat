@echo off
REM Automatically detect active network adapter
for /f "tokens=1,2*" %%a in ('netsh interface show interface ^| findstr /R /C:"Connected"') do set adapter=%%c

if "%adapter%"=="" (
    echo No active network adapter found.
    pause
    exit /b
)

netsh interface ip set dns name="%adapter%" static 45.90.28.180
netsh interface ip add dns name="%adapter%" 45.90.30.180 index=2
echo finished, press any key to exit.
pause >nul
