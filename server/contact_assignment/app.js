const express = require('express');
var cors = require('cors');
const contactRouter = require('./routes/contactRoutes');
const userRouter = require('./routes/userRoutes');


// set up our express app
const app = express();

app.use(express.static('public'));

app.use(express.json());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
     res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})
// 3) ROUTES
app.use('/api/v1/contacts', contactRouter);
app.use('/api/v1/', userRouter);
const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors());


module.exports = app;
