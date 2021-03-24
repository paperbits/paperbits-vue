/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

export function Prop(): PropertyDecorator {
    return function (target: any, propertyKey: string) {
        let props: string[] = Reflect.getMetadata("props", target.constructor);
        if (!props) {
            props = [];
        }
        props.push(propertyKey);
        Reflect.defineMetadata("props", props, target.constructor);
    };
}
