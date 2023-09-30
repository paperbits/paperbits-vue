import Vue from "vue";
import { StyleModel } from "@paperbits/common/styles";
import { DirectiveBinding } from "vue/types/options";


export class StyledDirective {
    constructor() {
        Vue.directive("styled", {
            update: function (element: HTMLElement, binding: DirectiveBinding): void {
                const styleModel: StyleModel = binding.value;

                if (!styleModel) {
                    return;
                }

                if (styleModel.styleManager) {
                    styleModel.styleManager.setStyleSheet(styleModel.styleSheet);
                }

                const classNames = styleModel.classNames?.split(" ");

                if (classNames) {
                    element.classList.add(...classNames);
                }
            },

            unbind(element: HTMLElement, binding) {
                const styleModel: StyleModel = binding.value;

                if (styleModel.styleManager) {
                    styleModel.styleManager.removeStyleSheet(styleModel.styleSheet);
                }
            }
        });
    }
}