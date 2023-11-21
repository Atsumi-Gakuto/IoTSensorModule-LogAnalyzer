@echo off

rem TypeScriptファイルをコンパイル
echo Compiling npm sources (1/2)...
cd ..\ts
call ..\..\..\node_modules\.bin\tsc

echo Compiling main sources (2/2)...
cd ..\..\main\ts
call ..\..\..\node_modules\.bin\tsc

cd ..\..\npm\shell