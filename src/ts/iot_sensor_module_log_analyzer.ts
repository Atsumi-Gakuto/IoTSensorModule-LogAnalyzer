/**
 * メインクラス
 */
class IotSensorModuleLogAnalyzer {
    private context: CanvasRenderingContext2D | undefined;

    /**
     * キャンバス要素のコンテクストを取得する。取得後はフィールド変数から利用可能。
     * @returns ブラウザがキャンバス描画に対応しているならtrue、非対応ならfalse
     */
    public getContext(): boolean {
        const canvasElement: HTMLCanvasElement = document.getElementById("result") as HTMLCanvasElement;
        if(canvasElement.getContext != undefined) {
            this.context = canvasElement.getContext("2d") as CanvasRenderingContext2D;
            return true;
        }
        else return false;
    }
}

const iotSensorModuleLogAnalyzer = new IotSensorModuleLogAnalyzer();
if(iotSensorModuleLogAnalyzer.getContext()) console.log("Canvas context got.");
else console.error("Your browser doesn't support canvas rendering.");