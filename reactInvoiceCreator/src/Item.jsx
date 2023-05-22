

export default function Item(props) {
    return (
        <div className="item-to-be-rendered">
            <p className="item-title">{props.service}</p>
            <button className="remove-btn" onClick={props.removeItem}>remove</button>
            <p className="item-price">${props.price}</p>
        </div>
    )
}