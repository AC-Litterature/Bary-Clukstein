"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageFile = exports.Folder = exports.TextFile = exports.File = void 0;
const Icon_1 = require("./Icon");
const Screen_1 = require("./Screen");
const View_1 = require("./View");
class File {
    constructor(name) {
        this.name = name;
    }
    get typeInfo() {
        return File.filesByType[this.type];
    }
    get icon() {
        const icon = new Icon_1.Icon();
        icon.neutralImageUrl = `assets/img/${this.typeInfo.neutralImageUrl}`;
        icon.activeImageUrl = `assets/img/${this.typeInfo.activeImageUrl}`;
        const view = icon.view;
        view.class(this.type, 'file');
        view.add(new View_1.View().class(`${this.type}-title`).add(this.name));
        view.onClick(() => {
            Screen_1.Screen.instance.refresh();
        });
        return view;
    }
}
exports.File = File;
File.filesByType = {
    'text-file': {
        neutralImageUrl: 'file.png',
        activeImageUrl: 'file.png',
    },
    'folder': {
        neutralImageUrl: 'folder.png',
        activeImageUrl: 'folder.png',
    },
    'image-file': {
        neutralImageUrl: 'imageFile.png',
        activeImageUrl: 'imageFile.png',
    },
};
class TextFile extends File {
    constructor() {
        super(...arguments);
        this.type = 'text-file';
    }
}
exports.TextFile = TextFile;
class Folder extends File {
    constructor() {
        super(...arguments);
        this.type = 'folder';
    }
}
exports.Folder = Folder;
class ImageFile extends File {
    constructor() {
        super(...arguments);
        this.type = 'image-file';
    }
}
exports.ImageFile = ImageFile;
//# sourceMappingURL=TextFile.js.map