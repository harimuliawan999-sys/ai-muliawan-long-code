@echo off
:: AILMC — shortcut untuk membuka AI Muliawan Long Code
:: Letakkan file ini di folder yang ada di PATH (atau buat alias)
:: Cara pakai:
::   ailmc              → buka project AILMC sendiri
::   ailmc C:\path      → buka project di path tertentu

setlocal
set "AILMC_ROOT=C:\ai-muliawan-long-code\ailmc"

if "%~1"=="" (
    cd /d "%AILMC_ROOT%"
    python -m ailmc --cwd "%AILMC_ROOT%" --mode smart
) else (
    cd /d "%AILMC_ROOT%"
    python -m ailmc --cwd "%~1" --mode smart
)
endlocal
