import { useRef, useEffect } from "react";
export const usePrevPropValue = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}
