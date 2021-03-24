/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import Vue from "vue";

export function RuntimeComponent(config: any): (target: Function) => void {
    return (target) => {
        const toKebabCase = (str: string): string => {
            return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
        };

        const toCamel = (value: string) => {
            return value.replace(/([-_][a-z])/ig, ($1) => {
                return $1.toUpperCase()
                    .replace("-", "")
                    .replace("_", "");
            });
        };

        const construct = Vue.component(config.selector);
        const attrs = Object.keys(construct["options"]["props"]).map(toKebabCase);

        class RuntimeComponentProxy extends HTMLElement {
            private instance: any;

            constructor() {
                super();
            }

            static get observedAttributes(): string[] {
                return attrs;
            }

            public connectedCallback(): void {
                setTimeout(() => {
                    this.instance = new construct();
                    const attrs = Array.prototype.slice.call(this.attributes);

                    attrs.forEach(attribute => {
                        this.instance[toCamel(attribute.name)] = attribute.value;
                    });

                    this.instance.$mount();
                    this.appendChild(this.instance.$el);
                }, 10); // Give the host a chance to configure attributes.
            }

            public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
                if (!this.instance) {
                    return;
                }

                this.instance[toCamel(name)] = newValue;
            }

            public disconnectedCallback(): void {
                this.instance.$destroy();
            }
        }

        customElements.define(config.selector, RuntimeComponentProxy);
    };
}