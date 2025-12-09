import { CSSProperties, FC, ReactNode } from 'react';
export interface CellTextProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
}
export declare const CellText: FC<CellTextProps>;
