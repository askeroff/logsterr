const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/heyyou', (req, res) => {
  res.send({title: "Hello, world!"});
})

app.listen(process.env.PORT || 3000, function(){
  console.log("App started");
});
