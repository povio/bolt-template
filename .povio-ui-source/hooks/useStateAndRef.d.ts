import { RefObject, SetStateAction } from 'react';
type StateRefReturn<T> = [T, RefObject<T>, (value: SetStateAction<T>) => void];
export declare const useStateAndRef: <T>(initialState: T | (() => T)) => StateRefReturn<T>;
export {};
