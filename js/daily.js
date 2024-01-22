import { getCategory } from './methods.js';
import { createCategoryElements, createExpenseRow } from './frontend.js';


fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const allowance = data.general.Constant_Allowance;
        let budget = data.general.TotalBudget;
        let previousTotalExpenses = data.entries.previousDayExpenses;

        let entryId = 1;
        let entry = data.entries.find(entry => entry.id === entryId);

        if (data && data.entries) {
            let matchingEntries = data.entries.filter(entry => entry.id == entryId);

            // Get a unique list of all categories from the specified entry
            let categories = [...new Set(entry.expenses.map(expense => expense.category))];

            let categoryTotals = {};

            // Calculate the total amount of each category expenses with entryId
            if (entry) {
                categories.forEach(category => {
                    let expenses = entry.expenses.filter(expense => expense.category === category);
                    let total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

                    // Store the total in the object using the category as the key
                    categoryTotals[category] = total;
                });
                //Add up all the totals
                let newTotalExpenses = Object.values(categoryTotals).reduce((sum, value) => sum + value, 0);

                //Calculate the remaining balance
                let rbal = budget - newTotalExpenses;

                let tableBody = document.getElementById('tableBody');

                // Loop through each entry and add a row to the table for each expense
                categories.forEach(category => {
                    // Create a table row for each category
                    let { categoryRow } = createCategoryElements(category);
                    tableBody.appendChild(categoryRow);

                    // Append the corresponding expenses to the category row
                    matchingEntries.forEach(entry => {
                        entry.expenses.forEach(expense => {
                            if (expense.category === category) {
                                let row = createExpenseRow(expense);
                                tableBody.appendChild(row);
                                document.getElementById('strbal').innerHTML = budget;
                                document.getElementById('tlex').innerHTML = `-${newTotalExpenses}`;
                                document.getElementById('rbal').innerHTML = rbal;
                                // document.getElementById('exp').innerHTML = totalExpenses;

                            }
                        });
                    });
                });


            }



            // update json
            if (newTotalExpenses !== previousTotalExpenses) {
                fetch('/updateTotalDayExpenses', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ NewTotalDayExpenses: newTotalExpenses, entryId: entryId }),
                })
                    .then(response => response.text())
                    .then(data => console.log(data))
                    .catch((error) => console.error('Error:', error));

            }
        }
    })
    .catch(error => console.error('Error:', error));


















