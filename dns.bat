@echo off
setlocal enabledelayedexpansion

REM Ensure script is run as admin
net session >nul 2>&1
if errorlevel 1 (
    echo Please run this script as Administrator.
    pause
    exit /b
)

set "primaryDNS=45.90.28.180"
set "secondaryDNS=45.90.30.180"
set "found=0"

REM Loop through all connected network adapters
for /f "skip=1 tokens=*" %%A in ('wmic nic where "NetEnabled=true" get NetConnectionID') do (
    set "adapter=%%A"
    REM Trim spaces
    for /f "tokens=* delims= " %%X in ("!adapter!") do set "adapter=%%X"
    if not "!adapter!"=="" (
        echo Updating DNS for "!adapter!"...
        netsh interface ip set dns name="!adapter!" static %primaryDNS%
        netsh interface ip add dns name="!adapter!" %secondaryDNS% index=2
        set found=1
    )
)

if !found! equ 0 (
    echo No active network adapters found.
) else (
    echo All connected adapters updated.
    echo.
    echo Verifying DNS settings...
    for /f "skip=1 tokens=*" %%A in ('wmic nic where "NetEnabled=true" get NetConnectionID') do (
        set "adapter=%%A"
        for /f "tokens=* delims= " %%X in ("!adapter!") do set "adapter=%%X"
        if not "!adapter!"=="" (
            echo !adapter!:
            netsh interface ip show dns name="!adapter!"
            echo.
        )
    )
)

pause
