//This is the JS file for Google Maps


  var map;
  var center = new google.maps.LatLng(33.634919, -117.739538);
  var indexesToBeSpliced = [];
  function initialize() {

      map = new google.maps.Map(document.getElementById('map'), {
          center: center,
          zoom: 11
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
              if(status !== undefined && status !== 'ZERO_RESULTS') {
                  if (status == google.maps.places.PlacesServiceStatus.OK) {
                      placesData[i] = results[0];
                  }
                  else {
                      console.log('search did not have data on results at i', i);
                      console.log('sample results ', results, status)
                  }
              }
              else{
                  console.log('zero results for', i);
                  indexesToBeSpliced.push(i);
              }
          }
  }


function mapPlacesToJobData(){
    for(let i = 0; i < placesData.length; i++){
        // if(placesData[i] !== undefined){
            findJobs.jobData.results[i].geometry = placesData[i].geometry;
            findJobs.jobData.results[i].address = placesData[i].vicinity;
            if(placesData[i].photos !== undefined){
                findJobs.jobData.results[i].photo = placesData[i].photos[0];

            }
        // }
    }
}

function renderAllMarkers(){
      var results = findJobs.jobData.results;
      for(let i = 0; i < placesData.length; i++){
          var marker = new google.maps.Marker({
              position: {
                  lat: results[i].geometry.location.lat(),
                  lng: results[i].geometry.location.lng()
              },
              map: map,
          });
          //EVAN ADD CUSTOM MARKER NEAR HERE WITH VALUE OF I
          google.maps.event.addListener(marker, 'click', function() {
                expandJobDescription(i);
                if ($('#map').hasClass('mapWithoutInfo') === true){
                    jobStatsMenuToggle();
                }    
                console.log('marker click, ', i);
          });
      }
}

function populateMarkers(){
      for(let i = 0; i < 9; i++) {
          searchCompany(findJobs.jobData.results[i].company.display_name, i);
      }
}
function spliceOutNoResults(){
      for(let i = 0; i < indexesToBeSpliced.length; i++){
          findJobs.jobData.results.splice(indexesToBeSpliced[i], 1);
          placesData.splice(indexesToBeSpliced[i], 1);
      }
}