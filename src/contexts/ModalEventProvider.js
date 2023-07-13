import { createContext } from "react";

const ModalEventContext = createContext();

function ModalEventProvider({children, events}) {
    return (
        <ModalEventContext.Provider value={events}>
            {children}
        </ModalEventContext.Provider>
    );
}

export {ModalEventProvider, ModalEventContext};