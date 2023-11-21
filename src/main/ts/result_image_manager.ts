import { ResultImage } from "./result_image";

/**
 * 結果出力の画像を管理するクラス
 */
export class ResultImageManager {
    private readonly resultImages: ResultImage[] = [];

    /**
     * 背景画像のインスタンスを追加する。
     * @param date 背景に入れる日付
     * @returns 背景画像のキャンバス要素
     */
    public addImage(date?: Date): void {
        const newImage: ResultImage = new ResultImage();
        newImage.drawBackground(date);
        (document.getElementById("result_images") as HTMLDivElement).appendChild(newImage.getElement());
        this.resultImages.push(newImage);
    }
}