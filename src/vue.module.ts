import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { VueComponentBinder } from "./bindings";


export class VueModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindSingleton("vueComponentBinder", VueComponentBinder);
    }
}