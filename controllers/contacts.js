    const mongodb = require('../db/connect');
    const ObjectId = require('mongodb').ObjectId;

    // When a GET request is received, this function is executed and it prints to the browser all the contacts in the database.
    const getAll = async (req, res, next) => {
    // #swagger.tags = ['contacts']
    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
    };

    // When a GET request is received, this function expects an ID and prints to the web browser all the info of the ID
    const getSingle = async (req, res, next) => {
    // #swagger.tags = ['oneCotact']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDb()
        .db()
        .collection('contacts')
        .find({ _id: userId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
    };


    const createContact = async (req, res) => {
        // #swagger.tags = ['newContact']
        const newContact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };
        const response = await mongodb    
            .getDb()
            .db()
            .collection('contacts')
            .insertOne(newContact);
        if (response.acknowledged) {
            res.status(201).json(response);
            console.log('Info saved to DB succesfully');
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the contact.');
            console.log('Upload of info failed.');
        }
    };


    const updateContact = async (req, res) => {
        // #swagger.tags = ['updateContact']
        const userId = new ObjectId(req.params.id);
        const newInfo = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };
        const response = await mongodb    
            .getDb()
            .db()
            .collection('contacts')
            .replaceOne({ _id: userId }, newInfo);
        if (response.modifiedCount > 0) {
            res.status(204).json(response);
            console.log('Info saved to DB succesfully');
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the contact.');
            console.log('Upload of info failed.');
        }
    };


    const deleteContact = async (req, res) => {
        // #swagger.tags = ['deleteContact']
        const userId = new ObjectId(req.params.id);
        const response = await mongodb
            .getDb()
            .db()
            .collection('contacts')
            .deleteOne({ _id: userId }, true);
            console.log(response);
        if (response.deletedCount > 0) {
            res.status(200).send();
            console.log(userId + ' DELETED');
            } else {
            res.status(500).json(response.error || 'An error occurred while deleting the contact.');
            console.log('Unable to Delete');
            }
    };

    module.exports = { 
            getAll, 
            getSingle, 
            createContact,
            updateContact,
            deleteContact
        };