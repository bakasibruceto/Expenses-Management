const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.json()); // for parsing application/json

app.use(express.static(path.join(__dirname, './')));

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
            // Only update TotalDayExpenses if the new value is different
            if (entry.TotalDayExpenses !== NewTotalDayExpenses) {
                entry.TotalDayExpenses = NewTotalDayExpenses;

                let updatedJson = JSON.stringify(jsonData, null, 2);

                fs.writeFile('data.json', updatedJson, 'utf8', (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Error writing to file');
                    }

                    res.send('updated TotalDayExpenses');
                });
            } else {
                res.send('TotalDayExpenses not changed');
            }
        } else {
            res.status(404).send('Entry not found');
        }
    });
});



app.listen(3000, () => {
    console.log('Server listening on port 3000');
});