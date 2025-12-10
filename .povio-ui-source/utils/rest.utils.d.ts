import { AxiosError, AxiosResponseHeaders } from 'axios';
export declare namespace RestUtils {
    const extractServerResponseCode: (e: unknown) => string | null;
    /**
     * @deprecated should use response codes instead
     */
    const doesServerErrorMessageContain: (e: AxiosError, text: string) => boolean;
    const extractServerErrorMessage: (e: unknown) => string | null;
    const extractContentDispositionFilename: (headers: AxiosResponseHeaders) => string | undefined;
}
