import { Renderer, createRenderer } from "vue-server-renderer";
import { ComponentFactory } from "./componentFactory";

export class ComponentFactoryServer implements ComponentFactory {
    private readonly renderer: Renderer;

    constructor() {
        this.renderer = createRenderer();
    }

    public async createInstance<TInstance>(element: Element, classInstance: any): Promise<TInstance> {
        const viewModelInstance = classInstance.$mount(element);

        setImmediate(async () => { // giving model binders a chance to pickup updates
            element.outerHTML = await this.renderer.renderToString(viewModelInstance);
        });

        return viewModelInstance;
    }
}