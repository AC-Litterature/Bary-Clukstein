"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Screen = void 0;
const Desktop_1 = require("./Desktop");
const View_1 = require("./View");
class Screen {
    constructor() {
        this.desktop = new Desktop_1.Desktop();
        this.initialized = false;
    }
    refresh() {
        if (!this.initialized) {
            this.initialized = true;
            window.onkeydown = (e) => {
                if (this.keyboardInput) {
                    this.keyboardInput(e);
                }
            };
        }
        this.keyboardInput = undefined;
        const oldScreen = document.querySelector('.screen-wrapper');
        oldScreen === null || oldScreen === void 0 ? void 0 : oldScreen.remove();
        const view = new View_1.View();
        view.class('screen-wrapper', this.desktop.isSessionOpen ? 'session-open' : 'session-closed');
        view.add(new View_1.View().class('screen-border-top'));
        view.div(view => {
            view.class('screen');
            view.add(new View_1.View().class('scanline'));
            view.add(this.desktop);
        });
        view.add(new View_1.View().class('screen-border-bottom'));
        document.body.appendChild(view.element);
    }
}
exports.Screen = Screen;
Screen.instance = new Screen();
//# sourceMappingURL=Screen.js.map