import { KeyboardEvent, SyntheticEvent } from 'react';
export declare namespace DomUtils {
    const isKeyboardInput: (elem: Element) => boolean;
    const isKeyboardEvent: (event: SyntheticEvent) => event is KeyboardEvent;
}
