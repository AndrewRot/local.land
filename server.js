
var http = require('http')
  , fs   = require('fs')
  , url  = require('url')
  , port = 8080;

var server = http.createServer (function (req, res) {
  var uri = url.parse(req.url)

  switch( uri.pathname ) {
    case '/':
      sendFile(res, 'index.html', 'text/html')
      break
    case '/index.html':
      sendFile(res, 'index.html', 'text/html')
      break
    case '/contact.html':
      sendFile(res, 'contact.html', 'text/html')
      break
    case '/style.css':
      sendFile(res, 'style.css', 'text/css')
      break
    case '/contactForm.css':
      sendFile(res, 'contactForm.css', 'text/css')
      break
    case '/BasketAndTable.jpg':
      sendFile(res, 'BasketAndTable.jpg', 'image/jpg')
      break
    case '/Trees.jpg':
      sendFile(res, 'Trees.jpg', 'image/jpg')
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

