import { DropZoneProps, FileTriggerProps } from 'react-aria-components';
import { InputUploadBaseProps } from '../inputUpload.types';
interface InputUploadContentProps extends Omit<InputUploadBaseProps, "ref"> {
    onSelect: FileTriggerProps["onSelect"];
    onDrop: DropZoneProps["onDrop"];
}
export declare const InputUploadContent: (props: InputUploadContentProps) => import("react/jsx-runtime").JSX.Element;
export {};
