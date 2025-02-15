const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

let photos = [];

app.post('/upload', upload.single('file'), (req, res) => {
  const { description } = req.body;
  const file = req.file;

  const newPhoto = {
    id: photos.length + 1,
    path: file.filename,
    description,
  };

  photos.push(newPhoto);
  res.json(newPhoto);
});

app.get('/photos', (req, res) => {
  res.json(photos);
});

app.delete('/photos/:id', (req, res) => {
  const { id } = req.params;
  const photo = photos.find((p) => p.id === parseInt(id));

  if (photo) {
    fs.unlinkSync(path.join(__dirname, 'uploads', photo.path));
    photos = photos.filter((p) => p.id !== parseInt(id));
    res.status(204).send();
  } else {
    res.status(404).send('Photo not found');
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});