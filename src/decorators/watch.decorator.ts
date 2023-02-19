/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import "reflect-metadata";
import { MetadataKeys } from "../constants";

export function Watch(propertyName: string): MethodDecorator {
    return function (target: Object, propertyKey: string | symbol): any {
        Reflect.defineMetadata(MetadataKeys.Watch, propertyName, target[propertyKey]);
    };
}
