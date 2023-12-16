export interface ComponentFactory {
    createInstance<TInstance>(element: Element, classInstance: any): TInstance;
}