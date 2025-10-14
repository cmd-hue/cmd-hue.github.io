@echo off
setlocal enabledelayedexpansion

set "found=0"

for /f "skip=3 tokens=1,*" %%A in ('netsh interface show interface ^| findstr /R /C:"Connected"') do (
    set "adapter=%%B"
    
    REM Remove leading/trailing spaces
    for /f "tokens=* delims= " %%X in ("!adapter!") do set "adapter=%%X"
    
    REM Skip empty adapter names
    if not "!adapter!"=="" (
        REM Set DNS using ipv4 (more reliable)
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
