const express = require('express');
const usersRouter = require('./routes/api');
const dotenv = require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');

const connectDatabase = require('./config/db'); // Correct function name

app.use(express.json());
app.use(bodyParser.json());


connectDatabase(); // Call the correct function here

const PORT = 3000;

app.use('/api', usersRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
