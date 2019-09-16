const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000
const path = require('path');

app.use(express.static(path.join(__dirname)))

app.get('/', (req, res) => {
    res.send('./index.html')
})

app.listen(PORT, () => {
    console.log("Job Map server is running on port:", PORT)
})