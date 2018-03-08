//This is the JS file for Google Maps

  function createNewMarker(results){
    
        var marker = new google.maps.Marker({
        position: {
            lat: results.geometry.location.lat(),
            lng: results.geometry.location.lng()
        },
        map: map
        });
    }



  var map;
  var center = new google.maps.LatLng(33.634919, -117.739538);
  function initialize() {

      map = new google.maps.Map(document.getElementById('map'), {
          center: center,
          zoom: 12
      });
  }

  google.maps.event.addDomListener(window, 'load', initialize);

  function searchCompany(companyName, i) {
      // return new Promise(function(resolve, reject) {
          var service;
          var request = {
              location: center,
              radius: '50000',
              name: companyName
          };

          service = new google.maps.places.PlacesService(map);
          service.nearbySearch(request, addToPlacesData);

          function addToPlacesData(results, status) {

              if (status == google.maps.places.PlacesServiceStatus.OK) {
                  placesData[i] = results[0];
              }
              else {
                  console.log('if this logs ask brian about making me a promise', i);
                  console.log(results, status)

              }

          }
  }


function mapPlacesToJobData(){
      for(var i = 0; i < 5; i++){
          findJobs.jobData.results[i].geometry = placesData[i].geometry;
          findJobs.jobData.results[i].address = placesData[i].vicinity;
          if(placesData[i].photos !== undefined){
              findJobs.jobData.results[i].photo = placesData[i].photos[0];

          }
      }
}

function renderAllMarkers(){
      var results = findJobs.jobData.results;
      for(let i = 0; i < 5; i++){
          var marker = new google.maps.Marker({
              position: {
                  lat: results[i].geometry.location.lat(),
                  lng: results[i].geometry.location.lng()
              },
              map: map,
          });
          google.maps.event.addListener(marker, 'click', function() {
              console.log('marker click, ', i);
              expandJobDescription(i);
          });
      }
}

function populateMarkers(){
      for(var i = 0; i < 5; i++){
              searchCompany(findJobs.jobData.results[i].company.display_name, i);
      }
}