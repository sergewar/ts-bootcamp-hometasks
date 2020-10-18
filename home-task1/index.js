const express = require('express');
const app = express();
const path = require('path');
const {qr} = require("./src/qr")

const viewsPath = path.join(__dirname, 'views');

app.set('views', viewsPath);
app.set('view engine', 'ejs');
 
const server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
const server_host = process.env.YOUR_HOST || '0.0.0.0';
 
app.get('/', function (req, res) {
  const qrText = req.query.text || "Hello"
  res.render("index",{
      qr_text: qrText,
      qr_image:qr(qrText).base64Image
})

})

app.get('/api/qr/:text',  (req, res) => {
    res.send(qr(req.params.text))
  })

app.listen(server_port, server_host, () =>
    console.log(`Server ${server_host} listening on port ${server_port}`)
);
