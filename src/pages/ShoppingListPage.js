import ShoppingListCard from "../components/Cards/ShoppingListCard";


function ShoppingListPage() {

    const shoppingLists = [
        {
            id: 1,
            listName: "Wegmens List"
        },
        {
            id: 2,
            listName: "Giant Eagle List"
        },
        {
            id: 3,
            listName: "Whole Foods List"
        }
    ];

    return (
        <div>
            {shoppingLists.map((list) => <ShoppingListCard list={list} key={list.id} />)}
        </div>
    );
}

export default ShoppingListPage;