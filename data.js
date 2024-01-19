// General Total Expenses
const allowance = 1500;

let budget = allowance - 500;
let savings = allowance - budget;

let food = [];

let Splurge = [];
let others = [
    { name: 'spotifySubscription', value: 75 },
];

let schoolTranspo = [
    {name: 'Jeepney to Inter', value: 11},
    {name: 'Jeepney to School', value: 16},
];


// expenses.food.forEach(index => {
//     console.log(index);
// });

let totalTranspo = schoolTranspo.reduce((sum, expense) => sum + expense.value, 0);
let leftover = budget - totalTranspo;

console.log(`Allowance: ${allowance}`);
console.log(`Savings: ${savings}`);
console.log(`Budget: ${budget}`);
console.log(`Total Transportation: ${totalTranspo}`);
console.log(`left over money: ${leftover}`);

let currentDate = new Date();
let formattedDate = currentDate.toLocaleDateString();

console.log(`Date: ${formattedDate}`);  

document.getElementById('strbal').innerHTML = budget;



