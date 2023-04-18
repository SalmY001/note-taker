const router = require('express').Router()
const data = require('./db.json')
const fs = require('fs')
const util = require('util')
const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

router.get('/notes', async function(req, res){
    const notes = await readFileAsync('db.json', 'utf-8')
    console.log("testing")
    res.json(JSON.parse(notes))

})




module.exports = router;