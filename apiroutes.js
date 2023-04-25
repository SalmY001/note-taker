const router = require('express').Router()
const data = require('./db.json')
const fs = require('fs')
const util = require('util')
const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

// Get route for api notes
router.get('/notes', async function(req, res){
    const notes = await readFileAsync('db.json', 'UTF-8')
    console.log("testing")
    res.json(JSON.parse(notes))

});

// Post route for api notes
router.post('/notes', async function(req, res){
    const notes = await readFileAsync('db.json', 'UTF-8')
    notes.push(req.body)
    /*notes.push(notes)*/
    writeFileAsync('db.json', notes, 'UTF-8')
    res.json(JSON.parse(notes))
    console.log('New note added: '+notes.title);
});

// Get note including an ID
router.get('/notes/:id', async function(req, res){
    console.log("testing1")
    res.json(JSON.parse(notes[req.params.id]));
});

// Delete note including an ID
router.delete('/notes/:id', async function(req, res){
    notes.splice(req.params.id, 1);
    refreshDb;
    console.log("Deleted note: "+req.params.id);
});


// Updates the json file whenever a note is added or deleted
function refreshDb() {
    writeFileAsync('/db.json',JSON.stringify(notes, '\t'), err => {
        if (err) throw err;
        return true;
    });

}

module.exports = router;