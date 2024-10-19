export type FormState = {
    service: string,
    price: number,
    hours: number,
    issuedToName: string,
    issuedToEmail: string,
    issuedToAddress: string,
    issuedToPhone: string
}

export type TotalAmount = {
    total: number
}

export type Item = {
    key: number,
    service: string,
    hours: number,
    price: number,
    issuedName: string,
    issuedEmail: string,
    issuedAddress: string,
    issuedPhone: string,
    removeItem: (index: number) => void
}