const express = require('express')
const app = express();
const path = require('path');
const expHbs = require('express-handlebars');
const flash = require('connect-flash');
const { COOKIE_KEY } = require('./config/constants');
var cookieParser = require('cookie-parser');
var session = require('express-session');



let hbsConfig = {
  extname: 'hbs',
};

let hbs = expHbs.create(hbsConfig);



app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(''));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: COOKIE_KEY,
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

require('./config/routes')(app);
app.listen(5000, () => {
  console.log('Started')
});