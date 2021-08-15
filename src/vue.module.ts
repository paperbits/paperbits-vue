import { Bag } from "@paperbits/common";
import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { ComponentBinder } from "@paperbits/common/editing/componentBinder";
import { VueComponentBinder } from "./bindings";


export class VueModule implements IInjectorModule {
    public register(injector: IInjector): void {
        const componentBinders = injector.resolve<Bag<ComponentBinder>>("componentBinders");
        componentBinders["vue"] = new VueComponentBinder();
    }
}