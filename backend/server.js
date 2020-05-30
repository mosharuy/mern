const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // cors middleware
app.use(express.json()); // allows json parsing

app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB database connection established successfully');
});

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`); // server listens port 5000
});
