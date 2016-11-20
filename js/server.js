
var http = require('http')
  , fs   = require('fs')
  , url  = require('url')
  , port = 8080;

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

          //We need to work with "MongoClient" interface in order to connect to a mongodb server.
          var MongoClient = mongodb.MongoClient;

          // Connection URL. This is where your mongodb server is running.
          var url = 'mongodb://localhost:27017/farmers';

          // Use connect method to connect to the Server
          MongoClient.connect(url, function (err, db) {
            if (err) {
              console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {
              //HURRAY!! We are connected. :)
              console.log('Connection established to', url);

              // do some work here with the database.

              //Close connection
              db.close();
            }
          });

var server = http.createServer (function (req, res) {
  var uri = url.parse(req.url)

  switch( uri.pathname ) {
    case '/':
      sendFile(res, '../index.html', 'text/html')
      break
    case '/index.html':
      sendFile(res, '../index.html', 'text/html')
      break
    case '/contact.html':
      sendFile(res, '../contact.html', 'text/html')
      break
    case '/style.css':
      sendFile(res, '../css/style.css', 'text/css')
      break
    case '/contactForm.css':
      sendFile(res, '../css/contactForm.css', 'text/css')
      break
    case 'images/BasketAndTable.jpg':
      sendFile(res, '../images/BasketAndTable.jpg', 'image/jpg')
      break
    case 'images/Trees.jpg':
      sendFile(res, '../images/Trees.jpg', 'image/jpg')
      break
    case 'images/cornimg.png':
      sendFile(res, '../images/cornimage.png', 'image/png')
      break
    case 'images/beerimg.png':
      sendFile(res, '../images/cornimage.png', 'image/png')
      break

    default:
      res.end('404 not found')
  }
})

server.listen(process.env.PORT || port);
console.log('listening on 8080')

// subroutines

function sendFile(res, filename, contentType) {
  contentType = contentType || 'text/html'

  fs.readFile(filename, function(error, content) {
    res.writeHead(200, {'Content-type': contentType})
    res.end(content, 'utf-8')
  })

}



//Express... Cant use
/*var express = require('express');
var path = require('path');

var app = express();
var port = process.env.PORT || 3000;

//app.use(express.static('public'))
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(port, function() {
  console.log('App is listening on port ' + port);
});*/

