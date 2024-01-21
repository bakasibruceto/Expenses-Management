export function getCategory(data, category) {
    return data.entries
        .flatMap(entry => entry.expenses)
        .filter(expense => expense.category === category)
        .map(expense => ({ name: expense.name, amount: expense.amount }));
}