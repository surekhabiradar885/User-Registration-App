const mongoose = require('mongoose');
const schema = mongoose.Schema;

//create contanct schema and model
const contactSchema = schema({
    name: { type: String, required: [true, 'Name field is required'],unique:true },
    email: { type: String,unique:true },
    phone_number: { type: String },
    contact_type: { type: String },
});

const Contact = mongoose.model('Contact', contactSchema);


module.exports = Contact;