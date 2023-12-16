import Vue from "vue";
import { Renderer, createRenderer } from "vue-server-renderer";
import { ComponentFactory } from "./componentFactory";

export class ComponentFactoryServer implements ComponentFactory {
    private readonly renderer: Renderer;

    constructor() {
        this.renderer = createRenderer();
    }

    public async createInstance<TInstance>(element: Element, classInstance: any): Promise<TInstance> {
        element.innerHTML = await this.renderer.renderToString(classInstance);
        const viewModelInstance = <TInstance>new Vue(classInstance);

        return viewModelInstance;
    }
}