const express = require('express');
const app = express();
const PORT = 3000;

app.use('/angular', express.static(__dirname + '/node_modules/angular/'));
app.use('/css', express.static(__dirname + '/style/'));
app.use('/public', express.static(__dirname + '/public/'));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
  console.log('Server is running on port %s.', PORT);
});
