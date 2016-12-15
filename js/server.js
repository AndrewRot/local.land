
/*Express
  author: Andrew Rottier
*/
var express = require('express');
var path = require('path');
var qs = require('querystring');
var app = express();
//var form = require('express-form');


  var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



var port = process.env.PORT || 8080;


//Mongo attempt - im shit
//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running. top is for local
//var url = 'mongodb://localhost:27017/farmsDB';
var url = 'mongodb://heroku_x2qwnz17:c5qu6veuv001ia9snr4vut4fg8@ds113678.mlab.com:13678/heroku_x2qwnz17';

/*
app.post('html/upload-market', function(req, res){
  console.log("DICKDICKDICK");
  var userName = req.body.userName;
  var html = 'Hello: ' + userName + '.<br>' +
             '<a href="/">Try again.</a>';
  res.send(html);
});*/
// routes will go here
//tell express what to do when the /about route is requested
app.post('/form',function(req, res){
  //res.setHeader('Content-Type', 'text/html');
  //res.sendFile(path.join(__dirname, '../index.html'));
  //res.end(JSON.stringify(req.body.MarketName)   );
  //mimic a slow network connection

  
  //checkboxes
  //var sunday, monday;
  //if(x.sunday === false)
  //  sunday = 'N';
  //else


  //debugging output for the terminal
  console.log('Market Name: ' + req.body.MarketName );
  console.log('street: ' + req.body.street );
  console.log('city: ' + req.body.city );
  console.log('county: ' + req.body.county );
  console.log('state: ' + req.body.state );

  console.log('zip: ' + req.body.zip );
  console.log('website: ' + req.body.website );
  console.log('facebook: ' + req.body.facebook );
  console.log('twitter: ' + req.body.twitter );
  console.log('youtube: ' + req.body.youtube );
  console.log('month: ' + req.body.month);

  console.log('sunday: ' + req.body.sunday );
  console.log('monday: ' + req.body.monday );
  console.log('tuesday: ' + req.body.tuesday );
  console.log('wednesday: ' + req.body.wednesday );
  console.log('thursday: ' + req.body.thursday );
  console.log('friday: ' + req.body.friday);


//get all the variables
  var x = req.body;
  var FMID = 1234,
  MarketName = x.MarketName,
  website = x.website,
  facebook = x.facebook,
  twitter = x.twitter,
  youtube = x.youtube,
  othermedia = "www.sample.com",
  street = x.street,
  city = x.city,
  county = x.county,
  state = x.state,
  zip = x.zip,
  
  Season1Date = x.month,
  Season1Time = x.open,

  Season2Date = "",
  Season2Time = "",
  Season3Date = "",
  Season3Time = "",
  Season4Date = "",
  Season4Time = "",

  lat = x.x,
  lng = x.y;



  console.log("LAT: " + lat);
  console.log("LNG: " + lng);
  //add other fields

  lat = Number(lat);
  lng = Number(lng);


  //connect and insert to mongoDB
  //db.products.insert( { item: "card", qty: 15 } )
    // Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

    //get the name of the collection from the database
    var collection = db.collection('markets');
              
    //Create a promise here
    var p1 = new Promise(function(resolve, reject) {
    //Query the areas in the square
    //db.collection('markets').insert( { MarketName: "card", street: "15" } )
    db.collection('markets').insert( { FMID: FMID, MarketName: MarketName, Website: website, Facebook: facebook, Twitter: twitter, Youtube: youtube, street: street, city: city, County: county, State: state, zip: zip, Season1Date: Season1Date, Season1Time: Season1Time, Season2Date: Season2Date, Season2Time: Season2Time, Season3Date: Season3Date, Season3Time: Season3Time, Season4Date: Season4Date, Season4Time: Season4Time, x: lat, y: lng})
   

    //var count = db.collection('markets').find().count(); //count increases
    var count = db.collection('markets').find({ MarketName: "ANdrew market"}).count();

    resolve(count);
    
  });

  p1.then(function(count) {
    //loop through hashmap and display counts
    console.log("Added farm, number of farms: "+ count);
    //send back data
    //res.end("end");


    //console.log("Number of found markets: "+value); // Success!
  }, function(reason) {
    console.log("fail: "+reason); // Error!
  });
  }

});


  res.setHeader('Content-Type', 'application/json');
  setTimeout(function(){

    res.send(JSON.stringify({
      street: req.body.street || null,
      city: req.body.city || null,
      county: req.body.county || null,
      state: req.body.state || null,
      //MarketName: req.body.MarketName || null
      //lastName: req.body.lastName || null
      zip: req.body.zip || null,
          website: req.body.website || null,
          facebook: req.body.facebook || null,
          twitter: req.body.twitter || null,
          youtube: req.body.youtube || null,
          month: req.body.month || null,

      sunday: req.body.sunday || null,
      monday: req.body.monday || null,
      tuesday: req.body.tuesday || null,
      wednesday: req.body.wednesday || null,
      thursday: req.body.thursday || null,
      friday: req.body.friday || null,
      saturday: req.body.saturday || null,

      open: req.body.open || null,
      close: req.body.close || null,

      organic: req.body.organic || null,
          bakedgoods: req.body.bakedgoods || null,
          cheese: req.body.cheese || null,
          crafts: req.body.crafts || null,
          flowers: req.body.flowers || null,
          eggs: req.body.eggs || null,
          seafood: req.body.seafood || null,
          herbs: req.body.herbs || null,
          vegetables: req.body.vegetables || null,
          honey: req.body.honey || null,
          jams: req.body.jams || null,
          maple: req.body.maple || null,
          meat: req.body.meat || null,
          nursery: req.body.nursery || null,
          nuts: req.body.nuts || null,
          plants: req.body.plants || null,

          poultry: req.body.poultry || null,
          prepared: req.body.prepared || null,
          soap: req.body.soap || null,
          trees: req.body.trees || null,
          wine: req.body.wine || null,
          coffee: req.body.coffee || null,
          beans: req.body.beans || null,
          fruits: req.body.fruits || null,
          grains: req.body.grains || null,
          juices: req.body.juices || null,
          mushrooms: req.body.mushrooms || null,
          petfood: req.body.petfood || null,
          tofu: req.body.tofu || null,
          wildharvested: req.body.wildharvested || null

    }));

  }, 2000)


});




//temp global array
var farms = [{name: "farmtest", lat: 100, lon: 100}];

//When we click the search bar
app.post('/searchMovies', function(req, res){
  var body = ''
  //console.log("Handling Search");
  req.on('data', function(d) {
    body += d;
  })
    req.on('end', function(d) {
      var post = qs.parse( body )

    ///Convert char array to lat and long
    //console.log("Search for: "+ post.search);
    var locArray = post.search.replace(/[()]/gi, '').split(',');

    var lati = locArray[0];
    var long = locArray[1];
    //console.log("Lat: "+ lati + ", Lon: "+ long);
    //console.log("************************");
    //calculate the four corners to use later
    var top = (Math.round(100*lati)/100) +.15;
    //var top = Math.ceil( lati );
    //var bottom = Math.floor( lati );
    var bottom = (Math.round(100*lati)/100) -.15;
    //var left = Math.ceil( long  );
    var left = (Math.round(100*long)/100) +.15;

    //var right = Math.floor( long );
    var right = (Math.round(100*long)/100) -.15;
    console.log("Top : " + top);
    console.log("Bottom : " + bottom);
    console.log("Left : " + left); //maybe?
    console.log("Right : " + right);

    //Chopped good!

    //41.6680138,
    // -72.860251,

    // Use connect method to connect to the Server -MAY BE ABLE TO THROW AWAY THIS DUPLICATE CODE LATER
    MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection re-established to', url);

      //Create a promise here
      var p1 = new Promise(function(resolve, reject) {
        //console.log("Inside Promise");

        var count = 0;
        //Query the areas in the square
        var myCursor = db.collection('markets')
         .find({ $and: [{y: {$lt: top, $gt: bottom} },
                        {x: {$lt: left, $gt: right} }]});

        // Execute the each command, triggers for each document
        myCursor.each(function(err, item) {
          if(item != null){
            //Naming of the variables pulled from the DB
            //farms.push({FMID: item.FMID, MarketName: item.MarketName, Website: item.Website, Facebook: item.Facebook, Twitter: item.Twitter, Youtube: item.Youtube, street: item.street, city: item.city, County: item.County, State: item.State, zip: item.zip, Season1Date: item.Season1Date, Season1Time: item.Season1Time, Credit: item.Credit, Organic: item.Organic, Eggs: item.Eggs, Vegetables: item.Vegetables, lat: item.y, lon: item.x, });
            
            farms.push({FMID: item.FMID, MarketName: item.MarketName, Website: item.Website, Facebook: item.Facebook, Twitter: item.Twitter, Youtube: item.Youtube, OtherMedia: item.OtherMedia, street: item.street, city: item.city, County: item.County, State: item.State, zip: item.zip, Season1Date: item.Season1Date, Season1Time: item.Season1Time, Season2Date: item.Season2Date, Season2Time: item.Season2Time, Season3Date: item.Season3Date, Season3Time: item.Season3Time, Season4Date: item.Season4Date, Season4Time: item.Season4Time, x: item.x, y: item.y, Location: item.Location, Credit: item.Credit, WIC: item.WIC, WICcash: item.WICcash, SFMNP: item.SFMNP, SNAP: item.SNAP, Organic: item.Organic, Bakedgoods: item.Bakedgoods, Cheese: item.Cheese, Crafts: item.Crafts, Flowers: item.Flowers, Eggs: item.Eggs, Seafood: item.Seafood, Herbs: item.Herbs, Vegetables: item.Vegetables, Honey: item.Honey, Jams: item.Jams, Maple: item.Maple, Meat: item.Meat, Nursery: item.Nursery, Nuts: item.Nuts, Plants: item.Plants, Poultry: item.Poultry, Prepared: item.Prepared, Soap: item.Soap, Trees: item.Trees, Wine: item.Wine, Coffee: item.Coffee, Beans: item.Beans, Fruits: item.Fruits, Grains: item.Grains, Juices: item.Juices, Mushrooms: item.Mushrooms, PetFood: item.PetFood, Tofu: item.Tofu, WildHarvested: item.WildHarvested, updateTime: item.updateTime});
            console.log(item.MarketName + ", Lat: " + item.y + ", Lon: " + item.x);
            count ++;
          }

          // If the item is null then the cursor is exhausted/empty and closed
          if(item == null) {

            // Show that the cursor is closed
            myCursor.toArray(function(err, items) {

            //resolve when we get to the end of the query
            //console.log("array length (INSIDE PROMISE): "+ farms.length);
            //console.log(items);
            resolve(farms);
            //db.close();
          });
        };
      });
    // reject ("Error!");
    });

    p1.then(function(value) {
      //console.log("Number of found markets: "+value.length); // Success!
      res.end(JSON.stringify(value)   );

    }, function(reason) {
      console.log("fail: "+reason); // Error!
      //fill in res.end with error
    });
  }
  });
  });
});




app.get('/getStateCount', function(req, res){
  var body = ''
  console.log("Handling Search");
  req.on('data', function(d) {
    body += d;
  })
  req.on('end', function(d) {
    var post = qs.parse( body )

  // Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    //get the name of the collection from the database
    var collection = db.collection('markets');

    //Create a promise here
    var p1 = new Promise(function(resolve, reject) {
    //Query the areas in the square
    var myCursor = db.collection('markets').find();

    var myMap = new Map();

    var count = 0;
    // Execute the each command, triggers for each document
    myCursor.each(function(err, item) {
      //console.log("Num found: "+count++)
      if(item != null){
        count++;
        if(myMap.get(item.State)){ //already in map
          myMap.set(item.State, myMap.get(item.State) + 1);// increment count
        }
        else { //not found yet
          myMap.set(item.State, 1); //set count to 1
          //console.log(item.State); //All unique states
        }
      }
      // If the item is null then the cursor is exhausted/empty and closed
      if(item == null) {

      // Show that the cursor is closed
      myCursor.toArray(function(err, items) {
        //console.log("Count: "+count);
        resolve(myMap);
        // Let's close the db
        //db.close();
      });
    };
  });
   // reject ("Error!");
  });

  p1.then(function(myMap) {
    //loop through hashmap and display counts
    //for (var [key, value] of myMap) {
      //console.log("States: " + key + ", "+value);
    //}
    //send back data
    res.end(JSON.stringify(Array.from(myMap)) );


    //console.log("Number of found markets: "+value); // Success!
  }, function(reason) {
    console.log("fail: "+reason); // Error!
  });
  }

});
}
)
});




app.get('/getFarm', function(req, res){
  var body = ''
  console.log("Handling Search for Farm ID");
  req.on('data', function(d) {
    body += d;
  })
  req.on('end', function(d) {
    var post = qs.parse( body )

    ///Convert char array to lat and long
    //console.log("Post: "+ post);
    console.log("Search for farm: "+ post.search);

    var farmID = parseInt(post.search);

    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
    console.log('Connection established to', url);

    //get the name of the collection from the database
    var collection = db.collection('markets');

    //Create a promise here
    var p1 = new Promise(function(resolve, reject) {
    //Find farm
    var myCursor = db.collection('markets').find({FMID: farmID});

    // Execute the each command, triggers for each document
    myCursor.each(function(err, item) {
      // If the item is null then the cursor is exhausted/empty and closed
      if(item == null) {

      // Show that the cursor is closed
      myCursor.toArray(function(err, items) {
        resolve(item);
        // Let's close the db
        //db.close();
      });
    };
  });
   // reject ("Error!");
  });

  p1.then(function(farm) {

    //send back data
    res.end(JSON.stringify(Array.from(farm)) );


    //console.log("Number of found markets: "+value); // Success!
  }, function(reason) {
    console.log("fail: "+reason); // Error!
  });
  }

});
}
)
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
