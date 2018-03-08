//This is the JS file for Google Maps
var googleApiKeys = {
    src: 'https://maps.googleapis.com/maps/api/js?key=' + this.key + '&libraries=places',
    keyArrayIndex: 0,
    keyArray: ['AIzaSyBMsSStKjx8julckw0tC-ZwbK94Jxd6eMM',
               'AIzaSyBe-JAsXTAykET74snBv3pnqgoka7Kqm3k',
               'AIzaSyDw0A_tqADxn1SOOaJCTWadD9GlkbWWFsc'],
    'key': this.keyArray[0],
    changeSrc: function(){
     this.src =    'https://maps.googleapis.com/maps/api/js?key=' + this.key + '&libraries=places'
        $('.googleApi').attr('src', this.src);
            keyArrayIndex++;
            if(keyArrayIndex >= keyArray.length){
            keyArrayIndex = 0;
        }
    }
}
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
  var indexesToBeSpliced = [];
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
              if(status !== undefined && status !== 'ZERO_RESULTS') {
                  if (status == google.maps.places.PlacesServiceStatus.OK) {
                      placesData[i] = results[0];
                  }
                  else {
                      console.log('search did not have data on results at i');
                      console.log('ssample results ', results, status)

                  }
              }
              else{
                  indexesToBeSpliced.push(i);
              }
          }
  }


function mapPlacesToJobData(){
      for(var i = 0; i < 9; i++){
          findJobs.jobData.results[i].geometry = placesData[i].geometry;
          findJobs.jobData.results[i].address = placesData[i].vicinity;
          if(placesData[i].photos !== undefined){
              findJobs.jobData.results[i].photo = placesData[i].photos[0];

          }
      }
}

function renderAllMarkers(){
      var results = findJobs.jobData.results;
      for(let i = 0; i < 9; i++){
          var marker = new google.maps.Marker({
              position: {
                  lat: results[i].geometry.location.lat(),
                  lng: results[i].geometry.location.lng()
              },
              map: map,
          });
          //EVAN ADD CUSTOM MARKER NEAR HERE WITH VALUE OF I
          google.maps.event.addListener(marker, 'click', function() {
              console.log('marker click, ', i);
          });
      }
}

function populateMarkers(){
      for(var i = 0; i < findJobs.jobData.results.length; i++){
              searchCompany(findJobs.jobData.results[i].company.display_name, i);
              if(i % 5 === 0){
                  googleApiKeys.changeSrc();
              }

      }
}
function spliceOutNoResults(){
      for(var i = 0; i < indexesToBeSpliced.length; i++){
          findJobs.jobData.results.splice(indexesToBeSpliced[i], 1);
      }
}