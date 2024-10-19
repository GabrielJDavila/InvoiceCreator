import { TotalAmount } from "./types"

export default function Total(props: TotalAmount) {
    return (
        <div className="totals-container">
            <p>TOTAL AMOUNT</p>
            <h2>${props.total}</h2>
        </div>
    )
}