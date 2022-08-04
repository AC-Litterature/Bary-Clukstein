"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageFile = exports.Folder = exports.TextFile = exports.File = void 0;
const Icon_1 = require("./Icon");
const Screen_1 = require("./Screen");
const View_1 = require("./View");
const Window_1 = require("./Window");
class File {
    constructor(name, passwordMD5) {
        this.name = name;
        this.passwordMD5 = passwordMD5;
    }
    get typeInfo() {
        return File.filesByType[this.type];
    }
    get icon() {
        const icon = new Icon_1.Icon();
        icon.neutralImageUrl = `assets/img/icones/${this.typeInfo.neutralImageUrl}`;
        icon.activeImageUrl = `assets/img/icones/${this.typeInfo.activeImageUrl}`;
        const view = icon.view;
        view.class(this.type, 'file');
        view.add(new View_1.View().class(`${this.type}-title`).add(this.name));
        view.onClick(() => {
            this.openWindow();
            Screen_1.Screen.instance.refresh();
        });
        return view;
    }
    openWindow() {
        let window = this.createWindow();
        if (this.passwordMD5) {
            window = new Window_1.PasswordWindow(this);
        }
        Screen_1.Screen.instance.desktop.addWindow(window);
    }
}
exports.File = File;
File.filesByType = {
    'text-file': {
        neutralImageUrl: 'icone document neutre.png',
        activeImageUrl: 'icone document active.png',
    },
    'folder': {
        neutralImageUrl: 'icone dossier neutre.png',
        activeImageUrl: 'icone dossier active.png',
    },
    'image-file': {
        neutralImageUrl: 'icone image neutre.png',
        activeImageUrl: 'icone image active.png',
    },
};
class TextFile extends File {
    constructor(name, content, passwordMD5, openWindowOnRight = true) {
        super(name, passwordMD5);
        this.type = 'text-file';
        this.content = content.toString('latin1').replace(/ {2,}/, ' ').replace(/[\u00A0 ]{2,}/, '\u00A0').replace(/([^\/]) *([:%»]|km)/img, '$1\u00A0$2').replace(/ +([?!;])/img, '\u00A0$1').replace(/([«]) */img, '$1\u00A0').replace(/(\d) +(\d)/img, '$1\u00A0$2');
        this.openWindowOnRight = openWindowOnRight;
    }
    createWindow() {
        const window = new Window_1.TextFileWindow(this);
        window.displayOnRightSide = this.openWindowOnRight;
        return window;
    }
}
exports.TextFile = TextFile;
class Folder extends File {
    constructor(name, files, passwordMD5) {
        super(name, passwordMD5);
        this.type = 'folder';
        this.files = files;
        for (const file of this.files) {
            file.parentFolder = this;
        }
    }
    createWindow() {
        const window = new Window_1.FolderWindow(this.files);
        return window;
    }
}
exports.Folder = Folder;
class ImageFile extends File {
    constructor(name, imageUrl, passwordMD5) {
        super(name, passwordMD5);
        this.type = 'image-file';
        this.imageUrl = imageUrl;
    }
    createWindow() {
        const window = new Window_1.ImageViewerWindow(this, this.parentFolder);
        return window;
    }
}
exports.ImageFile = ImageFile;
//# sourceMappingURL=File.js.map