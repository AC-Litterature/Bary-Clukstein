import { Desktop } from "./Desktop";
import { View } from "./View";
import { FolderWindow, ImageViewerWindow, TextFileWindow, Window } from "./Window";

export class Screen {
    public static instance = new Screen();

    public desktop = new Desktop();
    public keyboardInput: (event: KeyboardEvent) => void;

    protected initialized = false;

    public refresh() {
        if(!this.initialized) {
            this.initialized = true;
            window.onkeydown = (e: KeyboardEvent) => {
                if(this.keyboardInput) {
                    this.keyboardInput(e);
                }
            }
        }

        this.keyboardInput = undefined;
        const oldScreen = document.querySelector('.screen-wrapper');
        oldScreen?.remove();

        const view = new View();
        view.class('screen-wrapper', this.desktop.isSessionOpen ? 'session-open' : 'session-closed');
        view.add(new View().class('screen-border-top'));
        view.div(view => {
            view.class('screen');
            view.add(new View().class('scanline'));
            view.add(this.desktop);
        })
        view.add(new View().class('screen-border-bottom'));

        document.body.appendChild(view.element);
    }
}
