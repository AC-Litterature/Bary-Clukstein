"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Desktop = void 0;
const File_1 = require("./File");
const View_1 = require("./View");
const fs = require("fs");
const Icon_1 = require("./Icon");
const Screen_1 = require("./Screen");
class Desktop {
    constructor() {
        this.files = {
            '01bcr': new File_1.TextFile('01bcr', fs.readFileSync('assets/texts/01bcr.txt')),
            '02bcr': new File_1.TextFile('02bcr', fs.readFileSync('assets/texts/02bcr.txt'), 'c2759609c958d9140ef4056ca0466af9'),
            'lowell': new File_1.TextFile('Lowell', fs.readFileSync('assets/texts/Lowell.txt'), '1fa535c08704eabb82938c06ee3fd02c', false),
            '01bcp': this.createImageFolder(fs.readdirSync('assets/img/01bcp'), 'e1', '01bcp', 'b1781c7e7d8ca2150785bd0c61329146'),
            '02bcp': this.createImageFolder(fs.readdirSync('assets/img/02bcp'), 'e2', '02bcp', 'a94351f6cb83d0ea347f00555c45bdda'),
            '03bcp': this.createImageFolder(fs.readdirSync('assets/img/03bcp'), 'e3', '03bcp', '2a35677d713fc398abaa794723096cc4'),
            'z426': new File_1.ImageFile('z426', 'assets/img/z426/40.jpg', '14864edc162364ff4ff102a9b2f78e98'),
        };
        this.isSessionOpen = false;
        this.windows = {};
    }
    createImageFolder(filesName, rootFileName, folderName, passwordMD5) {
        const getName = (item) => item.padStart('0000.png'.length, '0');
        const files = filesName
            .sort((a, b) => getName(a).localeCompare(getName(b)))
            .map(fileName => new File_1.ImageFile(`${rootFileName}${/(\d+)/.exec(fileName)[1].padStart(2, '0')}`, `assets/img/${folderName}/${fileName}`));
        return new File_1.Folder(folderName, files, passwordMD5);
    }
    addWindow(window) {
        this.windows[window.position] = window;
    }
    removeWindow(window) {
        delete this.windows[window.position];
    }
    get view() {
        const view = new View_1.View();
        view.class('desktop');
        if (this.isSessionOpen) {
            view.div(view => {
                view.class('desktop-content');
                {
                    const icon = new Icon_1.Icon();
                    icon.activeImageUrl = `assets/img/icones/icone demarrage session ouverte active.png`;
                    icon.neutralImageUrl = `assets/img/icones/icone demarrage session ouverte neutre.png`;
                    const iconView = icon.view;
                    iconView.class('file', 'file-session');
                    iconView.onClick(() => {
                        this.isSessionOpen = false;
                        Screen_1.Screen.instance.refresh();
                    });
                    view.add(iconView);
                }
                for (const fileClassName in this.files) {
                    const icon = this.files[fileClassName].icon;
                    icon.class(`file-${fileClassName}`);
                    view.add(icon);
                }
                for (const key in this.windows) {
                    view.add(this.windows[key]);
                }
            });
        }
        else {
            view.div(view => {
                view.class('desktop-session-screen');
                const icon = new Icon_1.Icon();
                icon.activeImageUrl = `assets/img/icones/icone demarrage session fermée active.png`;
                icon.neutralImageUrl = `assets/img/icones/icone demarrage session fermée neutre.png`;
                const iconView = icon.view;
                iconView.onClick(() => {
                    this.isSessionOpen = true;
                    Screen_1.Screen.instance.refresh();
                });
                view.add(iconView);
            });
        }
        return view;
    }
}
exports.Desktop = Desktop;
//# sourceMappingURL=Desktop.js.map