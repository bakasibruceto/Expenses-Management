function getJson(data, category) {
    return data.entries
        .flatMap(entry => entry.expenses)
        .filter(expense => expense.category === category)
        .map(expense => ({ name: expense.name, amount: expense.amount }));
}

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const allowance = data.general.Constant_Allowance;
        let budget = data.general.TotalBudget;
        let savings = data.general.TotalSavings;
        let totalExpenses = data.general.TotalExpenses;

        // Get a unique list of all categories
        let categories = [...new Set(data.entries.flatMap(entry => entry.expenses.map(expense => expense.category)))];
        // Initialize an empty object
        let categoryTotals = {};

        // For each category, get the expenses and calculate the total amount
        categories.forEach(category => {
            let expenses = getJson(data, category);
            let total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

            // Store the total in the object using the category as the key
            categoryTotals[category] = total;
        });

        // console.log(categoryTotals);

        //Add up all the totals
        totalExpenses = Object.values(categoryTotals).reduce((sum, value) => sum + value, 0);
        // console.log(`Total: ${totalExpenses}`);


        let rbal = budget - (totalExpenses);

        // console.log(`Allowance: ${allowance}`);
        // console.log(`Savings: ${savings}`);
        // console.log(`Budget: ${budget}`);
        //console.log(`Total Transportation: ${totalTranspo}`);
        // console.log(`left over money: ${leftover}`);

        let tableBody = document.getElementById('tableBody'); // Assuming 'tableBody' is the id of your table body

        data.entries.forEach(entry => {
            entry.expenses.forEach(expense => {
                let row = document.createElement('tr');
                let emptyCell = document.createElement('td');
                let checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                emptyCell.appendChild(checkbox);

                row.appendChild(emptyCell);

                let categoryCell = document.createElement('td');
                categoryCell.textContent = expense.category;
                row.appendChild(categoryCell);

                let nameCell = document.createElement('td');
                nameCell.textContent = expense.name;
                row.appendChild(nameCell);

                let amountCell = document.createElement('td');
                amountCell.textContent = expense.amount;
                row.appendChild(amountCell);

                tableBody.appendChild(row);
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











