/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import "reflect-metadata";
import { Component } from "./component.decorator";
import { LifecycleHook } from "./lifecylceHook";

export const OnBeforeCreate = () => LifecycleHook("beforeCreate");
export const OnCreated = () => LifecycleHook("created");
export const OnBeforeMount = () => LifecycleHook("beforeMount");
export const OnMounted = () => LifecycleHook("mounted");
export const OnBeforeDestroy = () => LifecycleHook("beforeDestroy");
export const OnDestroyed = () => LifecycleHook("destroyed");
export const OnBeforeUpdate = () => LifecycleHook("beforeUpdate");
export const OnUpdated = () => LifecycleHook("updated");
export const OnActivated = () => LifecycleHook("activated");
export const OnDeactivated = () => LifecycleHook("deactivated");
export const OnRender = () => LifecycleHook("render");
export const OnErrorCaptured = () => LifecycleHook("errorCaptured");

Component.prototype.getInstance = (constructor) => {
    return new constructor();
};