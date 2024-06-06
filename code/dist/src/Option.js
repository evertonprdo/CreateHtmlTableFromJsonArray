export var Option;
(function (Option) {
    class Target {
        element;
        constructor(target) {
            this.element = target;
        }
        get target() {
            return this.element;
        }
    }
    class HtmlAttribute extends Target {
        option;
        constructor(target, option) {
            super(target);
            this.option = option;
        }
        assignToHtml(key) {
            this.target.setAttribute(key, this.option[key]);
        }
        removeFromHtml(key) {
            this.target.removeAttribute(key);
        }
        setOption(key, value) {
            this.option[key] = value;
            this.assignToHtml(key);
        }
        removeOption(key) {
            delete this.option[key];
            this.removeFromHtml(key);
        }
        clearOptions() {
            Object.keys(this.option).forEach(key => {
                this.removeOption(key);
            });
        }
        get options() {
            return this.option;
        }
    }
    Option.HtmlAttribute = HtmlAttribute;
    class Custom {
    }
    Option.Custom = Custom;
    class Renderer {
        pagination;
        constructor() {
            this.pagination = { 'limit_rows': '25' };
        }
    }
    Option.Renderer = Renderer;
})(Option || (Option = {}));
