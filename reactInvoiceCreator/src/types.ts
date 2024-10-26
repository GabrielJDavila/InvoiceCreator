export type FormState = {
    service: string,
    price: string,
    hours: string,
    issuedName: string,
    issuedEmail: string,
    issuedAddress: string,
    issuedPhone: string,
    hide: boolean
}

export type TotalAmount = {
    total: number
}

export type Item = {
    key: number,
    service: string,
    hours: string,
    price: string,
    issuedName: string,
    issuedEmail: string,
    issuedAddress: string,
    issuedPhone: string,
    hide: boolean,
    removeItem: (index: number) => void
}

export type RenderedInvoiceData = {
    service: "",
    price: "",
    hours: "",
    issuedName: "",
    issuedEmail: "",
    issuedAddress: "",
    issuedPhone: ""
}