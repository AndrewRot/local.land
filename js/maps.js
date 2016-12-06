
 var infowindow;
         // content: contentString
        //});; //used to display info about the markets, we only want 1


function searchFor() {
  //Get value from search box
  var searchMovieDiv = document.getElementById('ZippyZip')
  var convertedLocation;


  var resultsMap = map;
  //Google geocoding
  var geocoder = new google.maps.Geocoder();
  var address = document.getElementById('ZippyZip').value;
       geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            //console.log(results[0].geometry.location);
            convertedLocation = results[0].geometry.location; //update the searched location
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
            reqListener();//wait till now to pass coordinates to server
          } else {
          convertedLocation = "no location";
          console.log("****Fucked up");
            alert('Geocode was not successful for the following reason: ' + status);
          }
      });

  var oReq = new XMLHttpRequest();

      //Handle result from geocoding
  function reqListener () {
  	oReq.open("POST", "/searchMovies", true);
  	// MAJOR KEY-- build form in XML http request SEND function
  	console.log('search='+convertedLocation);

  	//THIS ISSNT SENDING THE RESQUEST PROPERLY
  	oReq.send('search='+convertedLocation);
    oReq.addEventListener("load", receivedResponse); //Callback to next function
  }

  //Handle the server response
  function receivedResponse(){
  	//console.log(" req.responseText: "+oReq.response);
  	popMap( JSON.parse(oReq.response) );
  }

}




//function that initializes map
function initMap() {
geocoder = new google.maps.Geocoder();
map = new google.maps.Map(document.getElementById('map'), {
zoom: 13,
center: new google.maps.LatLng(37.4419, -122.1419),
scrollwheel: false,
//custom colors
styles: [{"featureType":"landscape","stylers":[{"hue":"#FFA800"},{"saturation":0},{"lightness":0},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#53FF00"},{"saturation":-73},{"lightness":40},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FBFF00"},{"saturation":0},{"lightness":0},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#00FFFD"},{"saturation":0},{"lightness":30},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#00BFFF"},{"saturation":6},{"lightness":8},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#679714"},{"saturation":33.4},{"lightness":-25.4},{"gamma":1}]}]
});

//var infoWindow = new google.maps.InfoWindow({map: map});

        // Geolocation services, start user at current geolocation
        /*if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

           infoWindow.setPosition(pos);
            infoWindow.setContent('Your Location');
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }*/

}


//Handle relocating map when user searchers
function codeAddress() {
console.log(document.getElementById('ZippyZip').value);
    var address = document.getElementById('ZippyZip').value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });

      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
}


function popMap(foundMarkets){

	//var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        var icons = {
          beer: { icon: 'images/beerimg.png' },
          farm: { icon: 'images/logo.png' }
        };

        function addMarker(foundMarkets) {

        //get position
        var position =  new google.maps.LatLng(foundMarkets.y, foundMarkets.x);

          //switch to datapassed from DB
          var marker = new google.maps.Marker({
            position: position,
            icon: icons['farm'].icon,
            map: map,
            title: foundMarkets.MarketName
          });
          //store the ID of the farm in storage incase users want to load page 
          localStorage.setItem("storageName",foundMarkets.FMID);

          var contentString =
          '<div id="MarkerContent">'+
            '<div id="siteNotice">'+
            '</div>'+
            //'<div onClick="javascript.searchForFarm('+foundMarkets+');"><h4 id="firstHeading" class="firstHeading" >'+ foundMarkets.MarketName+'</h4></div>'+     ///Slide out attempt
           
            '<h4 id="firstHeading" class="firstHeading"><a href="/html/profile.html">'+ foundMarkets.MarketName+'</a></h4>'+      //Link to profile
            //'<h4 id="firstHeading" class="firstHeading"><a href="'+foundMarkets.Website+'">'+ foundMarkets.MarketName+'</a></h4>'+   /// Old, link to their website
            '<div id="bodyContent">'+
            '<p><b>State: </b>'+ foundMarkets.State+' <b>City:</b> '+ foundMarkets.city+' </p>'+
            '<p><b>Season: </b>'+ foundMarkets.Season1Date+' <b>Time:</b> '+ foundMarkets.Season1Time+' </p>'+
           '<div id="foodicons style= "display: "inline-flex"">'+
           getIcons(foundMarkets);
           '</div>'+
        '</div>'+
       '</div>';

        //infowindow = new google.maps.InfoWindow({
         // content: contentString
        //});
        infowindow = new google.maps.InfoWindow({});
        marker.addListener('click', function() {
        	infowindow.setContent(contentString);
   			//infowindow.open(map, this);
        	infowindow.open(map, marker);
        });
        }

        for (var i = 0; i < foundMarkets.length; i++) {
          addMarker(foundMarkets[i]);
        }
}


function searchForFarm(market) {
	console.log("searchForFarm");

  

}



