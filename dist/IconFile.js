"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconFile = void 0;
const Icon_1 = require("./Icon");
const View_1 = require("./View");
class IconFile extends Icon_1.Icon {
    constructor(name) {
        super();
        this.name = name;
    }
    get textElement() {
        return new View_1.View().class('icon-text').add(this.name);
    }
    get view() {
        const view = super.view;
        view.add(this.textElement);
        return view;
    }
}
exports.IconFile = IconFile;
//# sourceMappingURL=IconFile.js.map