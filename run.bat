@ECHO OFF

IF EXIST ".\node_modules" (
    goto :skip
) ELSE (
    npm update
    goto :skip
)

:skip
node .\app.js
PAUSE