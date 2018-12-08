// Importing the required modules
const restify = require('restify'); // Restify module
const mongoose = require('mongoose'); // MongoDB mongoose
const config = require('./config'); // config.js file

// Creating the server
const server = restify.createServer();

// Middleware
server.use(restify.plugins.bodyParser());

// Firing up the server
server.listen(config.PORT, () => {
    mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });
});

// Initialize Db
const db = mongoose.connection;

// On db error
db.on('error', (err) => console.log(err));

// Routing
db.once('open', () => {
    require('./routes/customers')(server);
    console.log(`Server started on port: ${config.PORT} `);
})