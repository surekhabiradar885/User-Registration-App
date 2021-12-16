const express = require('express');
const contactController = require('../controller/contactController');
const authController = require('../controller/authController');

const router = express.Router();

router.route('/')
    .get(authController.protect,contactController.getAllContacts)
    .post(authController.protect,contactController.createContact);

router.route('/:id')
    .patch(authController.protect,contactController.updateContact)
    .get(authController.protect,contactController.getContact)
    .delete(authController.protect,contactController.deleteContact);


/* router.get('/api/v1/contacts', (req, res) => {
    contact.find({}).then((data) => {
        res.send(data);
    }).catch(next);
   // res.send({ type: 'GET' });
});

router.get('/', (req, res) => {
    res.send('You can post the request');
}) */

/* router.post('contacts', (req, res) => {
    res.send({
        type: 'POST',
        name: req.body.name,        
    })
});
router.put('/contacts/:id', function(req, res){
    res.send({type: 'PUT'});
});
router.delete('/contacts/:id', function(req, res){
    res.send({type: 'DELETE'});
}); */

// add a new contact to database
router.post('/contacts',(req,res,next)=>{
    Contact.create(req.body).then((contact)=>{
        res.send(contact);
    }).catch(next);
});

// update a contact in the database
router.put('/contacts/:id',(req,res,next)=>{
    Contact.findOneAndUpdate({_id: req.params.id},req.body).then((contact)=>{
        Contact.findOne({_id: req.params.id}).then((contact)=>{
            res.send(contact);
        });
    });
});

// delete a contact in the database
router.delete('/contacts/:id',(req,res,next)=>{
    Contact.findOneAndDelete({ _id: req.params.id }).
        then((contact) => {
        res.send(contact);
    });
});
module.exports = router;