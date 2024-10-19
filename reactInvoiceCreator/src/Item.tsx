import { Item } from "./types"

export default function Item(props: Item) {
    return (
        <div className="rendered-invoice-container">
            <h2 className="invoice-business-name">M&G Clean Pros LLC</h2>
            <div className="parties-container">
                <div className="issued-container">
                    <p>ISSUED TO:</p>
                    <p>{props.issuedName}</p>
                    <p>{props.issuedEmail}</p>
                    <p>{props.issuedAddress}</p>
                    <p>{props.issuedPhone}</p>
                </div>
                <div className="payable-container">
                    <p>PAYABLE TO:</p>
                    <p>M&G Clean Pros LLC</p>
                    <p>mgcleanpros@gmail.com</p>
                    <p>83 S Lasalle St, Apt 1</p>
                    <p>(630)642-3773</p>
                </div>
            </div>
            <div className="middle-invoice-container">
                <p>SERVICE</p>
                <p>HRS</p>
                <p>PRICE</p>
            </div>

            <div className="item-to-be-rendered">
                <p className="item-title">{props.service}</p>
                <button className="remove-btn" onClick={() => props.removeItem(props.key)}>remove</button>
                <p className="item-hrs">{props.hours}</p>
                <p className="item-price">${props.price}</p>
            </div>

            {/* <div className="invoice-total-container">
                <p>TOTAL</p>
                <p>${props.price}</p>
            </div> */}

        </div>
    )
}