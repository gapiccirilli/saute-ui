

function Item({item}) {
    const {ingredientName, description, amount, measurementType, hours, minutes, seconds} = item;

    return (
        <div>
            <span>{amount}</span>
            {measurementType !== "N/A" ? <span>{measurementType}</span> : null}
            <span>{ingredientName}</span>
            <span>{description}</span>
            {hours > 0 ? <span>{hours} hr</span> : null}
            {minutes > 0 ? <span>{minutes} min</span> : null}
            {seconds > 0 ? <span>{seconds} sec</span> : null}
        </div>
    );
}

export default Item;