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

  function createNewMarker(){
    for(i = 0; i < dummyCoords.length; i++){
      var marker = new google.maps.Marker({
        position: {
          lat: dummyCoords[i].lat, 
          lng: dummyCoords[i].lng
        },
        map: map
      })
    }
  }


  var map;
  function initialize() {
    var mapOptions = {
      zoom: 12,
      center: {lat: 33.634919, lng: -117.739538}
    };
    map = new google.maps.Map(document.getElementById('map'),
        mapOptions);


    
    var infowindow = new google.maps.InfoWindow({
      content: '<p>Marker Location:' + marker.getPosition() + '</p>'
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker);
    });
  }

  google.maps.event.addDomListener(window, 'load', initialize);