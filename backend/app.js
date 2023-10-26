const express = require('express');
const usersRouter = require('./routes/api');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors')



app.use(cookieParser());

const connectDatabase = require('./config/db'); // Correct function name

app.use(express.json());
app.use(bodyParser.json());


connectDatabase(); // Call the correct function here

const PORT = 3001;
app.use(cors({
  origin:"http://localhost:3000"
}))
app.use('/api', usersRouter);


app.listen(PORT , () => {
  console.log(`Server is running on port ${PORT}`);
});
