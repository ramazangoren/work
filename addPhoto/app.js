const express = require('express')
const app = express();
const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({ 
    destination: (req, file, cb)=>{
        cb(null, './images')
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + ' --- ' + file.originalname)
    }
});

const upload = multer({storage: storage});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/single',upload.single('image') ,(req, res, next) => {
    console.log(req.file);
    res.send('single file sent successfuly')
})

app.post('/multiple',upload.array('images', 3) ,(req, res, next) => {
    console.log(req.files);
    res.send('multy file sent successfuly')
})




app.listen(4000, ()=>{
    console.log('listening on port 4000');
})