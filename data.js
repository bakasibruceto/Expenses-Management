fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const allowance = data.general.Constant_Allowance;
        let budget = data.general.TotalBudget;
        let savings = data.general.TotalSavings;
        let totalExpenses = data.general.TotalExpenses;

        // fetch data from json file where category is transportation
        let transportation = data.entries
            .flatMap(entry => entry.expenses)
            .filter(expense => expense.category === 'transportation')
            .map(expense => ({ name: expense.name, amount: expense.amount }));

        let totalTranspo = transportation.reduce((sum, transpo) => sum + transpo.amount, 0);
        let rbal = budget - totalTranspo;

        // console.log(`Allowance: ${allowance}`);
        // console.log(`Savings: ${savings}`);
        // console.log(`Budget: ${budget}`);
        console.log(`Total Transportation: ${totalTranspo}`);
        // console.log(`left over money: ${leftover}`);

        document.getElementById('strbal').innerHTML = budget;
        document.getElementById('tlex').innerHTML = totalTranspo;
        document.getElementById('rbal').innerHTML = rbal;
    })
    .catch(error => console.error('Error:', error));


    // let currentDate = new Date();
    // let formattedDate = currentDate.toLocaleDateString();

    // console.log(`Date: ${formattedDate}`);











