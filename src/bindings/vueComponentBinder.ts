/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */
import { ComponentBinder } from "@paperbits/common/editing/componentBinder";
import { WidgetBinding } from "@paperbits/common/editing/widgetBinding";

export class VueComponentBinder implements ComponentBinder {
    public init(element: Element, binding: WidgetBinding<any, any>): void {
        let flowClassName;

        switch (binding.flow) {
            case "block":
                flowClassName = "block";
                break;
            case "inline":
                flowClassName = "inline";
                break;
            case "none":
                flowClassName = "placeholder";
                break;
            default:
                console.warn(`Uknown component flow: ${binding.flow}`);
        }

        element.classList.add(flowClassName);
        
        const component = Reflect.getMetadata("paperbits-vue-component", binding.viewModelClass).component;

        const viewModelInstance = new component().$mount(element);

        binding.viewModel = viewModelInstance;

        if (binding.onCreate) {
            binding.onCreate(viewModelInstance);
        }
    }

    public dispose(element: Element, binding: WidgetBinding<any, any>): void {
        if (binding.onDispose) {
            binding.onDispose();
        }
    }
}