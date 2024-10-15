import { useState, useEffect } from "react"
import Item from "./Item"
import Total from "./Total"
import { FormState } from "./types"

export default function Body() {

    const [inputArr, setInputArr] = useState([])
    const [total, setTotal] = useState(0)
    const [hide, setHide] = useState(false)
    const [printPage, setPrintPage] = useState(false)
    const [formData, setFormData] = useState<FormState>({
        service: "",
        price: 0,
        hours: 0,
        issuedToName: "",
        issuedToEmail: "",
        issuedToAddress: "",
        issuedToPhone: ""
    })
    
    useEffect(() => {
        const totalPrice = inputArr.reduce((acc, item) => acc + parseFloat(item.price), 0);
        setTotal(totalPrice);
    }, [inputArr]);

    useEffect(() => {
        if(printPage) {
            const timemout = setTimeout(() => {
                window.print()
            }, 1000)

            return () => {
                clearTimeout(timemout)
            }
        }
        setPrintPage(false)
    }, [printPage])
    
    function handleChange(e) {
        const {name, value} = e.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    function removeItem(index: number) {
        const newArr = inputArr.filter((_, i) => i !== index)
        setInputArr(newArr) 
    }

    const renderedItems = inputArr.map((item, index) => (
        <Item
            key={index}
            service={item.service}
            hours={item.hours}
            price={item.price}
            issuedName={item.issuedToName}
            issuedEmail={item.issuedToEmail}
            issuedAddress={item.issuedToAddress}
            issuedPhone={item.issuedToPhone}
            removeItem={() => removeItem(index)}
        />
    ));
   
    function handleClick(e) {
        e.preventDefault()
        const newObj = formData
        setInputArr(prevInputArr => [newObj, ...prevInputArr])
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                service: "",
                price: "",
                hours: "",
                issuedToName: "",
                issuedToEmail: "",
                issuedToAddress: "",
                issuedToPhone: ""
            }
        })
        setTotal(prevTotal => prevTotal + parseFloat(formData.price))
    }

    function changeHide() {
        setHide(prev => !prev)
    }

    const hideStyles = {
        display: printPage ? "none" : ""
    }

    return (
        <main>
            {!hide &&
            <form onSubmit={handleClick} className="services-container">

                <input
                    type="text"
                    value={formData.service}
                    name="service"
                    onChange={handleChange}
                    className="input-task"
                    placeholder="enter service"
                    required
                />

                <input
                    id="price"
                    type="text"
                    value={formData.price}
                    name="price"
                    onChange={handleChange}
                    className="select-menu"
                    placeholder="price"
                    required
                />

                <input
                    type="text"
                    value={formData.hours}
                    name="hours"
                    onChange={handleChange}
                    className="input-task"
                    placeholder="hours"
                    required
                />
                
                <input
                    type="text"
                    value={formData.issuedToName}
                    name="issuedToName"
                    onChange={handleChange}
                    className="input-task"
                    placeholder="payee name"
                />

                <input
                    type="text"
                    value={formData.issuedToEmail}
                    name="issuedToEmail"
                    onChange={handleChange}
                    className="input-task"
                    placeholder="payee email"
                />

                <input
                    type="text"
                    value={formData.issuedToAddress}
                    name="issuedToAddress"
                    onChange={handleChange}
                    className="input-task"
                    placeholder="payee address"
                />

                <input
                    type="text"
                    value={formData.issuedToPhone}
                    name="issuedToPhone"
                    onChange={handleChange}
                    className="input-task"
                    placeholder="payee phone"
                />

                <button className="service-btn">
                    Add to invoice
                </button>
            </form>}

            <div className="rendered-items-container">
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

            {!hide && <button className="get-invoice" onClick={changeHide}>Finalize Invoice</button>}
            {hide && <button className="get-invoice" onClick={() => setPrintPage(!printPage)} style={hideStyles}>Print Invoice</button>}
        </main>
    )
}