@echo off
setlocal enabledelayedexpansion

set "found=0"

for /f "tokens=1,2*" %%a in ('netsh interface show interface ^| findstr /R /C:"Connected"') do (
    set "adapter=%%c"
    
    REM Trim leading/trailing spaces
    for /f "tokens=* delims= " %%A in ("!adapter!") do set "adapter=%%A"
    
    if not "!adapter!"=="" (
        netsh interface ip set dns name="!adapter!" static 45.90.28.180
        netsh interface ip add dns name="!adapter!" 45.90.30.180 index=2
        set found=1
    )
)

if !found! equ 0 (
    echo No active network adapters found.
) else (
    echo All connected adapters updated.
)

pause >nul
