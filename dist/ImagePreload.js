"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagePreload = void 0;
class ImagePreload {
    static preload(...urls) {
        for (const url of urls) {
            const img = new Image();
            img.src = url;
        }
    }
}
exports.ImagePreload = ImagePreload;
//# sourceMappingURL=ImagePreload.js.map