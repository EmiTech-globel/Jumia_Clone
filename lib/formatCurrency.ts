export function formatCurrency(
    amount: number,
    currencyCode: string = "NGN",
): string {
    try {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: currencyCode.toUpperCase(),
        }).format(amount);
    } catch (error) {
        // fallback formatting if currency code is invalid
        console.error("Invalid currency code:", currencyCode, error);
        return `${currencyCode.toUpperCase()} ${amount.toFixed(2)}`;
    }
}