import fs from "fs";

/**
 * javascriptのソースファイルのimport文に".js"を付ける。
 * @param rootPath 再帰的に検索するルートパス
 */
export function fixImport(rootPath: string): void {
    fs.readdirSync(rootPath, {encoding: "utf-8", withFileTypes: true, recursive: true}).forEach((entry: fs.Dirent) => {
        if(/\.js$/.test(entry.name)) fs.writeFileSync(`${entry.path}/${entry.name}`, fs.readFileSync(`${entry.path}/${entry.name}`, {encoding: "utf-8"}).replace(/import\s*{(.+)}\s*from\s*"((?!.*\.js).+)";?/g, "import {$1} from \"$2.js\";"), {encoding: "utf-8"});
    });
}

if(require.main == module) fixImport("../../main/");