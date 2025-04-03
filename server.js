const express = require('express');
const ideas = require('./dataset');
const port = 5000;

const app = express();
app.listen(port, () =>{
    console.log(`Server listening on port ${port}`);
});

app.get('/', (request, response) => {
    response.send({message: 'Welcome to the random ideas api'});
});

// get all ideas
app.get('/api/ideas', (request, response) => {
    response.send({success: true, data: ideas});
});


// get a single idea
app.get('/api/ideas/:id', (request, response) => {
    const id = Number.parseInt(request.params.id);
    const idea = ideas.filter(idea => idea.id === id);
    if(idea.length === 0){
        return response.status(404).json({success: false, error: "Resource not found"})
    }
    response.send({success: true, data: idea});
});