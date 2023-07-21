import { useEffect } from "react";

export function useScrollIntoView(elementStr, position, behave) {

    useEffect(() => {
        function scroll() {
            const element = document.querySelector(elementStr);
            element.scrollIntoView({block: position, behavior: behave});
        }
        scroll();
    }, [elementStr, position]);
}