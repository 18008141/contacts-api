var express = require('express');
const contact = require('../models/contact');
var router = express.Router();
const Contact = require('../models/contact');
const cors = require('cors');
router.use(cors())

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Create Contacts
router.post('/contact/add', async (req, res, next) => {
	const contactData = new Contact({
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
	});

	try {
		const newContact = await contactData.save();
		res.status(201).json(newContact);
	} catch(error) {
		res.status(400).json({message: error.message});
	}
});

// Create Contacts
router.get('/contact/all', async (req, res, next) => {
	try {
		const contactsAll = await Contact.find();
		res.status(200).json(contactsAll);
	} catch (error) {
		res.status(500).json({message: error.message});
	}
});

// Update Contact
router.patch('/contact/update/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		const updatedData = req.body;
		console.log(updatedData);
		const options = {new: true};
		let contact = await Contact.findByIdAndUpdate(id, updatedData, options);
		res.status(200).json(contact);
	} catch (error) {
		res.status(400).json({message: error.message});
	}
});

// Delete Contact
router.delete('/contact/delete/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		const deletedContact = await Contact.findByIdAndDelete(id);
		res.status(204).json(deletedContact);
	} catch (error) {
		res.status(400).json({message: error.message});
	}
});

module.exports = router;
