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

REM Function to trim leading and trailing spaces
:trim
set "var=%~1"
REM Trim leading spaces
for /f "tokens=* delims= " %%A in ("!var!") do set "var=%%A"
REM Trim trailing spaces
:trimloop
if not "!var!"=="" if "!var:~-1!"==" " set "var=!var:~0,-1!" & goto trimloop
set "%~2=!var!"
goto :eof

REM Loop through all connected network adapters
for /f "skip=1 tokens=*" %%A in ('wmic nic where "NetEnabled=true" get NetConnectionID') do (
    call :trim "%%A" adapter
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
        call :trim "%%A" adapter
        if not "!adapter!"=="" (
            echo !adapter!:
            netsh interface ip show dns name="!adapter!"
            echo.
        )
    )
)

pause
