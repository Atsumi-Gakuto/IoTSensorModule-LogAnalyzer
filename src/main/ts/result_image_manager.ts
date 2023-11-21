import { ResultImage } from "./result_image";

/**
 * 結果出力の画像を管理するクラス
 */
export class ResultImageManager {
    private readonly resultImages: ResultImage[] = [];

    /**
     * 結果画像のインスタンスを返す。
     * @param index 返す結果画像のインデックス番号。"indexOf"と併用すると良い。
     * @returns 指定されたインデックス番号を持つ結果画像のインスタンス。存在しない場合はnullを返す。
     */
    public getImage(index: number): ResultImage|null {
        return this.resultImages[index];
    }

    /**
     * 結果画像のインスタンスを追加する。
     * @param date 背景に入れる日付
     * @returns 追加されたインスタンスのインデックス番号
     */
    public addImage(date?: Date): number {
        const newImage: ResultImage = new ResultImage(date);
        newImage.drawBackground();
        (document.getElementById("result_images") as HTMLDivElement).appendChild(newImage.getElement());
        this.resultImages.push(newImage);
        return this.resultImages.length - 1;
    }

    /**
     * 入力された日付と同じ日付を持つ画像のインデックス番号を返す。
     * @param date 検索対象の日付
     * @returns 検索する日付と同じ日付を持つ画像のインデックス番号。見つからない場合は-1を返す。
     */
    public indexOf(date: Date): number {
        for(let i = 0; i < this.resultImages.length; i++) {
            if(this.resultImages[i].getMonth() == date.getMonth() && this.resultImages[i].getDate() == date.getDate()) return i;
        }
        return -1;
    }

    /**
     * 背景画像のインスタンスをすべて削除する。
     */
    public removeResultImages(): void {
        while(this.resultImages.shift() != undefined);
    }
}