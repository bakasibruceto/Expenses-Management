import './daily.js';
import { createTotalExpenseRow } from './frontend.js';

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        let totalExpensesPerId = data.entries.map(entry => ({
            id: entry.id,
            date: new Date(`${entry.year}-${entry.month}-${entry.date}`),
            day: entry.day,
            event: entry.event,
            totalExpenses: entry.TotalDayExpenses,
            expenses: entry.expenses // Assuming each entry has an expenses array
        }));

        let tableBody = document.getElementById('tableSummaryBody');

        // Loop through each entry and add a row to the table for each expense
        totalExpensesPerId.forEach(TotalExpesesPerDay => {
            let row = createTotalExpenseRow(TotalExpesesPerDay);
            tableBody.appendChild(row);
        });

        console.log(totalExpensesPerId);
    })
    .catch(error => console.error('Error:', error));
