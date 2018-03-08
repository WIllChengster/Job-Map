//This is the JS file for Google Maps

// var placesTotalLat = null;
// var placesTotalLong = null;

// function setMapCenter(){
    
//     for(i = 0; i < placesData.length; i++){
//         placesTotalLat += placesData[i].geometry.location.lat();
//         placesTotalLong += placesData[i].geometry.location.lng();
//     }
//     placesTotalLat = placesTotalLat/placesData.length;
//     placesTotalLong = placesTotalLong/placesData.length;
// }

// setMapCenter();

function createNewMarker(results){
    
    var marker = new google.maps.Marker({
    position: {
        lat: results.geometry.location.lat(),
        lng: results.geometry.location.lng()
    },
    map: map,
    icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=1|FF0000|000000',
    scaledSize: new google.maps.Size(90, 90)
    });
}



function createInitialMapCenter(){
    
    var geocoder = new google.maps.Geocoder();
        var address = findJobs.location;

        geocoder.geocode({ 'address': address }, function (results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                var initLatitude = results[0].geometry.location.lat();
                var initLongitude = results[0].geometry.location.lng();
                center = new google.maps.LatLng(initLatitude, initLongitude);
                initialize();
            }
        });
}


  var map;
  var initLatitude = null;
  var initLongitude = null;

  var center = null;
  var indexesToBeSpliced = [];
  var markers = [];
  function initialize() {

      map = new google.maps.Map(document.getElementById('map'), {
          center: center,
          zoom: 12
      });
  }

//   google.maps.event.addDomListener(window, 'load', initialize);

  function searchCompany(companyName, i) {
       return new Promise(function(resolve, reject) {
           var service;
           var request = {
               location: center,
               radius: '50000',
               name: companyName
           };

           service = new google.maps.places.PlacesService(map);
           service.nearbySearch(request, addToPlacesData);

           function addToPlacesData(results, status) {
               if (status !== undefined && status !== 'ZERO_RESULTS') {
                   if (status == google.maps.places.PlacesServiceStatus.OK) {
                       placesData[i] = results[0];
                       resolve('successfully added place data')
                   }
                   else {
                       console.log('search did not have data on results at i', i);
                       console.log('sample results ', results, status)
                       resolve(status);
                   }
               }
               else {
                   indexesToBeSpliced.push(i);
                   resolve('no results for ' + i);
               }
           }
       });
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
      var markerCounter = 1;
      var previousName = '';
      for(let i = 0; i < placesData.length; i++){
          if(placesData[i].name === previousName){
              var marker = new google.maps.Marker({
                  position: {
                      lat: results[i].geometry.location.lat() + 0.00002,
                      lng: results[i].geometry.location.lng() + 0.0006
                  },
                  animation: google.maps.Animation.DROP,
                  map: map,
                  icon: `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=${markerCounter}|FF0000|000000`
              });
          }
          else{
              var marker = new google.maps.Marker({
                  position: {
                      lat: results[i].geometry.location.lat(),
                      lng: results[i].geometry.location.lng()
                  },
                  animation: google.maps.Animation.DROP,
                  map: map,
                  icon: `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=${markerCounter}|FF0000|000000`
              });
          }
          google.maps.event.addListener(marker, 'click', function() {
                expandJobDescription(i);
                if ($('#map').hasClass('mapWithoutInfo') === true){
                    jobStatsMenuToggle();
                }    
                console.log('marker click, ', i);
          });
          markerCounter++;
          markers.push(marker);
          previousName = placesData[i].name;
    }
}

function cleanAndPopulateMarkers(){
    return new Promise(function(resolve, reject) {
        var promiseArr = [];
        for (var i = 0; i < 9; i++) {
            promiseArr.push(searchCompany(findJobs.jobData.results[i].company.display_name, i));
        }
        console.log('promises array is: ', promiseArr);
        Promise.all(promiseArr)
    .then(values => {
        console.log('splicing out bad data', placesData);
        spliceOutNoResults();
        console.log('after splicing out bad data', placesData);
        resolve('successfully spliced data');
    }).catch(reason => {
            reject('uncaught promise' + reason);
    });
    });
}
function spliceOutNoResults(){
      for(let i = 0; i < indexesToBeSpliced.length; i++){
          findJobs.jobData.results.splice(indexesToBeSpliced[i], 1);
          placesData.splice(indexesToBeSpliced[i], 1);
      }
}
function removeMarkers(){
      for(var i = 0; i < markers.length; i++){
          markers[i].setMap(null);
      }
      markers = [];
}