import { Type } from "../utils/Types";

export namespace Option {

    abstract class Target {
        private readonly element: HTMLElement
        constructor(target: HTMLElement) {
            this.element = target;
        }

        get target() {
            return this.element;
        }
    }
    /**
     * Classe de definição e atribuição de atributos a elementos HTML
     * @param target
     */
    export class HtmlAttribute extends Target {
        private option: Type.Option

        constructor(target: HTMLElement, option: Type.Option) {
            super(target);
            this.option = option
        }

        private assignToHtml(key: string): void {
            this.target.setAttribute(key, this.option[key])
        }

        private removeFromHtml(key: string): void {
            this.target.removeAttribute(key)
        }

        public setOption(key: string, value: string): void {
            this.option[key] = value;
            this.assignToHtml(key);
        }

        public removeOption(key: string) : void {
            delete this.option[key];
            this.removeFromHtml(key);
        }

        public clearOptions(): void {
            Object.keys(this.option).forEach(key => {
                this.removeOption(key);
            });
        }

        get options() {
            return this.option
        }
    }

    export class Custom {

    }

    export class Renderer {
        pagination: Type.Option;

        constructor() {
            this.pagination = { 'limit_rows': '25' }
        }
    }
}