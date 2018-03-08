//This is the JS file for Google Maps



//     geocoder = new google.maps.Geocoder();

// function getCoordinates(address, callback){
//     var coordinates;
//     geocoder.geocode({ address: address}, function (results, status) {
//         coords_obj = results[0].geometry.location;
//         coordinates = [coords_obj.nb, coords_obj.ob];
//         callback(coordinates);
//     })
// } console.log(coordinates);


  var map;
  var center = new google.maps.LatLng(33.634919, -117.739538);
  function initialize() {

      map = new google.maps.Map(document.getElementById('map'), {
          center: center,
          zoom: 12
      });


    //Add this to start working on marker information
    // var infowindow = new google.maps.InfoWindow({
    //   content: '<p>Marker Location:' + marker.getPosition() + '</p>'
    // });
    //
    // google.maps.event.addListener(marker, 'click', function() {
    //   infowindow.open(map, marker);
    // });
  }

  google.maps.event.addDomListener(window, 'load', initialize);

  function searchCompany() {
      var service;
      var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);
      var companyName = 'Pacific Technology Solutions';
      var request = {
          location: center,
          radius: '30000',
          name: companyName
      };

      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, logIt);
  }

function logIt(results, status) {
    console.log('this should be our results: ', results);
    getLatLong(results);
}

function getLatLong(results){
    var geocoder = new google.maps.Geocoder();
    var address = results[0].vicinity;

    geocoder.geocode({ 'address': address }, function (results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();

            createNewMarker(latitude, longitude);
        }
    });
}


function createNewMarker(latitude, longitude){
    
    var marker = new google.maps.Marker({
    position: {
        lat: latitude,
        lng: longitude
    },
    map: map
    });

}