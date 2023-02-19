import Vue from "vue";
import { IInjector } from "@paperbits/common/injection";
import { ComponentConfig } from "./componentConfig";
import { MetadataKeys } from "./constants";


export function fromClassDefinition(target: any, config: ComponentConfig): Vue.Component {
    const constructor: any = target;

    const props = Reflect.getMetadata(MetadataKeys.Props, constructor);

    const data = () => {
        const injector: IInjector = Reflect.getMetadata(MetadataKeys.Injector, constructor);

        if (injector) {
            const resolution = injector.resolveClass(constructor);
            return resolution;
        }
        else {
            return new constructor();
        }
    };

    const vueComponentConfig = {
        template: config.template,
        props: props,
        data: data,
        methods: {},
        computed: {},
        watch: {},
        components: config.components,
        i18n: config.i18n,
        name: config.selector
    };

    const propertyNames = Object.getOwnPropertyNames(constructor.prototype);

    propertyNames.forEach(name => {
        const method = constructor.prototype[name];

        if (typeof method !== "function" || name === "constructor") {
            return;
        }

        const lifecycleHook = Reflect.getMetadata(MetadataKeys.Lifecycle, method);

        if (lifecycleHook) {
            vueComponentConfig[lifecycleHook] = method;
            return;
        }

        const computedPropertyName = Reflect.getMetadata(MetadataKeys.Computed, method);

        if (computedPropertyName) {
            vueComponentConfig.computed[computedPropertyName] = method;
            return;
        }

        const watchPropertyName = Reflect.getMetadata(MetadataKeys.Watch, method);

        if (watchPropertyName) {
            vueComponentConfig.watch[watchPropertyName] = method;
            return;
        }

        vueComponentConfig.methods[name] = method;
    });

    const vueComponent = Vue.component(vueComponentConfig.name, vueComponentConfig);

    return vueComponent;
}