import { useCallback, useRef } from "react";

export default function useDebouncer<T extends any[]>(fn: (...args: T) => void, delay: number) {
    const timeoutRef = useRef<number>(undefined);

    const call = useCallback((...args: T) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            fn(...args)
        }, delay)
    }, [fn, delay])

    return { call }
}