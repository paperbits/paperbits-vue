/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import { MetadataKeys } from "../constants";

/**
 * Vue JS lifecycle hook helper.
 * https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks
 * @param hookName Name of the instance lifecycle hooks
 */
export function LifecycleHook(hookName: string): any {
    return function (target: any, propertyKey: string): any {
        Reflect.defineMetadata(MetadataKeys.Lifecycle, hookName, target[propertyKey]);
    };
}
