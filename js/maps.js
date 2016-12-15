
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

//Switch this to take a param as a location - then pass it on search
//also send fm.Address to it from slidebar clicks
//Handle relocating map when user searchers
function codeAddress(address) {
console.log(document.getElementById('ZippyZip').value);
    //var address = document.getElementById('ZippyZip').value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
             zIndex:999999
        });

      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
}


function popMap(foundMarkets){

  var icons = {
    beer: { icon: 'images/beerimg.png' },
    farm: { icon: 'images/logo.png' }
  };

  function addMarker(foundMarkets) {
    console.log("MARKET NAME: "+foundMarkets.MarketName);

    //get position
    var position =  new google.maps.LatLng(foundMarkets.y, foundMarkets.x);

    //or get the x and y from the street/city combo
    /*var geocoder = new google.maps.Geocoder();
    var address = foundMarkets.street + ', ' + foundMarkets.city + ' ' + foundMarkets.State;//document.getElementById('address').value;
    console.log("ADDRESS: "+ address);
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
        position = results[0].geometry.location;

        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });*/

    //switch to datapassed from DB
    var marker = new google.maps.Marker({
      position: position,
      icon: icons['farm'].icon,
      map: map,
      title: foundMarkets.MarketName
    });
    //store the ID of the farm in storage incase users want to load page 
    //localStorage.setItem("storageName",foundMarkets.FMID);


    var headerString = '<h4 id="firstHeading" class="firstHeading"><a href="'+foundMarkets.Website+'"><b>'+ foundMarkets.MarketName+'</b></a></h4>'   /// Old, link to their website
    var contentString =
      '<div id="MarkerContent">'+
      '<div id="bodyContent">'+
      '<p><b>State: </b>'+ foundMarkets.State+' <b>City:</b> '+ foundMarkets.city+ ' <b>Zip:</b> '+ foundMarkets.zip+ ' <b>Street:</b> '+ foundMarkets.street+' </p>'+
      '<p><b>Season: </b>'+ foundMarkets.Season1Date+' <b>Time:</b> '+ foundMarkets.Season1Time+' </p>'+
      '<div id="foodicons style= "display: "inline-flex"">'+
      getIcons(foundMarkets);
      '</div> </div> </div>';
    var footerString = 
      '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
      '<button type="button" class="btn btn-primary">Save Market</button>';


    //infowindow = new google.maps.InfoWindow({
    // content: contentString
    //});
    infowindow = new google.maps.InfoWindow({});
    marker.addListener('click', function() {
    	console.log("Clicked location");

    	updateURL(foundMarkets.Facebook);
    	//Infor window is the google api built in tag
    	//infowindow.setContent(contentString);
    	//infowindow.open(map, marker);
    	//Open modal
    	modal.style.display = "block";
    	modaltitle.innerHTML = headerString;
    	modalbody.innerHTML = contentString;
    	modalfooter.innerHTML = footerString;
    });

  

    //add content to the side bar and also link it with the marker
    //populate the side bar with top choices (sliderContent)
    var sc = document.getElementById('sliderContent');
      function slidePanel(fm, marker){
        //if undefined, dont include
        //console.log("web: " + fm.Website);
        if(fm.Website === "undefined" || fm.MarketName === "undefined"){
          console.log("UNDEFINED");
          return '';
        }
        else{
       
        //var html = '<li><a href="'+fm.Website+'">'+fm.MarketName+'</a></li>';
        var html = '<li><div id="slidertag" onclick="codeAddress(\''+fm.street+', '+fm.city +'\'); ">'+fm.MarketName+'</div></li>';
        return html;
      }
    
    }

    sc.innerHTML += slidePanel(foundMarkets, marker);
    var locater = document.getElementById('slidertag');
        locater.onClick = function () {
          updateMarker(marker) ;
          console.log("clicked!!!!!!");
        }
    }
    //update the marker - how can we call this?
    function updateMarker(m){
      m.setIcon('images/selectedlogo.png');
    }




    var sliderContent = '';
    var sc = document.getElementById('sliderContent');
    sc.innerHTML = "";
    //dump(sc.innerHTML);
    sc.innerHTML = '<li><a href="#"><b>Markets</b></a></li>';

    //Add all of the markers to the map
    //sc.innerHTML = "";
    for (var i = 1; i < foundMarkets.length; i++) {
      addMarker(foundMarkets[i]);
    }

  




}


function searchForFarm(market) {
	console.log("searchForFarm");

  

}



