const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Frontend Running Version 1 updated');
});

app.listen(3000, () => {
    console.log('Frontend running on port 3000');
});