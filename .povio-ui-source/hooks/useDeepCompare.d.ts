import { EffectCallback } from 'react';
export declare const useDeepCompareEffect: (callback: EffectCallback, dependencies: any[]) => void;
export declare const useDeepCompareLayoutEffect: (callback: EffectCallback, dependencies: any[]) => void;
export declare const useDeepCompareMemo: <T = any>(factory: () => T, dependencies: any[]) => T;
