  var iconBase =
  'https://developers.google.com/maps/documentation/javascript/examples/full/images/';
  var mymap,infoWindow;
  var markers = [];
$(document).ready(function () {
  mymap= initMap(-34.397, 150.644, 16);
});
function initMap(userlat, userlong, userzoom) {
  // The location of Uluru
  var uluru = { lat: userlat, lng: userlong };
  // The map, centered at Uluru
  var thisMap = new google.maps.Map(
  document.getElementById('map'), { zoom: userzoom, center: uluru ,mapTypeId: 'roadmap'});
    //Autocmplete
    var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        thisMap.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        thisMap.addListener('bounds_changed', function() {
          searchBox.setBounds(thisMap.getBounds());
        });

        var markers = [];
      // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };
            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: thisMap,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          thisMap.fitBounds(bounds);
        });
  infoWindow = new google.maps.InfoWindow;
  // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(thisMap);
            thisMap.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, thisMap.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, thisMap.getCenter());
        }

  google.maps.event.addListener(thisMap, 'click', function (event) {
    addMarker(event.latLng,thisMap);
  });
  // This event listener will call addMarker() when the map is clicked.
  return mymap;
}
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser");
  }
}
function showPosition(position) {
  mymap= initMap(position.coords.latitude, position.coords.longitude,16);
}
// Adds a marker to the map and push to the array.
function addMarker(location,thismap) {
  var marker = new google.maps.Marker({
    position: location,
    map: thismap
  });
  marker.setMap(thismap);
  markers.push(marker);
}
//
function Icons(name){
  var icons = {
    parking: {
      icon: iconBase + 'parking_lot_maps.png'
    },
    library: {
      icon: iconBase + 'library_maps.png'
    },
    info: {
      icon: iconBase + 'info-i_maps.png'
    }
  };
}

///Auto compplete
function initAutocomplete(userMap) {
  var map = userMap;
  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });
  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
  return map;
}