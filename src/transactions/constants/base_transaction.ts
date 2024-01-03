import { getDateToYYYYMMDD } from "src/common/utils/dates";

export const BASE_TRANSACTION = {
    title: '',
    date: getDateToYYYYMMDD(new Date()),
    transactionMap: {}
}