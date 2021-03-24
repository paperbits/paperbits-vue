/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

 import { ComponentBinder } from "@paperbits/common/editing/componentBinder";
 import { WidgetBinding } from "@paperbits/common/editing/widgetBinding";

 export class ReactComponentBinder implements ComponentBinder {
     public init(element: Element, binding: WidgetBinding<any, any>): void {
        //  const viewModelInstance = ...
        //  binding.viewModel = viewModelInstance;
 
        //  if (binding.onCreate) {
        //      binding.onCreate(viewModelInstance);
        //  }
     }
 
     public dispose(element: Element, binding: WidgetBinding<any, any>): void {
         if (binding.onDispose) {
             binding.onDispose();
         }
     }
 }