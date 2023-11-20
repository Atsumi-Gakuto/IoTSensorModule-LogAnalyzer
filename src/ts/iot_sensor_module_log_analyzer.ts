import { ResultImageManager } from "./result_image_manager";

/**
 * メインクラス
 */
class IotSensorModuleLogAnalyzer {
    private resultImageManager: ResultImageManager = new ResultImageManager();

    /**
     * メイン関数。getContext()を実行した後に実行する。
     */
    public main(): void {
        this.resultImageManager.addImage(new Date());
    }
}

const iotSensorModuleLogAnalyzer = new IotSensorModuleLogAnalyzer();
iotSensorModuleLogAnalyzer.main();