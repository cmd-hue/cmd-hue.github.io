@echo off
setlocal enabledelayedexpansion

set "found=0"

REM Loop through all lines of netsh output, skip header line
for /f "skip=3 tokens=1,2,3,*" %%A in ('netsh interface show interface') do (
    set "state=%%B"
    set "adapter=%%D"
    
    REM Trim leading spaces
    for /f "tokens=* delims= " %%X in ("!adapter!") do set "adapter=%%X"

    if /i "!state!"=="Connected" (
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
