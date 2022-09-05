import { ImagePreload } from "./ImagePreload";
import { Screen } from "./Screen";
import * as fs from 'fs';

const toPath = (root: string, files: string[]) => files.map(fileName => `assets/img/${root}/${fileName}`);

ImagePreload.preload(...[
    ...toPath('bandeaux', fs.readdirSync(`assets/img/bandeaux`)),
    ...toPath('fleche', fs.readdirSync(`assets/img/fleche`)),
    ...toPath('fonds', fs.readdirSync(`assets/img/fonds`)),
    ...toPath('icones', fs.readdirSync(`assets/img/icones`)),
]);

window.onload = function() {
    Screen.instance.refresh();
};
