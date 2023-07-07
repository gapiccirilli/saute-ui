import Card from "./Card";

function AddNewCard({ children }) {
    
    return (
        <Card>
            <div>+</div>
            <p>Add New {children}</p>
        </Card>
    );
}

export default AddNewCard;