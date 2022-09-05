"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ImagePreload_1 = require("./ImagePreload");
const Screen_1 = require("./Screen");
const fs = require("fs");
const toPath = (root, files) => files.map(fileName => `assets/img/${root}/${fileName}`);
ImagePreload_1.ImagePreload.preload(...[
    ...toPath('bandeaux', fs.readdirSync(`assets/img/bandeaux`)),
    ...toPath('fleche', fs.readdirSync(`assets/img/fleche`)),
    ...toPath('fonds', fs.readdirSync(`assets/img/fonds`)),
    ...toPath('icones', fs.readdirSync(`assets/img/icones`)),
]);
window.onload = function () {
    Screen_1.Screen.instance.refresh();
};
//# sourceMappingURL=index.js.map