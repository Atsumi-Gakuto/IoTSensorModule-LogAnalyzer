/**
 * 1つの結果画像を管理するクラス
 */
export class ResultImage {
    /**
     * 結果画像を描画するキャンバス要素
     */
    private readonly imageElement: HTMLCanvasElement;

    /**
     * 結果画像が持つ日付（時刻は無視しても構わない。）
     */
    private readonly imageDate: Date|undefined;

    /**
     * コンストラクタ
     * @param date この画像の日付
     */
    constructor(date?: Date) {
        this.imageElement = document.createElement("canvas");
        this.imageElement.width = 800;
        this.imageElement.height = 130;
        this.imageDate = date;
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
     */
    public drawBackground(): void {
        if(this.imageElement.getContext != undefined) {
            const context: CanvasRenderingContext2D = this.imageElement.getContext("2d") as CanvasRenderingContext2D;
            context.strokeStyle = "black";
            context.lineWidth = 1;
            context.beginPath();
            context.rect(1, 1, 798, 128);
            context.stroke();
            context.beginPath();
            context.moveTo(20, 100);
            context.lineTo(780, 100);
            context.stroke();
            context.fillStyle = "black";
            context.textAlign = "center";
            context.font = "16px sans-serif";
            for(let i = 0; i < 25; i++) {
                context.beginPath();
                context.moveTo(i * 31.67 + 20, 90);
                context.lineTo(i * 31.67 + 20, 110);
                context.stroke();
                context.fillText(i.toString(), i * 31.67 + 20, 80);
            }
            if(this.imageDate != undefined) {
                context.fillStyle = "darkgray";
                context.textAlign = "start";
                context.font = "24px sans-serif";
                context.fillText(this.imageDate.toLocaleDateString(), 20, 40);
            }
        }
    }

    /**
     * 入力された時刻の位置に点をプロットする。
     * @param time プロットする時刻（日付は無視する。）
     */
    public plot(time: Date): void {
        if(this.imageElement.getContext != undefined) {
            const context: CanvasRenderingContext2D = this.imageElement.getContext("2d") as CanvasRenderingContext2D;
            context.fillStyle = "red";
            context.beginPath();
            context.arc(760 * ((time.getHours() * 60 + time.getMinutes()) / 1440) + 20, 100, 4, 0, Math.PI * 2);
            context.fill();
        }
    }

    /**
     * 入力された期間を白くする。
     * @param timeStart 期間開始時刻（日付は無視する。）
     * @param timeEnd 期間終了時刻（日付は無視する。）
     */
    public dimPeriod(timeStart: Date, timeEnd: Date): void {
        if(this.imageElement.getContext != undefined && timeStart.getHours() * 60 + timeStart.getMinutes() < timeEnd.getHours() * 60 + timeEnd.getMinutes()) {
            const context: CanvasRenderingContext2D = this.imageElement.getContext("2d") as CanvasRenderingContext2D;
            context.fillStyle = "#00000088";
            context.beginPath();
            const startPos: number = 760 * ((timeStart.getHours() * 60 + timeStart.getMinutes()) / 1440) + 20;
            context.rect(startPos, 60, 760 * ((timeEnd.getHours() * 60 + timeEnd.getMinutes()) / 1440) + 20 - startPos, 58);
            context.fill();
        }
    }
}