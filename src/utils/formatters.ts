export const formatCurrency = (value: number, currency: string = 'EUR', format: string = "sk-SK") => {
    return new Intl.NumberFormat(format, { style: 'currency', currency: currency }).format(value);
}

export const formatDate = (date: Date, format: string = "sk-SK"): string => {
    return new Intl.DateTimeFormat(format).format(date);
}