import Card from "./Card";

function ShoppingListCard({ list }) {
    const { listName } = list;
    
    return (
        <Card>
            <p>{listName}</p>
        </Card>
    );
}

export default ShoppingListCard;