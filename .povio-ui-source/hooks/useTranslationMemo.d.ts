import { TFunction } from 'i18next';
type TranslatedFunction<T> = ((t: TFunction) => T) | (() => T);
export declare function useTranslationMemo<T>(func: TranslatedFunction<T>): T;
export {};
