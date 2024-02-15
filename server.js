const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, './')));

//routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './', 'index.html'));
});

app.get('/daily', (req, res) => {
    res.sendFile(path.join(__dirname, './', 'daily.html'));
});

app.post('/updateTotalDayExpenses', (req, res) => {
    const { NewTotalDayExpenses, entryId } = req.body;

    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading file');
        }

        let jsonData = JSON.parse(data);

        // Find the entry with the matching entryId
        let entry = jsonData.entries.find(entry => entry.id == entryId);

        if (entry) {
            let isUpdated = false;

            if (entry.TotalDayExpenses !== NewTotalDayExpenses) {
                entry.TotalDayExpenses = NewTotalDayExpenses;
                isUpdated = true;
            }

            if (entry.previousDayExpenses !== NewTotalDayExpenses) {
                entry.previousDayExpenses = NewTotalDayExpenses;
                isUpdated = true;
            }

            if (isUpdated) {
                let updatedJson = JSON.stringify(jsonData, null, 2);

                fs.writeFile('data.json', updatedJson, 'utf8', (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Error writing to file');
                    }

                    res.send('Updated expenses');
                });
            } else {
                res.send('Expenses not changed');
            }

        } else {
            res.status(404).send('Entry not found');
        }
    });
});



app.listen(3000, () => {
    console.log('Server listening on port 3000');
});