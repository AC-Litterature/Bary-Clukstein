"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Icon = void 0;
const View_1 = require("./View");
class Icon {
    constructor() {
        this.isActive = false;
    }
    get view() {
        const view = new View_1.View();
        view.class('icon');
        view.onMouseEnterLeave(isEnter => {
            if (isEnter) {
                view.element.classList.add('active');
            }
            else {
                view.element.classList.remove('active');
            }
        });
        for (const info of [{ url: this.neutralImageUrl, class: 'neutral' }, { url: this.activeImageUrl, class: 'active' }]) {
            const img = document.createElement('img');
            img.src = info.url;
            img.setAttribute('draggable', false);
            img.classList.add(info.class);
            view.add(img);
        }
        return view;
    }
}
exports.Icon = Icon;
//# sourceMappingURL=Icon.js.map