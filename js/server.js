
/*Express
  author: Andrew Rottier
*/
var express = require('express');
var path = require('path');
var  qs = require('querystring');

var app = express();
var port = process.env.PORT || 8080;

///app.use(express.session());

//temp global array
var farms = [{name: "farmtest", lat: 100, lon: 100}];

//When we click the search bar
app.post('/searchMovies', function(req, res){
  var body = ''
  console.log("Handling Search");
  req.on('data', function(d) {
    body += d;
  })
  req.on('end', function(d) {
    var post = qs.parse( body )

  ///Convert char array to lat and long
  console.log("Search for: "+ post.search);
  var locArray = post.search.replace(/[()]/gi, '').split(',');

  var lati = locArray[0];
  var long = locArray[1];
  console.log("Lat: "+ lati + ", Lon: "+ long);
  console.log("************************");
  //calculate the four corners to use later
  var top = Math.ceil( lati );
  var bottom = Math.floor( lati );
  var left = Math.ceil( long  );
  var right = Math.floor( long );
  console.log("Top : " + top);
  console.log("Bottom : " + bottom);
  console.log("Left : " + left); //maybe?
  console.log("Right : " + right);

  //Chopped good!

  //now that we have lat and lon, query the database**

// Use connect method to connect to the Server -MAY BE ABLE TO THROW AWAY THIS DUPLICATE CODE LATER
MongoClient.connect(url, function (err, db) {
if (err) {
  console.log('Unable to connect to the mongoDB server. Error:', err);
} else {
  //HURRAY!! We are connected. :)
  console.log('Connection re-established to', url);

  // do some work here with the database.
  //$.when(function1(db)).then(function2());
  console.log("Gathering database");
  //get the name of the collection from the database
  var collection = db.collection('markets');
              
  //Create a promise here
  var p1 = new Promise(function(resolve, reject) {
    console.log("Inside Promise");
    var places = [];
    //37.4256448,-122.1703695
    //var number = db.collection('farms').find({ lat: {$lt: 100} }).count();
    var count = 0;
    //Query the areas in the square
    var myCursor = db.collection('markets')
    /*.find({ $and: [{lat: {$lt: 38} },
                    {lat: {$gt: 37} },
                    {lon: {$lt: -121} },
                    {lon: {$gt: -122} }]});
                      //DOESNT WORK WITH VARIABLES??? wtf - works with hardcode
    /*
    .find({ $and: [{lat: {$lt: top} },
                    {lat: {$gt: bottom} },
                    {lon: {$lt: left} },
                    {lon: {$gt: right} }]});*/
     .find({ $and: [{y: {$lt: top, $gt: bottom} },
                    {x: {$lt: left, $gt: right} }]});
//find( { score: { $gt: 0, $lt: 2 } } )
     //IS IT BECAUSE LAT AND LON ARE STORED AS STRINGS????????????
     //start = new Date("01/01/2007")
     //db.users.find({"registered" : {"$lt" : start}})
    // Execute the each command, triggers for each document
    myCursor.each(function(err, item) {
      if(item != null){
        //Naming of the variables pulled from the DB
        farms.push({FMID: item.FMID, MarketName: item.MarketName, Website: item.Website, Facebook: item.Facebook, Twitter: item.Twitter, Youtube: item.Youtube, street: item.street, city: item.city, County: item.County, State: item.State, zip: item.zip, Season1Date: item.Season1Date, Season1Time: item.Season1Time, Credit: item.Credit, Organic: item.Organic, Eggs: item.Eggs, Vegetables: item.Vegetables, lat: item.y, lon: item.x, });
        console.log(item.MarketName + ", Lat: " + item.y + ", Lon: " + item.x);
        //farms.push({ name: item.name, lat: item.lat, lon: item.lon });
        //console.log(item.name + ", Lat: " + item.lat + ", Lon: " + item.lon);
        count ++;
      }

      // If the item is null then the cursor is exhausted/empty and closed
      if(item == null) {
                    
        // Show that the cursor is closed
        myCursor.toArray(function(err, items) {
                        
        //resolve when we get to the end of the query
        console.log("array length (INSIDE PROMISE): "+ farms.length);
        //farms = places;
        resolve(farms);
        // Let's close the db
        //db.close();
      });
    };
  });
                
   // reject ("Error!");
  });

  p1.then(function(value) {
    console.log("Number of found markets: "+value.length); // Success!
    res.end(JSON.stringify(value)   );

  }, function(reason) {
    console.log("fail: "+reason); // Error!
  });
  

  }
});

  //*******
  });



 // pass back the results to client side
  
});

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
//test is the nameof the database
var url = 'mongodb://localhost:27017/farmsDB';



// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
if (err) {
  console.log('Unable to connect to the mongoDB server. Error:', err);
} else {
  //HURRAY!! We are connected. :)
  console.log('Connection established to', url);

  // do some work here with the database.
  //$.when(function1(db)).then(function2());
  console.log("Gathering database");
  //get the name of the collection from the database
  var collection = db.collection('markets');
              
  //Create a promise here
  var p1 = new Promise(function(resolve, reject) {

    var places = [];
    //37.4256448,-122.1703695
    var number = db.collection('markets').find({ y: {$lt: 29} }).count();

    //Query the areas in the square
    var myCursor = db.collection('markets')
     .find({ $and: [{y: {$lt: 38} },
                    {y: {$gt: 37} },
                    {x: {$lt: -121} },
                    {x: {$gt: -122} }]});

    // Execute the each command, triggers for each document
    myCursor.each(function(err, item) {
      if(item != null){
        //places.push("xxx");
        farms.push({ name: item.MarketName, lat: item.y, lon: item.x });
        console.log(item.MarketName);
      }


      
      // If the item is null then the cursor is exhausted/empty and closed
      if(item == null) {
                    
      // Show that the cursor is closed
      myCursor.toArray(function(err, items) {
                        
        //resolve when we get to the end of the query
        farms = places;
        //fetchLocationData();
        resolve(number);
        // Let's close the db
        //db.close();
      });
    };
  });
                
   // reject ("Error!");
  });

  p1.then(function(value) {
    console.log("Number of found markets: "+value); // Success!
  }, function(reason) {
    console.log("fail: "+reason); // Error!
  });
  

  }
});


//test this with global array
function fetchLocationData(){
 
  //console.log("num farms:"+farms.length);
  return farms;
}

fetchLocationData();



