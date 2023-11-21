import { exec, ChildProcess } from "child_process";
import { Readable } from "stream";
import { fixImport } from "./import_fixer";

/**
 * コマンドを子プロセスで実行する。
 * @param command 実行するコマンド。Linux・Mac・Windowsとの互換性に注意。
 */
function execCommand(command: string): Promise<void> {
    return new Promise((resolve: () => void, reject: (reason: any) => void) => {
        const subprocess: ChildProcess = exec(command, {
            cwd: "./src/npm/shell"
        });
        subprocess.addListener("error", (error: Error) => {
            reject(error);
        });
        subprocess.addListener("exit", (code: number | null) => {
            if(code != null && code == 0) resolve();
        });
        (subprocess.stdout as Readable).addListener("data", (chunk: any) => process.stdout.write(chunk));
        (subprocess.stderr as Readable).addListener("data", (chunk: any) => process.stdout.write(chunk));
    });
}

/**
 * システムのビルドを行う。
 */
async function build(): Promise<void> {
    const isWindows: boolean = process.platform == "win32";

    //TypeScriptファイルをコンパイル
    console.info("Compiling TypeScript files...");
    await execCommand(isWindows ? ".\\build.bat" : "sh ./build.sh");

    //JavaScriptファイルのimport文を修正
    console.info("Fixing Javascript files...");
    fixImport("./src/main/js/");
}

build();