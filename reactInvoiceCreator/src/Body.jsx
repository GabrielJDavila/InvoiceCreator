import { useState } from "react"

export default function Body() {
    const [total, setTotal] = useState(0)

    const [services, setServices] =useState([])

    console.log(services)

    function handleClick(e) {
        let price = JSON.parse(e.target.value)
        let serviceName = e.target.name
        setTotal(prevTotal => prevTotal += price)

        if(!services.includes(serviceName)) {
            setServices(prevServices => [...prevServices, serviceName])
        }
        
    }

    // const serviceItem =
    // <h1>{services[0]}</h1>
    return (
        <main>
            <div className="services-container">
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
            </div>

            <div className="rendered-items-container">
                {/* {serviceItem} */}
            </div>

             <button
                className="get-invoice"
             >
                Send Invoice
            </button>
        </main>
    )
}