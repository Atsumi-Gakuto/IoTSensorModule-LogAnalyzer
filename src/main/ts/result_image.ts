/**
 * 1つの結果画像を管理するクラス
 */
export class ResultImage {
    /**
     * 結果画像を描画するキャンバス要素
     */
    private readonly imageElement: HTMLCanvasElement;

    /**
     * コンストラクタ
     */
    constructor() {
        this.imageElement = document.createElement("canvas");
        this.imageElement.width = 800;
        this.imageElement.height = 130;
    }

    /**
     * 結果画像のキャンバス要素を返す。
     * @returns 結果画像のキャンバス要素
     */
    public getElement(): HTMLCanvasElement {
        return this.imageElement;
    }

    /**
     * 結果出力の背景を描画する。
     * @param date 背景に入れる日付
     */
    public drawBackground(date?: Date) {
        if(this.imageElement.getContext != undefined) {
            const context: CanvasRenderingContext2D = this.imageElement.getContext("2d") as CanvasRenderingContext2D;
            context.strokeStyle = "black";
            context.lineWidth = 1;
            context.rect(1, 1, 798, 128);
            context.stroke();
            context.moveTo(20, 100);
            context.lineTo(780, 100);
            context.stroke();
            context.fillStyle = "black";
            context.textAlign = "center";
            context.font = "16px sans-serif";
            for(let i = 0; i < 25; i++) {
                context.moveTo(i * 31.67 + 20, 90);
                context.lineTo(i * 31.67 + 20, 110);
                context.stroke();
                context.fillText(i.toString(), i * 31.67 + 20, 80);
            }
            if(date != undefined) {
                context.fillStyle = "darkgray";
                context.textAlign = "start";
                context.font = "24px sans-serif";
                context.fillText(date.toLocaleDateString(), 20, 40);
            }
        }
    }
}