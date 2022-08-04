
export class View<E extends HTMLElement = HTMLElement> {
    public constructor(tagName: string = 'div') {
        this.element = document.createElement(tagName) as E;
    }

    public element: E;

    public add(item: View | HTMLElement | { view: View } | string) {
        if(typeof item === 'string') {
            this.element.insertAdjacentHTML('beforeend', item);
        } else {
            const element = item instanceof View ? item.element : item instanceof HTMLElement ? item : item.view.element;
            this.element.appendChild(element);
        }
        return this;
    }

    public class(...names: string[]) {
        names = names.filter(n => n);
        if(names.length > 0) {
            this.element.classList.add(...names);
        }
        return this;
    }

    public onClick(event: () => void) {
        this.element.onclick = () => event();
    }

    public onMouseEnterLeave(event: (isEnter: boolean) => void) {
        this.element.onmouseenter = () => event(true);
        this.element.onmouseleave = () => event(false);
    }

    public div(fn: (div: View) => void) {
        const view = new View();
        fn(view);
        this.add(view);
        return this;
    }
    public span(fn: (div: View) => void) {
        const view = new View('span');
        fn(view);
        this.add(view);
        return this;
    }
}
