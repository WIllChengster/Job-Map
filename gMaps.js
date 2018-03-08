//This is the JS file for Google Maps

var dummyCoords = [
    {
        name: 'Lake Forest',
        lat: 33.644375,
        lng: -117.686030
    },
    {
        name: 'Irvine',
        lat: 33.681415,
        lng: -117.826887
    },
    {
        name: 'Aliso Viejo',
        lat: 33.563809,
        lng: -117.727568
    }
    ];

  function createNewMarker(results){
      console.log('createMarker results: ', results);
    for(i = 0; i < dummyCoords.length; i++){
      var marker = new google.maps.Marker({
        position: {
          lat: dummyCoords[i].lat, 
          lng: dummyCoords[i].lng
        },
        map: map
      });
    }
  }


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
      var companyName = 'CyberCoders';
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
    createNewMarker(results[0]);
    //google's code
    // if (status == google.maps.places.PlacesServiceStatus.OK) {
    //     for (var i = 0; i < results.length; i++) {
    //         var place = results[i];
    //         createMarker(results[i]);
    //     }
    // }
}