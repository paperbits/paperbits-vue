/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import { MetadataKeys } from "../constants";

export function Computed(): MethodDecorator {
    return function (target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata(MetadataKeys.Computed, propertyKey, target[propertyKey]);
    };
}
