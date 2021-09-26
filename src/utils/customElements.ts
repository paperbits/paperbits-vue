/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import Vue from "vue";
import vueCustomElement from "vue-custom-element"

Vue.use(vueCustomElement);

/**
 * Registers specified Vue component as custom element.
 * @param vueComponent - Vue component declaration.
 * @param {string} tag - Name of the tag. If not specified, name of the component used.
 */
export function registerCustomElement(vueComponent: any, tag?: string): void {
    const options = typeof vueComponent === "function"
        ? vueComponent.options
        : vueComponent;

    Vue.customElement(tag || options.name, options);
}