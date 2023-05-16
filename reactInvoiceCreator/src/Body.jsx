import { useState } from "react"
import Item from "./Item"

export default function Body() {
    const [total, setTotal] = useState(0)
    const [formData, setFormData] = useState(
        {
            service: "",
            price: ""
        }
    )

    function handleChange(e) {
        const {name, value} = e.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    function handleClick() {
        console.log(formData)
        const {name, value} = e.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }
    // console.log(services)

    // function handleClick(e) {
    //     let price = JSON.parse(e.target.value)
    //     let serviceName = e.target.name
    //     setTotal(prevTotal => prevTotal += price)

    //     if(!services.includes(serviceName)) {
    //         setServices(prevServices => [...prevServices, serviceName])
    //     }
        
    // }

    // const serviceItem =
    // <h1>{services[0]}</h1>
    return (
        <main>
            {/* <div className="services-container">
                <button
                    className="service"
                    value="100"
                    name="deep clean"
                    onClick={handleClick}
                >
                    Deep Clean: $100
                </button>
                <button
                    className="service"
                    value="75"
                    name="maintaince clean"
                    onClick={handleClick}
                >
                    Maintaince Clean: $75
                </button>
                <button
                    className="service"
                    value="125"
                    name="carpet clean"
                    onClick={handleClick}
                >
                    Carpet Cleaning: $125
                </button>
            </div> */}

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
                <Item
                    service={formData.service}
                    price={formData.price}
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