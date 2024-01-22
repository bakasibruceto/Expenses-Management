import { createCell, formattedCurrency, formattedDate } from "./methods.js";

//table row for each category
export function createCategoryElements(category) {
    let categoryRow = document.createElement('tr');
    let categoryCell = document.createElement('td');
    categoryCell.textContent = category;
    categoryCell.className = 'font-bold';

    categoryRow.appendChild(categoryCell);

    return { categoryRow, categoryCell };
}

//table row for each expense
export function createExpenseRow(expense) {
    let row = document.createElement('tr');
    createCell(row, expense.name, 'text-left ');
    createCell(row, expense.amount, 'text-right pl-5 pr-5');
    // createButtonCell(row, "edit", "additional-classes");
    return row;
}

//index table
export function createTotalExpenseRow(entry) {
    let row = document.createElement('tr');
    row.id = `${entry.id}`;
    createCell(row, formattedDate(entry.date), 'text-left ');
    createCell(row, entry.day, 'text-left ');
    createCell(row, entry.event, 'text-left ');
    createCell(row, formattedCurrency(entry.totalExpenses), 'text-left ');
    return row;
}

