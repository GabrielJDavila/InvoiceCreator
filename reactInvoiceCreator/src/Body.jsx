import { useState, useEffect } from "react"
import Item from "./Item"

export default function Body() {
    const [total, setTotal] = useState(0)
    const [cart, setCart] = useState([])
    const [formData, setFormData] = useState(
        {
            service: "",
            price: ""
        }
    )
    const [storageData, setStorageData] = useState(
        () => JSON.parse(localStorage.getItem("formInput")) || []
    )
    
    useEffect(() => {
        localStorage.setItem("formInput", JSON.stringify(formData))
    }, [formData])

    function handleChange(e) {
        const {name, value} = e.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    function handleClick(e) {
        e.preventDefault()
        console.log(storageData)
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
                    onClick={handleClick}
                    className="service-btn"
                >
                    <img src="./src/assets/plus.png"></img>
                </button>
            </div>

            <div className="rendered-items-container">
                 <div className="rendered-title-container">
                    <p>Task</p>
                    <p>Total</p>
                </div>
                {formData.isShown ?
                    <Item
                        service={formData.service}
                        price={formData.price}
                    /> :
                    ""
                }  
            </div>

             <button
                className="get-invoice"
             >
                Send Invoice
            </button>
        </main>
    )
}