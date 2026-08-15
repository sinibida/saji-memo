import { useCallback, useRef } from "react";

export default function useDebouncer<T extends unknown[]>(fn: (...args: T) => void, delay: number) {
    const timeoutRef = useRef<NodeJS.Timeout>(undefined);

    const call = useCallback((...args: T) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            fn(...args)
        }, delay)
    }, [fn, delay])
    
    const callImmediately = useCallback((...args: T) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        fn(...args)
    }, [fn])

    return { call, callImmediately }
}