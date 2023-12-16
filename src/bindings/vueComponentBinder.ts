/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */
import { ComponentBinder } from "@paperbits/common/components";
import { IInjector } from "@paperbits/common/injection";
import { MetadataKeys } from "../constants";
import { ComponentFactory } from "./componentFactory";


export class VueComponentBinder implements ComponentBinder {
    constructor(
        private readonly injector: IInjector,
        private readonly componentFactory: ComponentFactory
    ) { }

    public async bind<TInstance>(element: Element, componentDefinition: unknown, componentParams?: unknown): Promise<TInstance> {
        const constructor = <any>componentDefinition;
        const componentMetadata = Reflect.getMetadata(MetadataKeys.Component, constructor);

        let vueComponent; // Vue.Component

        if (componentMetadata) {  // decorated class
            vueComponent = componentMetadata.vueComponent;
            Reflect.defineMetadata(MetadataKeys.Injector, this.injector, componentMetadata.constructor);
        }
        else { // classic component
            vueComponent = componentDefinition;
        }

        const classInstance = new vueComponent();

        if (componentParams) {
            Object.keys(componentParams).forEach(propertyName => {
                classInstance[propertyName] = componentParams[propertyName];
            });
        }

        const viewModelInstance = await this.componentFactory.createInstance(element, classInstance);

        return <TInstance>viewModelInstance;
    }

    public async unbind?(element: Element): Promise<any> {
        // not supported
    }
}