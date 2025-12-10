import { AxiosResponse } from 'axios';
export declare namespace FileUtils {
    const getObjectUrl: (data: Blob | AxiosResponse<Blob>, revokeTimeoutMs?: number) => string;
    const openFile: (data: Blob | AxiosResponse<Blob>, target?: string, revokeTimeoutMs?: number) => void;
    const downloadFile: (data: Blob | AxiosResponse<Blob>, fileName?: string, revokeTimeoutMs?: number) => void;
    const isFileTypeAccepted: (file: File, fileTypes?: readonly string[] | string[]) => boolean;
    const getCalculatedFileSize: (file?: File) => string;
    const formatBytes: (size: number, decimals?: number) => string;
}
