// Import the required modules
const http = require('http');
const express = require('express');
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser');
// const sequelize = require('./conections/database')
const sequelize = require('./conections/database')
const errorcontroller = require('./controllers/404')
const todoListForm = require('./routes/todoList');

// Create an express app
const app = express();

app.use(cors());
// app.use(express.json())

// Set the view engine and the views folder
app.set('view engine', 'ejs');
app.set('views', 'views');

// Use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Use the userform router for form-related routes
app.use(todoListForm)

// Use the errorcontroller for handling 404 errors
app.use(errorcontroller.get404);

// Connect to the database using sequelize
sequelize
    // .sync({ force: true}) // Uncomment this line to drop and recreate the tables
    .sync() // Sync the models with the database
    .then(result => console.log('sequelize DataBase connected....')) // Log a success message
    .catch(err => console.log(err)) // Log an error message

// Start the server on port 4000
app.listen(4000);
