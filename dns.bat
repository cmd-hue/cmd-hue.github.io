@echo off
title Set DNS-over-HTTPS to NextDNS
echo Setting NextDNS DoH for Windows, Chrome, and Edge...
echo.

netsh dns add encryption server=45.90.28.180 dohtemplate=https://dns.nextdns.io/7a485b autoupgrade=yes
netsh dns add encryption server=45.90.30.180 dohtemplate=https://dns.nextdns.io/7a485b autoupgrade=yes

for /f "tokens=1,2 delims=:" %%a in ('netsh interface show interface ^| findstr "Connected"') do (
    for /f "tokens=*" %%b in ("%%a") do (
        netsh interface ip set dns name="%%b" static 45.90.28.180 primary
        netsh interface ip add dns name="%%b" 45.90.30.180 index=2
    )
)

reg add "HKCU\Software\Policies\Google\Chrome" /v DnsOverHttpsMode /t REG_SZ /d automatic /f
reg add "HKCU\Software\Policies\Google\Chrome" /v DnsOverHttpsTemplates /t REG_SZ /d https://dns.nextdns.io/7a485b /f
reg add "HKCU\Software\Policies\Microsoft\Edge" /v DnsOverHttpsMode /t REG_SZ /d automatic /f
reg add "HKCU\Software\Policies\Microsoft\Edge" /v DnsOverHttpsTemplates /t REG_SZ /d https://dns.nextdns.io/7a485b /f
shutdown /r /t 60 /c "When the system restarts, DNS-over-HTTPS settings will take effect. you have 1 minute to save your work."