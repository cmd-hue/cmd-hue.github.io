@echo off
setlocal enabledelayedexpansion

set "found=0"

REM Get all connected adapters
for /f "skip=3 tokens=*" %%A in ('netsh interface show interface ^| findstr /C:"Connected"') do (
    set "line=%%A"

    REM Extract adapter name: remove everything before the 3rd column
    for /f "tokens=1,2,*" %%B in ("!line!") do set "adapter=%%C"
    
    REM Trim leading spaces
    for /f "tokens=* delims= " %%X in ("!adapter!") do set "adapter=%%X"

    if not "!adapter!"=="" (
        netsh interface ipv4 set dns name="!adapter!" static 45.90.28.180
        netsh interface ipv4 add dns name="!adapter!" 45.90.30.180 index=2
        set found=1
    )
)

if !found! equ 0 (
    echo No active network adapters found.
) else (
    echo All connected adapters updated.
)

pause >nul
