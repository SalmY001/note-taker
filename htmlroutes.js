const router = require('express').Router()
const path = require('path')

// Display notes.html when accessed
router.get('/notes', function(req, res){
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

// Display index.html when all other routes are accessed
router.get('*', function(req, res){
    res.sendFile(path.join(__dirname, './public/index.html'))
})




module.exports = router;