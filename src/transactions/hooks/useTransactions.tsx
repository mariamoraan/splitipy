import { useEffect, useMemo, useState } from "react";
import { ITransaction } from "../interfaces/transaction";
import { compareTransactions, getTransactionById } from "../services/transactions";

export const useTransactions = (transactionsIds: string[]) => {
    const [transactions, setTransactions] = useState<ITransaction[]>([])

    useEffect(() => {
        setTransactions(transactionsIds.map(id => getTransactionById(id)))
    }, [transactionsIds])

    const orderedTransactions = useMemo(() => {
        const orderedTransactions = transactions?.sort(compareTransactions)
        return orderedTransactions
    }, [transactions])

    return {orderedTransactions}
}