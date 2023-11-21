# TypeScriptファイルをコンパイル

echo Compiling npm sources \(1/2\)...
cd ../ts
../../../node_modules/.bin/tsc

echo Compiling server sources \(2/2\)...
cd ../../main/ts
../../../node_modules/.bin/tsc

cd ../../npm/shell