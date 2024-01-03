export interface IGroup {
    id: string,
    name: string,
    color: string,
    image: string,
    users: string[],
    transactions: string[],
}

export interface IMinimalPayment {
    from: string,
    to: string,
    amount: string,
}