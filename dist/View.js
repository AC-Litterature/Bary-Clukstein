"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
class View {
    constructor(tagName = 'div') {
        this.element = document.createElement(tagName);
    }
    add(item) {
        if (typeof item === 'string') {
            this.element.insertAdjacentHTML('beforeend', item);
        }
        else {
            const element = item instanceof View ? item.element : item instanceof HTMLElement ? item : item.view.element;
            this.element.appendChild(element);
        }
        return this;
    }
    class(...names) {
        names = names.filter(n => n);
        if (names.length > 0) {
            this.element.classList.add(...names);
        }
        return this;
    }
    onClick(event) {
        this.element.onclick = () => event();
    }
    onMouseEnterLeave(event) {
        this.element.onmouseenter = () => event(true);
        this.element.onmouseleave = () => event(false);
    }
    div(fn) {
        const view = new View();
        fn(view);
        this.add(view);
        return this;
    }
    span(fn) {
        const view = new View('span');
        fn(view);
        this.add(view);
        return this;
    }
}
exports.View = View;
//# sourceMappingURL=View.js.map