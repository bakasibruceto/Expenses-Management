export function getCategory(data, category) {
    return data.entries
        .flatMap(entry => entry.expenses)
        .filter(expense => expense.category === category)
        .map(expense => ({ name: expense.name, amount: expense.amount }));
}

export function getId(data, entryId) {
    return data.entries
        .flatMap(entry => entry.id)
        .map(expense => ({ id: expense.id }));
}

export function createCell(row, textContent, className) {
    let cell = document.createElement('td');
    cell.textContent = textContent;
    if (className) {
        cell.className = className;
    }
    row.appendChild(cell);
}

export function createButtonCell(row, textContent, className) {
    let cell = document.createElement('td');
    let button = document.createElement('button');
    button.textContent = textContent;
    button.className = 'px-4  bg-blue-500 text-white rounded ' + className;
    cell.appendChild(button);
    row.appendChild(cell);
}

export function formattedDate(date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })
}

export function formattedCurrency(amount) {
    return amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'PHP'
    })
}