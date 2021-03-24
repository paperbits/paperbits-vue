/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

export function Computed(): MethodDecorator {
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata("computed", propertyKey, target[propertyKey]);
    };
}
