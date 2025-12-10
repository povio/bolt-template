export declare function useDebounceCallback<T extends (...args: any[]) => any>(callback?: T, { delay }?: {
    delay?: number;
}): {
    callback: (...args: Parameters<T>) => void;
    isDebouncing: boolean;
};
