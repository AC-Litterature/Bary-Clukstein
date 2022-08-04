
export abstract class ImagePreload {
    public static preload(...urls: string[]) {
        for(const url of urls) {
            const img = new Image();
            img.src = url;
        }
    }
}
