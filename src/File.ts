import { Icon } from "./Icon";
import { Screen } from "./Screen";
import { View } from "./View";
import { FolderWindow, ImageViewerWindow, PasswordWindow, TextFileWindow, Window } from "./Window";

export abstract class File {
    public constructor(name: string, passwordMD5: string) {
        this.name = name;

        this.passwordMD5 = passwordMD5;
    }

    public name: string;
    public parentFolder: Folder;
    public passwordMD5: string;

    protected abstract type: 'text-file' | 'image-file' | 'folder';

    protected get typeInfo() {
        return File.filesByType[this.type];
    }

    public static filesByType = {
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
    }

    public get icon() {
        const icon = new Icon();
        icon.neutralImageUrl = `assets/img/icones/${this.typeInfo.neutralImageUrl}`;
        icon.activeImageUrl = `assets/img/icones/${this.typeInfo.activeImageUrl}`;
        const view = icon.view;
        view.class(this.type, 'file');
        
        view.add(new View().class(`${this.type}-title`).add(this.name));

        view.onClick(() => {
            this.openWindow();
            Screen.instance.refresh();
        })

        return view;
    }

    public abstract createWindow(): Window;

    public openWindow() {
        let window: Window = this.createWindow();
        if(this.passwordMD5) {
            window = new PasswordWindow(this);
        }
        Screen.instance.desktop.addWindow(window);
    }
}

export class TextFile extends File {
    public constructor(name: string, content: string | Buffer, passwordMD5?: string, openWindowOnRight = true) {
        super(name, passwordMD5);

        this.content = content.toString('latin1').replace(/ {2,}/, ' ').replace(/[\u00A0 ]{2,}/, '\u00A0').replace(/([^\/]) *([:%»]|km)/img, '$1\u00A0$2').replace(/ +([?!;])/img, '\u00A0$1').replace(/([«]) */img, '$1\u00A0').replace(/(\d) +(\d)/img, '$1\u00A0$2');
        this.openWindowOnRight = openWindowOnRight;
    }

    public content: string;
    public openWindowOnRight: boolean;

    protected type: File['type'] = 'text-file';

    public createWindow() {
        const window = new TextFileWindow(this);
        window.displayOnRightSide = this.openWindowOnRight;
        return window;
    }
}
export class Folder extends File {
    public constructor(name: string, files: File[], passwordMD5?: string) {
        super(name, passwordMD5);

        this.files = files;

        for(const file of this.files) {
            file.parentFolder = this;
        }
    }

    protected type: File['type'] = 'folder';
    
    public files: File[];

    public createWindow() {
        const window = new FolderWindow(this.files);
        return window;
    }
}
export class ImageFile extends File {
    public constructor(name: string, imageUrl: string, passwordMD5?: string) {
        super(name, passwordMD5);

        this.imageUrl = imageUrl;
    }

    public imageUrl: string;

    protected type: File['type'] = 'image-file';

    public createWindow() {
        const window = new ImageViewerWindow(this, this.parentFolder);
        return window;
    }
}
