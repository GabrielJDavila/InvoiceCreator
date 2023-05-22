import { useState, useEffect } from "react"
import Item from "./Item"
import Total from "./Total"

export default function Body() {
    const [inputArr, setInputArr] = useState([])
    const [total, setTotal] = useState(0)
    const [formData, setFormData] = useState({
        service: "",
        price: ""
    })
    
    useEffect(() => {
        const totalPrice = inputArr.reduce((acc, item) => acc + parseFloat(item.price), 0);
        setTotal(totalPrice);
    }, [inputArr]);
      
    
    function handleChange(e) {
        const {name, value} = e.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    function removeItem(index) {
        const newArr = inputArr.filter((_, i) => i !== index)
        setInputArr(newArr) 
    }

    const renderedItems = inputArr.map((item, index) => (
        <Item
            key={index}
            service={item.service}
            price={item.price}
            removeItem={() => removeItem(index)}
        />
    ));
   
    function handleClick(inputData) {
        if(inputData.service.trim() === "" || inputData.price.trim() === "") {
            alert("please fill out the inputs")
            return;
        }
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
                    <option className="menu-item" value="30">$40</option>
                    <option className="menu-item" value="30">$50</option>
                    <option className="menu-item" value="30">$60</option>
                    <option className="menu-item" value="30">$70</option>
                    <option className="menu-item" value="30">$80</option>
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