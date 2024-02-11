const express = require('express')

const router = express.Router();

const  {getContacts,createContacts,getContact,updateContact,deleteContact} = require("../controllers/contactController")

router.route('/').get(getContacts)

router.route('/').post(createContacts)

router.route('/:id').get(getContact).put(updateContact).delete(deleteContact)

// router.route('/:id').put(updateContact)

// router.route('/:id').delete(deleteteContact)

module.exports = router;