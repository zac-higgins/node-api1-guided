const express = require('express'); //CommonJS Modules
const db = require('./data/hubs-model.js'); // <<<<< 1: import the database file

const server = express();

server.use(express.json()); // needed to parse JSON from the body

server.get('/', (req, res) => {
    res.send({ api: 'up and running...' })
});

// List of Hubs GET /hubs <<< 2: implement endpoint
server.get('/hubs', (req, res) => {
    // get the list of hubs from the database
    db.find()
        .then(hubs => {
            res.status(200).json(hubs);
        })
        .catch(err => {
            console.log('error on GET /hubs', err);
            res.status(500).json({ errorMessage: 'error getting list of hubs from database' })
        });
});

// add a hub
server.post('/hubs', (req, res) => {
    // get the datat the client sent
    const hubData = req.body; // express doesn't know how to parse JSON

    //call the db
    db.add(hubData)
        .then(hub => {
            res.status(201).json(hub);
        })
        .catch(err => {
            console.log('error on POST /hubs', err);
            res.status(500).json({ errorMessage: 'error adding the hub' })
        });

})

// remove a hub by its id
server.delete('/hubs/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
        .then(removed => {
            if (removed) {
                //there was no hub with that id
                res.status(200).json({ message: 'hubs removed successfully' })
            } else {
                res.status(404).json({ message: 'hub not found' })
            }
        })
        .catch(err => {
            console.log('error on DELETE /hubs/:id', err);
            res.status(500).json({ errorMessage: 'error removing the hub' })
        });
})

// update a hub, passing the id and the changes
server.put('/hubs/:id', (req, res) => {
    const id = req.params.id;

    db.update(id)
        .then()
        .catch()
})

const port = 4000;
server.listen(port, () => {
    console.log(`\n ** API running on port ${port} ** \n`)
})