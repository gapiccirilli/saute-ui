import { useState } from "react";


export function useModal() {
    const [isOpen, setIsOpen] = useState(false);

    const handleAddIngredient = () => {
        setIsOpen(true);
    };

    const handleEditIngredient = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };
}