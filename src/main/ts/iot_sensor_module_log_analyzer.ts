import { ResultImageManager } from "./result_image_manager";

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
     */
    private generateResultImage(): void {

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
    }
}

const iotSensorModuleLogAnalyzer = new IotSensorModuleLogAnalyzer();
iotSensorModuleLogAnalyzer.main();