const express = require('express');
const app = express();

app.get('/', (req, res) => {
  console.log('Server is running.');
  res.send('working');
});

app.listen(3000);
