/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import { MetadataKeys } from "../constants";

export function Prop(): PropertyDecorator {
    return function (target: Object, propertyKey: string | symbol): void {
        let props: string[] = Reflect.getMetadata(MetadataKeys.Props, target.constructor);
        if (!props) {
            props = [];
        }
        props.push(<string>propertyKey);
        Reflect.defineMetadata(MetadataKeys.Props, props, target.constructor);
    };
}
