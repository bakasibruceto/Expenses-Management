import { getCategory } from './methods.js';
import { createCategoryElements } from './frontend.js';

fetch('json/data.json')
    .then(response => response.json())
    .then(data => {
        const allowance = data.general.Constant_Allowance;
        let budget = data.general.TotalBudget;
        let savings = data.general.TotalSavings;
        let totalExpenses = data.general.TotalExpenses;

        // Get a unique list of all categories
        let categories = [...new Set(data.entries
            .flatMap(entry => entry.expenses.map(expense => expense.category)))];

        let categoryTotals = {};

        // Calculate the total amount of each category expenses
        categories.forEach(category => {
            let expenses = getCategory(data, category);
            let total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

            // Store the total in the object using the category as the key
            categoryTotals[category] = total;
        });

        //Add up all the totals
        totalExpenses = Object.values(categoryTotals).reduce((sum, value) => sum + value, 0);

        //Calculate the remaining balance
        let rbal = budget - (totalExpenses);

        let tableBody = document.getElementById('tableBody');

        // Loop through each entry and add a row to the table for each expense
        categories.forEach(category => {
            // Create a table row for each category
            let { categoryRow } = createCategoryElements(category);
            tableBody.appendChild(categoryRow);

            // Append the corresponding expenses to the category row
            data.entries.forEach(entry => {
                entry.expenses.forEach(expense => {
                    if (expense.category === category) {
                        let row = document.createElement('tr');

                        let nameCell = document.createElement('td');
                        nameCell.textContent = expense.name;
                        row.appendChild(nameCell);

                        let amountCell = document.createElement('td');
                        amountCell.textContent = expense.amount;
                        row.appendChild(amountCell);

                        tableBody.appendChild(row);
                    }
                });
            });
        });

        document.getElementById('strbal').innerHTML = budget;
        document.getElementById('tlex').innerHTML = `-${totalExpenses}`;
        document.getElementById('rbal').innerHTML = rbal;
    })
    .catch(error => console.error('Error:', error));


// let currentDate = new Date();
// let formattedDate = currentDate.toLocaleDateString();

// console.log(`Date: ${formattedDate}`);











