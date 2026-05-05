
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

connectDB();

const app = express();
app.use(cors({
  origin: true,
  credentials: true
}));
//app.use(cors({
//  origin: 'http://localhost:3000',
//  credentials: true
//}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));

const PORT = process.env.PORT || 5000;

//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.listen(PORT, '0.0.0.0', () => 
  console.log(`Server running on port ${PORT}`)
);
