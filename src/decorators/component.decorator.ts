/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import "reflect-metadata";
import { ComponentConfig } from "../componentConfig";
import { MetadataKeys } from "../constants";
import { fromClassDefinition } from "../utils";


export function Component(config: ComponentConfig): ClassDecorator {
    return function (target) {
        const vueComponent = fromClassDefinition(target, config);
        Reflect.defineMetadata(MetadataKeys.Component, { constructor: target, config: config, vueComponent: vueComponent }, target);
    };
}