const path = require('path');
const express = require('express');
const ejs = require('ejs')

const routes = require('./controllers');
// const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions
// const sess = {
//   secret: 'Super secret secret',
//   resave: false,
//   saveUninitialized: true,
// };

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);
 
// sequelize.sync({ force: false }).then(() => {
app.listen(PORT, () => console.log('Now listening'));
// });
