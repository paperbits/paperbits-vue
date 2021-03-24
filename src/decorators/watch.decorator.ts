/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import "reflect-metadata";

export function Watch(propertyName: string): MethodDecorator {
    return function (target: any, propertyKey: string): any {
        Reflect.defineMetadata("watch", propertyName, target[propertyKey]);
    };
}
