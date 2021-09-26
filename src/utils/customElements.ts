/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import Vue from "vue";
import wrap from "./customElementsWrapper";

/**
 * Registers specified Vue component as custom element.
 * @param vueComponent - Vue component declaration.
 * @param {string} tag - Name of the tag. If not specified, name of the component used.
 */
export function registerCustomElement(vueComponent: any, tag?: string): void {
    const CustomElement = wrap(Vue, vueComponent)
    window.customElements.define(tag, CustomElement)
}