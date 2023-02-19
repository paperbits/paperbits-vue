/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import Vue from "vue";
import * as Utils from "@paperbits/common/utils";
import { ComponentBinder } from "@paperbits/common/components";
import { IInjector } from "@paperbits/common/injection";
import { MetadataKeys } from "../constants";
import { fromClassDefinition } from "../utils";


const toKebabCase = (str: string): string => {
    return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
};

const toCamelCase = (value: string) => {
    return value.replace(/([-_][a-z])/ig, ($1) => {
        return $1.toUpperCase()
            .replace("-", "")
            .replace("_", "");
    });
};

/**
 * Registers specified Vue component as custom element.
 * @param vueComponent - Vue component declaration.
 * @param {string} tag - Name of the tag. If not specified, name of the component used.
 */
export function registerCustomElement(vueComponent: any /* class or Vue.Component */, tag: string, injector?: IInjector): void {
    Reflect.defineMetadata(MetadataKeys.Injector, injector, vueComponent);

    const componentMetadata = Reflect.getMetadata(MetadataKeys.Component, vueComponent);

    if (componentMetadata) {
        vueComponent = fromClassDefinition(vueComponent, componentMetadata.config)
    }

    const attrs = Object.keys(vueComponent["options"]["props"]).map(toKebabCase);

    class RuntimeComponentProxy extends HTMLElement {
        private instance: any;

        constructor() {
            super();
        }

        static get observedAttributes(): string[] {
            return attrs;
        }

        public async connectedCallback(): Promise<void> {
            await Utils.delay(10); // Give the host a chance to configure attributes.

            const props = {};
            const attrs = Array.prototype.slice.call(this.attributes);

            attrs.forEach(attribute => {
                props[toCamelCase(attribute.name)] = attribute.value;
            });

            if (injector) {
                const componentBinder = injector.resolve<ComponentBinder>("vueComponentBinder");
                this.instance = await componentBinder.bind(this, vueComponent, props);
            }
            else {
                const construct = Vue.component(tag);
                this.instance = new construct();
                const attrs = Array.prototype.slice.call(this.attributes);

                attrs.forEach(attribute => {
                    this.instance[toCamelCase(attribute.name)] = attribute.value;
                });

                this.instance.$mount();
                this.appendChild(this.instance.$el);
            }
        }

        public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
            if (!this.instance) {
                return;
            }

            this.instance[toCamelCase(name)] = newValue;
        }

        public disconnectedCallback(): void {
            this.instance.$destroy();
        }
    }

    customElements.define(tag, RuntimeComponentProxy)
}