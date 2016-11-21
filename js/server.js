
/*Express
  author: Andrew Rottier
*/
var express = require('express');
var path = require('path');

var app = express();
var port = process.env.PORT || 8080;

//This must point to your home directory, express will traverse this directory
//to look for files and serve them upon request
app.use(express.static(path.join(__dirname, '../')));

//Initiate homepage (index.html)
app.use('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(port, function() {
  console.log('App is listening on port ' + port);
});




//Mongo attempt - im shit
//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

          // Connection URL. This is where your mongodb server is running.
          var url = 'mongodb://localhost:27017/';

          // Use connect method to connect to the Server
          MongoClient.connect(url, function (err, db) {
            if (err) {
              console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {
              //HURRAY!! We are connected. :)
              console.log('Connection established to', url);

              // do some work here with the database.

              //create a promise while the database is loading
               // We make a new promise: we promise a numeric count of this promise, starting from 1 (after waiting 3s)
              var p1 = new Promise(
                  // The resolver function is called with the ability to resolve or
                  // reject the promise
                  function(resolve, reject) {
                    console.log("Gathering database");
                    var collection = db.collection('farmers');
                    
                    /*
                    var docs = [{mykey:1}, {mykey:2}, {mykey:3}];

                    collection.insert(docs, {w:1}, function(err, result) {

                      collection.find().toArray(function(err, items) {});

                      var stream = collection.find({mykey:{$ne:2}}).stream();
                      stream.on("data", function(item) {});
                      stream.on("end", function() {});

                      collection.findOne({"meta.view.id":1}, function(err, item) {
                        console.log(item);
                      });

                    });*/
                    //tst query
                    //db.farmers.distinct( "data.0" )
                   // Insert some users
                    
                  
                    resolve(collection.count());

                       //log.insertAdjacentHTML('beforeend', thisPromiseCount +
                       //   ') Promise started (<small>Async code started</small>)<br/>');
                      // This is only an example to create asynchronism
                      /*window.setTimeout(
                          function() {
                              // We fulfill the promise !
                              resolve(collection.count());
                          }, Math.random() * 2000 + 1000);*/
                  }
              );
              // We define what to do when the promise is resolved/fulfilled with the then() call,
              // and the catch() method defines what to do if the promise is rejected.
              p1.then(
                  // Log the fulfillment value
                  function(val) {
                    //console.log(collection.count());
                    //console.log(collection.distinct( "data.2.9" ));
                    console.log("****"+val);
                      //log.insertAdjacentHTML('beforeend', val +
                      //    ') Promise fulfilled (<small>Async code terminated</small>)<br/>');
                  })
              .catch(
                  // Log the rejection reason
                  function(reason) {
                      console.log('Handle rejected promise ('+reason+') here.');
                  });



              //console.log(db.farmers.distinct( "data.2.9" ));
              //var collection = db.collection('farmers');
              //console.log(collection.distinct( "data.2.9" ));
              //Close connection
              db.close();
            }
          });
          

