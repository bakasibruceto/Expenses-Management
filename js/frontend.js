export function createCategoryElements(category) {
    let categoryRow = document.createElement('tr');
    let categoryCell = document.createElement('td');
    categoryCell.textContent = category;
    categoryCell.className = 'font-bold';

    categoryRow.appendChild(categoryCell);

    return { categoryRow, categoryCell };
}