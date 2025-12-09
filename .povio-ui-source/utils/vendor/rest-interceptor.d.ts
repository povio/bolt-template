import { AxiosInstance } from 'axios';
export declare class RestInterceptor<T extends any[]> {
    private applyInterceptor;
    private interceptorIdMap;
    constructor(applyInterceptor: (client: AxiosInstance, ...args: T) => number);
    addInterceptor(client: AxiosInstance, ...args: T): void;
    removeInterceptor(client: AxiosInstance): void;
}
