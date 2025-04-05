const express = require('express');
const IdeaModel = require('../models/Idea');

// Define the router
const router = express.Router();

// get all ideas
router.get('/', async (request, response) => {
    try{
        const data = await IdeaModel.find();
        response.json({success: true, result: data});
    }catch(error){
        response.status(500).json({success: false, error: 'Something went wrong'});
    }
});


// get a single idea
router.get('/:id', async (request, response) => {
    const id = request.params.id;
    try{
        const idea = await IdeaModel.findById(id);
        response.json({success: true, result: idea});
    }catch(error){
        response.status(404).json({success: false, error: "Resource not found"});
    }
});


// Add an idea
router.post('/', async (request, response) => {
    const idea = new IdeaModel({
        text: request.body.text,
        tag: request.body.tag,
        username: request.body.username,
    });

    try{
        const savedIdea = await idea.save();
        response.json({success: true, result: savedIdea});
    }catch(error){
        response.status(500).json({success: false, error: 'Something went wrong'})
    }
});


// Update an idea
router.put('/:id', async (request, response) => {
    const id = request.params.id;
    try{
        const updatedIdea = await IdeaModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    text: request.body.text,
                    tag: request.body.tag
                }
            },
            { new: true}
        );
        response.send({success: true, result: updatedIdea});
    }catch(error){
        response.status(500).json({success: false, error: 'Something went wrong'});
    }
});


// Delete an idea
router.delete('/:id', async (request, response) => {
    const id = request.params.id;
    try{
        await IdeaModel.findByIdAndDelete(id);
        response.json({success: true, result: {}})
    }catch(error){
        response.status(500).json({success: false, error: "Something went wrong"});
    }
});

module.exports = router;