const express = require('express');
const data = require('./projectModel');
const router = express.Router();

router.get('/:id', idVal, async (req, res) => {
    const { id } = req.params;
    const response = await data.get(id);
    res.status(200).json(response);
});

router.post('/', postVal, async (req, res) => {
    const { name, description } = req.body;
    const insertion = await data.insert({ name, description });
    res.status(201).json(insertion);
});

router.delete('/:id', idVal, async (req,res) => {
    const { id } = req.params
    const processRemove = await data.remove(id);
    res.status(200).json(processRemove);
});

router.put('/:id', idVal, postVal, async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const processChange = await data.update(id, { name, description });
    res.status(200).json(processChange);
});

// MIDDLWARE

async function postVal (req, res, next){
    const { name, description } = req.body;
    switch(!name || !description){
        case true:
            res.status(400).json({error: 'Please put in a valid input'});
            default:
                next();
    };
};

async function idVal (req, res, next){
    const { id } = req.params;
    const idValidator = data.get(id);
    switch(idValidator===null){
        case true:
            res.status(404).json({error: 'Please enter a valid id'});
            default:
                next();
    }
}



module.exports = router;