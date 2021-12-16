const Contact = require('../models/contactModel');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../utils/catchAsyncErrors');

exports.getAllContacts = catchAsyncErrors(async (req, res,next) => {
  const contacts = await Contact.find();
    if (!contacts) {
    return next(new ErrorHandler('No contacts found', 404));
  }
  res.status(200).json({
    status: 'success',
    results: contacts.length,
    data: {
      contacts
    }
  });
   
});
exports.getContact = async (req, res) => {
  try {
  const contact = await Contact.findById(req.params.id);
  res.status(200).json({
    status: 'success',   
    data: {
      contact
    }
  });
  } catch (err) {
    res.status(400).json({
      status: 'ERROR',
      message:err
      })
  }  
};

exports.createContact = async(req, res) => {
  try {
    //const newContact = new Contact({});
    //newContact.save();
    const newContact = await Contact.create(req.body);
     res.status(201).json({
    status: 'success',
    data:newContact
  });
  }catch(err) {
    res.status(404).json({
      status: 'ERROR',
      message:err
      })
  }   
};
exports.updateContact = async (req, res) => {
  try {

    const contact = await Contact.findByIdAndUpdate(req.params.id,
      req.body, {new: true});
    res.status(200).json({
    status: 'success',
      data: {
     contact
   }
  });
    
  } catch(err) {
    res.status(404).json({
      status: 'ERROR',
      message:err
      })
  }  
  
};
exports.deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
     res.status(204).json({
    status: 'success',
   data:null
  });
  }catch(err) {
    res.status(404).json({
      status: 'ERROR',
      message:err
      })
  }  
 
};