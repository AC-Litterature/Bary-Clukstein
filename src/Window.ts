import { Icon } from "./Icon";
import { Screen } from "./Screen";
import { File, Folder, ImageFile, TextFile } from "./File";
import { View } from "./View";

export abstract class Window {
    protected abstract type: 'image-viewer' | 'folder' | 'text-file-right' | 'text-file-left' | 'password';

    public get position() {
        switch(this.type) {
            case 'folder':
                return 'bottom-left';
            case 'text-file-left':
            case 'image-viewer':
                return 'top-left';
            case 'text-file-right':
                return 'right';
            case 'password':
                return 'modal';
        }
    }

    public close() {
        Screen.instance.desktop.removeWindow(this);
    }

    protected createArrow(direction: 'right' | 'left' | 'up' | 'down', isVisible: boolean, onClick: () => void) {
        const arrow = new Icon();
        arrow.activeImageUrl = 'assets/img/flèche/fleche active.png';
        arrow.neutralImageUrl = 'assets/img/flèche/fleche neutre.png';
        const view = arrow.view;
        view.class(`arrow-${direction}`);
        if(!isVisible) {
            view.class('invisible');
        }
        view.onClick(onClick);
        return view;
    }

    protected get contentView() {
        const view = new View();

        view.class('window-content');

        return view;
    }

    public get view() {
        const view = new View();

        view.class('window', `window-${this.type}`);
        
        view.div(d => {
            d.class('header');

            const img = document.createElement('img');
            img.src = `assets/img/bandeaux/bandeau haut fond.jpg`;
            img.setAttribute('draggable', false as any);
            img.classList.add('background');
            d.add(img);

            const btn = new Icon();
            btn.activeImageUrl = 'assets/img/bandeaux/croix active.jpg';
            btn.neutralImageUrl = 'assets/img/bandeaux/croix neutre.jpg';
            const closeBtn = btn.view;
            closeBtn.element.classList.add('close-btn');
            closeBtn.onClick(() => {
                this.close();
                Screen.instance.refresh();
            });
            d.add(closeBtn);
        })

        view.add(this.contentView);

        return view;
    }
}

export class PasswordWindow extends Window {
    public constructor(file: File) {
        super();

        this.file = file;
    }

    protected type: Window['type'] = 'password';

    protected hash(input: string) {
        const MD5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}
        return MD5(input);
    }
    
    public file: File;
    public currentInput: string = '';
    public passwordSize = 6;
    protected lastPasswordError = false;
    protected lastCharError = false;
    
    public get passwordMD5() {
        return this.file.passwordMD5;
    }
    
    public get windowToOpen() {
        return this.file.createWindow();
    }

    public testPassword(password: string) {
        return this.hash(password) === this.passwordMD5;
    }
    
    protected override get contentView(): View {
        const view = super.contentView;

        Screen.instance.keyboardInput = (e) => {
            const key = e.key.toUpperCase().trim();

            if(key === 'BACKSPACE') {
                this.currentInput = this.currentInput.substring(0, this.currentInput.length - 1);
            } else {
                if(key.length === 1) {
                    const charCode = key.charCodeAt(0);
                    if('A'.charCodeAt(0) <= charCode && charCode <= 'Z'.charCodeAt(0) || '0'.charCodeAt(0) <= charCode && charCode <= '9'.charCodeAt(0)) {
                        this.currentInput += key;
                    } else {
                        this.lastCharError = true;
                    }
                }
            }

            if(this.currentInput.length === this.passwordSize) {
                if(this.testPassword(this.currentInput)) {
                    this.file.passwordMD5 = undefined;
                    this.close();
                    Screen.instance.desktop.addWindow(this.windowToOpen);
                } else {
                    this.lastPasswordError = true;
                }

                this.currentInput = '';
            }

            Screen.instance.refresh();
        }

        view.div(view => view.class('header-text').add(`Mot de passe :`));
        view.div(view => {
            view.class('password-char-list');
            for(let i = 0; i < this.passwordSize; ++i) {
                view.div(view => {
                    view.class('password-char').add(this.currentInput[i]?.trim() || '&nbsp;');

                    if(this.lastCharError && this.currentInput.length === i) {
                        this.lastCharError = false;
                        let nb = 0;
                        const fn = () => {
                            ++nb;
                            view.element.classList.toggle('ping');
                            if(nb < 4) {
                                setTimeout(fn, 100);
                            }
                        };
                        fn();
                    }
                });
            }

            if(this.lastPasswordError) {
                this.lastPasswordError = false;
                let nb = 0;
                const fn = () => {
                    ++nb;
                    view.element.classList.toggle('ping');
                    if(nb < 4) {
                        setTimeout(fn, 100);
                    }
                };
                fn();
            }
        })

        return view;
    }
}

export class ImageViewerWindow extends Window {
    public constructor(imageFile: ImageFile, parentFolder?: Folder) {
        super();

        this.files = (parentFolder?.files ?? [ imageFile ]).filter(file => file instanceof ImageFile) as ImageFile[];
        this.currentFileIndex = this.files.indexOf(imageFile);
    }

    protected type: Window['type'] = 'image-viewer';
    
    public get imageFile() {
        return this.files[this.currentFileIndex];
    }
    public files: ImageFile[];
    
    public currentFileIndex: number = 0;

    public get nbPage() {
        return this.files.length;
    }

    public get currentFile() {
        return this.files[this.currentFileIndex];
    }

    protected override get contentView(): View {
        const view = super.contentView;

        view.div(view => {
            view.class('image-wrapper');
            view.element.style.backgroundImage = `url('${this.imageFile.imageUrl}')`;

        })

        view.div(view => {
            view.class('nav');

            view.add(this.createArrow('left', this.nbPage > 0, () => {
                --this.currentFileIndex;
                while(this.currentFileIndex < 0) {
                    this.currentFileIndex += this.nbPage;
                }
                Screen.instance.refresh();
            }));

            if(this.currentFile) {
                view.add(`/${this.currentFile.name}.isc`);
            }
            
            view.add(this.createArrow('right', this.nbPage > 0, () => {
                this.currentFileIndex = (this.currentFileIndex + 1) % this.nbPage;
                Screen.instance.refresh();
            }));
        });

        return view;
    }
}
export class FolderWindow extends Window {
    public constructor(files: File[]) {
        super();

        this.files = files;
    }

    protected type: Window['type'] = 'folder';

    public files: File[];

    public currentPageIndex: number = 0;
    public nbFilesPerLine = 4;

    public get nbTotalLines() {
        return Math.ceil(this.files.length / this.nbFilesPerLine);
    }
    public get nbPage() {
        return this.nbTotalLines + 1 - this.nbLines;
    }

    public nbLines = 2;

    protected override get contentView(): View {
        const view = super.contentView;

        for(let i = 0; i < this.nbLines; ++i) {
            const index = this.currentPageIndex + i;

            view.div(view => {
                view.class('row');

                for(const file of this.files.slice(index * this.nbFilesPerLine, (index + 1) * this.nbFilesPerLine)) {
                    view.add(file.icon);
                }
            })
        }

        view.div(view => {
            view.class('nav');

            view.add(this.createArrow('up', this.currentPageIndex > 0, () => {
                this.currentPageIndex = Math.max(0, this.currentPageIndex - 1);
                Screen.instance.refresh();
            }));

            view.add(`${this.currentPageIndex + 1}/${this.nbPage}`);
            
            view.add(this.createArrow('down', this.currentPageIndex + 1 < this.nbPage, () => {
                this.currentPageIndex = Math.min(this.nbPage - 1, this.currentPageIndex + 1);
                Screen.instance.refresh();
            }));
        });

        return view;
    }
}
export class TextFileWindow extends Window {
    public displayOnRightSide = true;

    protected get type(): Window['type'] {
        return `text-file-${this.displayOnRightSide ? 'right' : 'left'}`;
    }

    public constructor(file: TextFile) {
        super();

        this.file = file;
    }

    public get contentText() {
        return this.file.content;
    }
    public file: TextFile;

    public static nbCharsPerLine = 45;
    public static paragraphFirstLineIndent = 0;

    public get nbLinesPerPage() {
        return this.displayOnRightSide ? 27 : 16;
    }

    public get pages() {
        const pages: string[] = [];

        const txt = this.contentText.trim();
        
        const firstLine = new Array(TextFileWindow.paragraphFirstLineIndent).fill(' ').join('');

        const lines: string[] = [];
        let currentLine = firstLine;
        for(let i = 0; i < txt.length; ++i) {
            const char = txt[i];
            if(char === '\n') {
                if(currentLine) {
                    lines.push(currentLine);
                    currentLine = firstLine;
                }
            } else {
                if(char !== ' ' || currentLine.trim()) {
                    currentLine += char;
                }
            }

            if(currentLine.length === TextFileWindow.nbCharsPerLine) {
                if([ ' ', '\n' ].includes(txt[i + 1])) {
                    lines.push(currentLine);
                    currentLine = '';
                } else {
                    const index = currentLine.lastIndexOf(' ');
                    if(index === -1) {
                        lines.push(currentLine);
                        currentLine = '';
                    } else {
                        lines.push(currentLine.substring(0, index));
                        currentLine = currentLine.substring(index + 1);
                    }
                }
            }
        }
        if(currentLine.trim()) {
            lines.push(currentLine);
            currentLine = '';
        }

        let currentPage: string[] = [];
        for(let i = 0; i < lines.length; ++i) {
            currentPage.push(lines[i]);
            if((i + 1) % this.nbLinesPerPage === 0) {
                pages.push(currentPage.join('\n'));
                currentPage = [];
            }
        }
        if(currentPage.length > 0) {
            pages.push(currentPage.join('\n'));
            currentPage = [];
        }

        return pages;
    }

    public get currentPage() {
        return this.pages[this.currentPageIndex];
    }
    
    public currentPageIndex: number = 0;

    public get nbPage() {
        return this.pages.length;
    }

    protected override get contentView(): View {
        const view = super.contentView;

        view.div(view => view.class('footer-text').add(`./: 1 /${this.file.name}.tf`));

        view.div(view => {
            view.class('text').add(this.currentPage);
        })

        view.div(view => {
            view.class('nav');

            view.add(this.createArrow('left', this.currentPageIndex > 0, () => {
                this.currentPageIndex = Math.max(0, this.currentPageIndex - 1);
                Screen.instance.refresh();
            }));

            view.add(`${this.currentPageIndex + 1}/${this.nbPage}`);
            
            view.add(this.createArrow('right', this.currentPageIndex + 1 < this.nbPage, () => {
                this.currentPageIndex = Math.min(this.nbPage - 1, this.currentPageIndex + 1);
                Screen.instance.refresh();
            }));
        });

        return view;
    }
}
