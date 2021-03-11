const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const members = require('./Members')
const app = express();

// init middleware
// app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Homepage route (shows because above static)
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}));

// Set static folder
app.use(express.static(path.join(__dirname,'public')));

// Members API routes
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//Look at passport.js for authentication 