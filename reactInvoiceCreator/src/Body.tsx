import { useState, useEffect, ChangeEvent } from "react"
import Item from "./Item"
import Total from "./Total"
import { FormState, Item as ItemType, RenderedInvoiceData } from "./types"

export default function Body() {

    const [inputArr, setInputArr] = useState<ItemType[]>([])
    const [total, setTotal] = useState(0)
    const [hide, setHide] = useState(false)
    const [printPage, setPrintPage] = useState(false)
    const [formData, setFormData] = useState<FormState>({
        service: "",
        price: "",
        hours: "",
        issuedName: "",
        issuedEmail: "",
        issuedAddress: "",
        issuedPhone: ""
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
    
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
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
            issuedName={item.issuedName}
            issuedEmail={item.issuedEmail}
            issuedAddress={item.issuedAddress}
            issuedPhone={item.issuedPhone}
            removeItem={() => removeItem(index)}
        />
    ));

    function handleClick(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const newObj: ItemType = {
            key: Date.now(),
            service: formData.service,
            hours: formData.hours,
            price: formData.price,
            issuedName: formData.issuedName,
            issuedEmail: formData.issuedEmail,
            issuedAddress: formData.issuedAddress,
            issuedPhone: formData.issuedPhone,
            removeItem: (index: number) => removeItem(index)
        }

        console.log(newObj)

        setInputArr(prevInputArr => [newObj, ...prevInputArr])
        
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                service: "",
                price: "",
                hours: "",
                issuedName: "",
                issuedEmail: "",
                issuedAddress: "",
                issuedPhone: ""
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
                    value={formData.issuedName}
                    name="issuedName"
                    onChange={handleChange}
                    className="input-task"
                    placeholder="payee name"
                />

                <input
                    type="text"
                    value={formData.issuedEmail}
                    name="issuedEmail"
                    onChange={handleChange}
                    className="input-task"
                    placeholder="payee email"
                />

                <input
                    type="text"
                    value={formData.issuedAddress}
                    name="issuedAddress"
                    onChange={handleChange}
                    className="input-task"
                    placeholder="payee address"
                />

                <input
                    type="text"
                    value={formData.issuedPhone}
                    name="issuedPhone"
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
                    <p>We accept cash, check, Zelle, Venmo, and CashApp</p>
                </div>
                <Total
                    total={total}
                />
            </div>

            {!hide && <button className="get-invoice" onClick={changeHide}>Finalize Invoice</button>}
            {hide && <button className="get-invoice" onClick={() => setPrintPage(!printPage)} style={hideStyles}>Print Invoice</button>}
        </main>
    )
}