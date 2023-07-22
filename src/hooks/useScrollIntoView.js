import { useEffect } from "react";

export function useScrollIntoView(elementStr, options) {

    useEffect(() => {
        function scroll() {
            const element = document.querySelector(elementStr);
            element.scrollIntoView({block: options.block, behavior: options.behavior});
        }
        scroll();
    }, [elementStr, options]);
}