class Component {
    constructor({id, parent, template = () => `<div>default</div>`, templateParams = null, className, callbacks = {}}) {
        this.id = id;
        this.parent = parent;
        this.callbacks = callbacks;
        this._render(template(templateParams), className);
        this._addEventListeners();
    }

    show (id) {
        document.getElementById(id).classList.remove(`hide`)

    }
    hide (id) {
        document.getElementById(id).classList.add(`hide`)
    }

    _render(template, className) {
        const elem = document.createElement(`div`);
        elem.setAttribute(`id`, this.id);

        if(className) {
            elem.classList.add(className);
        }
        elem.innerHTML = template;

        if(this.parent) {
            document.getElementById(this.parent).appendChild(elem);
        } else {
            document.querySelector(`body`).appendChild(elem);
        }
    }
    
    _addEventListeners() {}
}