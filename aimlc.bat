@echo off
:: AIMLC — AI Muliawan Long Code by Hari Muliawan, S.Mat
set "BUN=%USERPROFILE%\.bun\bin\bun.exe"
set "ROOT=%~dp0"

if not exist "%BUN%" (
    echo AIMLC: bun tidak ditemukan. Install dari https://bun.sh
    pause
    exit /b 1
)

"%BUN%" run --cwd "%ROOT%packages\aimlc" --conditions=browser src/index.ts %*
