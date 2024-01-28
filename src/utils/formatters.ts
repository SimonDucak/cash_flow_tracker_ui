export const formatCurrency = (value: number, currency: string = 'EUR', format: string = "sk-SK") => {
    return new Intl.NumberFormat(format, { style: 'currency', currency: currency }).format(value);
}