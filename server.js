require('dotenv').config();
const app = require('./src/app.js');

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log('Starting server with port', PORT);
});
