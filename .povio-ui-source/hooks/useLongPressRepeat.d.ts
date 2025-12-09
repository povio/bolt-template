export declare const useLongPressRepeat: ({ onPress, enabled, interval, timeout, }: {
    onPress: (long?: boolean) => void;
    enabled?: boolean;
    interval?: number;
    timeout?: number;
}) => {
    onPressStart: () => void;
    onPressEnd: () => void;
};
