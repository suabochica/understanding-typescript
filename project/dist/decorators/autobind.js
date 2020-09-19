/* Decorators
   -----------------------------------*/
export function autobind(target, methodName, descriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFunction = originalMethod.bind(this);
            return boundFunction;
        }
    };
    return adjustedDescriptor;
}
