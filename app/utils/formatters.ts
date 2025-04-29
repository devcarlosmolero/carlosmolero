function formatCurrency(amount: number | undefined): string {
    return amount !== undefined
        ? `€${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : '-'
}

const Formatters = {
    formatCurrency,
}

export default Formatters
