export const selectDeposits = state => {
    const transactions = state.transaction.walletTransactions.transactions || [];
    const { withdraw, ...restDeposits } = transactions;
    return restDeposits;
}