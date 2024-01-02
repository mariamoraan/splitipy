export const LocalDB = {
    delete: (key: string) => {
        localStorage.removeItem(key)
    },
    create: (key: string, item: any) => {
        localStorage.setItem(key, JSON.stringify(item))
    },
    get: (key: string):string => localStorage.getItem(key)
}

