import { ComponentFactory } from "./componentFactory";

export class ComponentFactoryBrowser implements ComponentFactory {
    public async createInstance<TInstance>(element: Element, classInstance: any): Promise<TInstance> {
        const viewModelInstance = classInstance.$mount(element);
        return viewModelInstance;
    }
}