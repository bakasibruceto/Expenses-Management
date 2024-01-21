export function getCategory(data, category) {
    return data.entries
        .flatMap(entry => entry.expenses)
        .filter(expense => expense.category === category)
        .map(expense => ({ name: expense.name, amount: expense.amount }));
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