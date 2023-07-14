import { createContext } from "react";

const ModalEventContext = createContext();

function ModalEventProvider({children, values}) {
    return (
        <ModalEventContext.Provider value={values}>
            {children}
        </ModalEventContext.Provider>
    );
}

export {ModalEventProvider, ModalEventContext};