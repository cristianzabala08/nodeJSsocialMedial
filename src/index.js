const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const router = require('./views');
const passport = require('passport');
const passportConfig = require('./passport/index');
const session = require('express-session');
passportConfig(passport);
dotenv.config();



app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors({
    origin: process.env.origin,
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(session({
  secret: 'keyboard cat',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session()); 



router(app);


const port = process.env.PORT || 3001 ;

app.listen(port, () => {
  console.log(`A NODE JS API is listenisn on port: ${port}`);
});