import { useState, useEffect } from "react"
import Item from "./Item"

export default function Body() {
    const [formData, setFormData] = useState({
        service: "",
        price: ""
    })
    const [inputArr, setInputArr] = useState([])
    const [total, setTotal] = useState("")

    const renderedTotal = inputArr.map(item => {
        let totalPrice = item.price
        setTotal(prevTotal => prevTotal += totalPrice)
    })

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
        let counterId
        for(let i = 0; inputArr.length > i; i++) {
            counterId = i
        }
        return (
            <Item
                key={counterId}
                service={item.service}
                price={item.price} 
            />
        )
    })

    console.log(inputArr)
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
                {total}
            </div>

             <button
                className="get-invoice"
             >
                Send Invoice
            </button>
        </main>
    )
}