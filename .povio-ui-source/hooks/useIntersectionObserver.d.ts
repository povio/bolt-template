type UseIntersectionObserverProps = {
    onIntersection?: () => void;
} & IntersectionObserverInit;
export declare const useIntersectionObserver: ({ onIntersection, root, rootMargin, threshold, }: UseIntersectionObserverProps) => {
    setRef: import('react').Dispatch<import('react').SetStateAction<Element | null>>;
};
export {};
