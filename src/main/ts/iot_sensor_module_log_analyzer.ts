import { ResultImageManager } from "./result_image_manager";
import { ResultImage } from "./result_image";

/**
 * メインクラス
 */
class IotSensorModuleLogAnalyzer {
    /**
     * 結果画像を管理するマネージャークラスのインスタンス
     */
    private resultImageManager: ResultImageManager = new ResultImageManager();

    /**
     * 結果画像を生成する。
     * @param log 画像生成時に参照するログのブロブ
     */
    private async generateResultImage(log: Blob): Promise<void> {
        const reader: ReadableStreamDefaultReader<Uint8Array> = log.stream().getReader();
        let firstLog: boolean = true;
        let lastTime: Date|undefined;
        let lineStringChunk: string = "";
        while(true) {
            const chunk: ReadableStreamReadResult<Uint8Array> = await reader.read();
            if(chunk.value != undefined) {
                const chunkStringArray: string[] = new TextDecoder().decode(chunk.value).split(/\r\n|\n|\r/);
                for(let i = 0; i < chunkStringArray.length; i++) {
                    let targetString: string = chunkStringArray[i];
                    if(i == 0) {
                        targetString = lineStringChunk + targetString;
                        lineStringChunk = "";
                    }
                    else if(i == chunkStringArray.length - 1) {
                        lineStringChunk = targetString;
                        break;
                    }

                    //ログ処理
                    const logData: RegExpMatchArray|null = targetString.match(/^\[(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})\.(\d{3})\]\s(.*)$/);
                    if(logData != null) {
                        const logDate: Date = new Date(Number(logData[1]), Number(logData[2]) - 1, Number(logData[3]), Number(logData[4]), Number(logData[5]), Number(logData[6]), Number(logData[7]));
                        let targetImage: number = this.resultImageManager.indexOf(logDate);
                        if(targetImage == -1) targetImage = this.resultImageManager.addImage(logDate);
                        if(firstLog) {
                            const startTime: Date = new Date();
                            startTime.setHours(0);
                            startTime.setMinutes(0);
                            (this.resultImageManager.getImage(targetImage) as ResultImage).dimPeriod(startTime, logDate);
                            firstLog = false;
                        }
                        if(logData[8] == "Si1132 command error") (this.resultImageManager.getImage(targetImage) as ResultImage).plot(logDate);
                        lastTime = logDate;
                    }
                }
            }
            else break;
        }
        if(lastTime != undefined) {
            const endTime: Date = new Date();
            endTime.setHours(23);
            endTime.setMinutes(59);
            (this.resultImageManager.getImage(this.resultImageManager.getImageCount() - 1) as ResultImage).dimPeriod(lastTime, endTime);
        }
        (document.getElementById("process_status") as HTMLParagraphElement).innerText = `処理完了`;
    }

    /**
     * 結果画像を削除する。
     */
    private removeResultImage(): void {
        const resultImageAreaElement: HTMLDivElement = document.getElementById("result_images") as HTMLDivElement;
        while(resultImageAreaElement.firstElementChild != null) resultImageAreaElement.firstElementChild.remove();
        this.resultImageManager.removeResultImages();
    }

    /**
     * メイン関数。getContext()を実行した後に実行する。
     */
    public main(): void {
        (document.getElementById("log_input") as HTMLInputElement).addEventListener("change", async (event: Event) => {
            this.removeResultImage();
            if(((event.target as HTMLInputElement).files as FileList).length == 1) this.generateResultImage(((event.target as HTMLInputElement).files as FileList)[0]);
            else (document.getElementById("process_status") as HTMLParagraphElement).innerText = `ログファイル待機中...`;
        });
    }
}

const iotSensorModuleLogAnalyzer = new IotSensorModuleLogAnalyzer();
iotSensorModuleLogAnalyzer.main();