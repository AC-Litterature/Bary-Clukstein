import { View } from "./View";

export class Icon {
    public neutralImageUrl: string;
    public activeImageUrl: string;

    public isActive = false;

    public get view() {
        const view = new View();

        view.class('icon');
        view.onMouseEnterLeave(isEnter => {
            if(isEnter) {
                view.element.classList.add('active');
            } else {
                view.element.classList.remove('active');
            }
        })

        for(const info of [{ url: this.neutralImageUrl, class: 'neutral' }, { url: this.activeImageUrl, class: 'active' }]) {
            const img = document.createElement('img');
            img.src = info.url;
            img.setAttribute('draggable', false as any);
            img.classList.add(info.class);
            view.add(img);
        }

        return view;
    }
}
