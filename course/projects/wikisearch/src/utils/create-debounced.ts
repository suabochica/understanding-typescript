import { createSignal } from "solid-js";

export const createDebounced = <T>(initialValue: T, mills: number) => {
    const [value, setValue] = createSignal<T>(initialValue);

    let timeout: number;
    const setValueDebounced = (newValue: T) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            setValue(() => newValue);
        }, mills)
    };

    return [value, setValueDebounced] as const;
};
