import { useState, useEffect } from "react"
import Item from "./Item"
import Total from "./Total"

export default function Body() {
    const [inputArr, setInputArr] = useState([])
    const [keyId, setKeyId] = useState(0)
    const [total, setTotal] = useState(0)
    const [formData, setFormData] = useState({
        service: "",
        price: ""
    })
    
    useEffect(() => {
        inputArr.map(item => {
            return (
                parseFloat(item.price)
            )
        })
    }, [total])

    function handleChange(e) {
        const {name, value} = e.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    const renderedItems = inputArr.map(item => {
        setKeyId(prevId => prevId + 1)
        return (
            <Item
                key={keyId}
                service={item.service}
                price={item.price} 
            />
        )
    })

    function handleClick(inputData) {
        const newObj = inputData
        setInputArr(prevInputArr => [newObj, ...prevInputArr])
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                service: "",
                price: "" 
            }
        })
        setTotal(prevTotal => prevTotal + parseFloat(formData.price))
    }

    return (
        <main>
            <div className="services-container">
                <input
                    type="text"
                    value={formData.service}
                    name="service"
                    onChange={handleChange}
                    className="input-task"
                    placeholder="Enter Service"
                />

                <select
                    id="price"
                    value={formData.price}
                    name="price"
                    onChange={handleChange}
                    className="select-menu"
                >
                    <option className="menu-item" value="">-- Choose Price --</option>
                    <option className="menu-item" value="10">$10</option>
                    <option className="menu-item" value="20">$20</option>
                    <option className="menu-item" value="30">$30</option>
                </select>

                <button
                    onClick={() => handleClick(formData)}
                    className="service-btn"
                >
                    <img src="./src/assets/plus.png"></img>
                </button>
            </div>

            <div className="rendered-items-container">
                 <div className="rendered-title-container">
                    <p>TASK</p>
                    <p>TOTAL</p>
                </div>
                {renderedItems}
            </div>
            
            <div className="rendered-total-container">
                <div className="rendered-total-title-container">
                    <p>NOTES</p>
                    <p>We accept cash, credit card, or PayPal</p>
                </div>
                <Total
                    totalAmnt={total}
                />
            </div>

             <button
                className="get-invoice"
             >
                Send Invoice
            </button>
        </main>
    )
}