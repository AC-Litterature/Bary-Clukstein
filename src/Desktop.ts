import { File, Folder, ImageFile, TextFile } from "./File";
import { View } from "./View";
import { Window } from "./Window";
import * as fs from 'fs';
import { Icon } from "./Icon";
import { Screen } from "./Screen";

export class Desktop {
    protected createImageFolder(filesName: string[], rootFileName: string, folderName: string, passwordMD5?: string) {
        const getName = (item: string) => item.padStart('0000.png'.length, '0');
        const files = filesName
            .sort((a, b) => getName(a).localeCompare(getName(b)))
            .map(fileName => new ImageFile(`${rootFileName}${/(\d+)/.exec(fileName)[1].padStart(2, '0')}`, `assets/img/${folderName}/${fileName}`));
        
        return new Folder(folderName, files, passwordMD5);
    }

    public files: { [className: string]: File } = {
        '01bcr': new TextFile('01bcr', fs.readFileSync('assets/texts/01bcr.txt')),
        '02bcr': new TextFile('02bcr', fs.readFileSync('assets/texts/02bcr.txt'), 'c2759609c958d9140ef4056ca0466af9'),
        'lowell': new TextFile('Lowell', fs.readFileSync('assets/texts/Lowell.txt'), '1fa535c08704eabb82938c06ee3fd02c', false),
        '01bcp': this.createImageFolder(fs.readdirSync('assets/img/01bcp'), 'e1', '01bcp', 'b1781c7e7d8ca2150785bd0c61329146'),
        '02bcp': this.createImageFolder(fs.readdirSync('assets/img/02bcp'), 'e2', '02bcp', 'a94351f6cb83d0ea347f00555c45bdda'),
        '03bcp': this.createImageFolder(fs.readdirSync('assets/img/03bcp'), 'e3', '03bcp', '2a35677d713fc398abaa794723096cc4'),
        'z426': new ImageFile('z426', 'assets/img/z426/40.jpg', '14864edc162364ff4ff102a9b2f78e98'),
    };

    public isSessionOpen = false;
    protected windows: { [key: string]: Window } = {};

    public addWindow(window: Window) {
        this.windows[window.position] = window;
    }
    public removeWindow(window: Window) {
        delete this.windows[window.position];
    }
    
    public get view() {
        const view = new View();
        view.class('desktop');

        if(this.isSessionOpen) {
            view.div(view => {
                view.class('desktop-content');
                
                {
                    const icon = new Icon();
                    icon.activeImageUrl = `assets/img/icones/icone demarrage session ouverte active.png`;
                    icon.neutralImageUrl = `assets/img/icones/icone demarrage session ouverte neutre.png`;
                    const iconView = icon.view;
                    iconView.class('file', 'file-session');
                    iconView.onClick(() => {
                        this.isSessionOpen = false;
                        Screen.instance.refresh();
                    })
                    view.add(iconView);
                }

                for(const fileClassName in this.files) {
                    const icon = this.files[fileClassName].icon;
                    icon.class(`file-${fileClassName}`);
                    view.add(icon);
                }

                for(const key in this.windows) {
                    view.add(this.windows[key]);
                }
            })
        } else {
            view.div(view => {
                view.class('desktop-session-screen');
                const icon = new Icon();
                icon.activeImageUrl = `assets/img/icones/icone demarrage session fermee active.png`;
                icon.neutralImageUrl = `assets/img/icones/icone demarrage session fermee neutre.png`;
                const iconView = icon.view;
                iconView.onClick(() => {
                    this.isSessionOpen = true;
                    Screen.instance.refresh();
                })
                view.add(iconView);
            })
        }

        return view;
    }
}
