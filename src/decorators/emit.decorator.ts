/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

export function Emit(eventName: string): PropertyDecorator {
    return function (target: any, propertyKey: string) {
        target[propertyKey] = function (...args) {
            this.$emit(eventName, ...args);
        };
    };
}
