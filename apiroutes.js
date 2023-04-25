const router = require('express').Router()
const fs = require('fs')
const util = require('util')
const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

const uuid = require('uuid');
//const {uuidv4} = require('uuid');

// Get route for api notes
router.get('/notes', async function(req, res){
    const notes = await readFileAsync('db.json', 'UTF-8')
    console.log("testing")
    res.json(JSON.parse(notes))

});

// Post route for api notes
router.post('/notes', async function(req, res){
    /*const notes = await readFileAsync('db.json', 'UTF-8')*/

    /*notes.push(req.body)
    notes.push(notes)
    writeFileAsync('db.json', notes, 'UTF-8')
    res.json(JSON.parse(notes))
    console.log('New note added: '+notes.title);*/
    console.log('Checking router');

    const {title, text} = (req.body);

    if (req.body) {
        const newNotes = {
            title, 
            text,
            id: uuid.v4(),
        };

        readAndAppend(newNotes, 'db.json');
        res.json(`Note added successfully`)
    } else {
    res.error('Error in adding note.');
  }
});


// Get note including an ID
router.get('/notes/:id', async function(req, res){
    console.log("testing1")
    res.json(JSON.parse(notes[req.params.id]));
});

// Delete note including an ID
router.delete('/notes/:id', async function(req, res){
    fs.readFile('db.json', 'UTF-8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          let parsedData = JSON.parse(data);
          parsedData = parsedData.filter(note => note.id != req.params.id) 
    refreshDb(parsedData);
    console.log("Deleted note: "+req.params.id);
    res.status(200).json("Deleted note: "+ req.params.id)
    }})

});


// Updates the json file whenever a note is added or deleted
function refreshDb(notes) {
    writeFileAsync('db.json',JSON.stringify(notes, '\t'), err => {
        if (err) throw err;
        return true;
    });
}

const readAndAppend = (content, file) => {
    fs.readFile(file, 'UTF-8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
      }
    });
};

const writeToFile = (destination, content) =>
fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
err ? console.error(err) : console.info(`\nData written to ${destination}`)
);


module.exports = router;