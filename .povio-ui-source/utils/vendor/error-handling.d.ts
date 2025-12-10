export type GeneralErrorCodes = "DATA_VALIDATION_ERROR" | "NETWORK_ERROR" | "CANCELED_ERROR" | "INTERNAL_ERROR" | "UNKNOWN_ERROR";
export declare class ApplicationException<CodeT> extends Error {
    code: CodeT;
    serverMessage: string | null;
    constructor(message: string, code: CodeT, serverMessage: string | null);
}
interface ErrorEntry<CodeT> {
    code: CodeT;
    condition: (error: unknown) => boolean;
    getMessage: (error: unknown) => string;
}
export declare class ErrorHandler<CodeT extends string> {
    entries: ErrorEntry<CodeT | GeneralErrorCodes>[];
    constructor(entries: ErrorEntry<CodeT>[]);
    rethrowError(error: unknown): ApplicationException<CodeT | GeneralErrorCodes>;
    getError(error: unknown): ApplicationException<CodeT | GeneralErrorCodes> | null;
    getErrorCode(error: unknown): CodeT | GeneralErrorCodes | null;
    static getErrorMessage(error: unknown, fallbackToUnknown?: boolean): string | null;
}
export declare const SharedErrorHandler: ErrorHandler<never>;
export {};
