const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

// set up our express app

dotenv.config({ path: './config.env' })

const port = process.env.PORT || 3000;
//const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)

// connect to mongodb
const DB=process.env.DATABASE_LOCAL;
mongoose.connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(con => {
    console.log(con.connections);
    console.log('DB connection successful!');
}).catch(err => {
    console.log('Error while connecting ', err);
});


const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
} )

/* const testContact = new Contact({
    name: 'surekha',
    email: 'surekha@gmail.com',
    phone_number: '9666655500'
});
testContact.save().then(doc => {
    console.log(' doc ', doc)
}).catch(err => {
    console.log('Error ', err);
}); */
// listen for requests
 app.listen(port, () =>
{ console.log('App listening for requests on port: ',port) }); 


//module.exports = router;