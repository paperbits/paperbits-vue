import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { VueComponentBinder } from "./bindings/vueComponentBinder";
import { ComponentFactoryServer } from "./bindings/componentFactory.server";


export class VueModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindSingleton("componentFactory", ComponentFactoryServer);
        injector.bindSingleton("vueComponentBinder", VueComponentBinder);
    }
}