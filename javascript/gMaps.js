

/***************************************************************************************************
* createInitialMapCenter - finds the geolocation of the city searched and make it the center of the map that is shown initially
* @param placesData {array} the array of businesses found in Google Places Search
* @returns passes coordinates to the initialize function
*/

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
  

/***************************************************************************************************
* initialize() - takes the coordinates passed from createInitialMapCenter and creates the map
* @param placesData coordinates from createInitialMapCenter
* @returns passes coordinates to the initialize function
*/
  
  function initialize() {

      map = new google.maps.Map(document.getElementById('map'), {
          center: center,
          zoom: 11,
          styles: 
          [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#ff4400"
                    },
                    {
                        "saturation": -68
                    },
                    {
                        "lightness": -4
                    },
                    {
                        "gamma": 0.72
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon"
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#0077ff"
                    },
                    {
                        "gamma": 3.1
                    }
                ]
            },
            {
                "featureType": "water",
                "stylers": [
                    {
                        "hue": "#00ccff"
                    },
                    {
                        "gamma": 0.44
                    },
                    {
                        "saturation": -33
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "stylers": [
                    {
                        "hue": "#44ff00"
                    },
                    {
                        "saturation": -23
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "hue": "#007fff"
                    },
                    {
                        "gamma": 0.77
                    },
                    {
                        "saturation": 65
                    },
                    {
                        "lightness": 99
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "gamma": 0.11
                    },
                    {
                        "weight": 5.6
                    },
                    {
                        "saturation": 99
                    },
                    {
                        "hue": "#0091ff"
                    },
                    {
                        "lightness": -86
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "lightness": -48
                    },
                    {
                        "hue": "#ff5e00"
                    },
                    {
                        "gamma": 1.2
                    },
                    {
                        "saturation": -23
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "saturation": -64
                    },
                    {
                        "hue": "#ff9100"
                    },
                    {
                        "lightness": 16
                    },
                    {
                        "gamma": 0.47
                    },
                    {
                        "weight": 2.7
                    }
                ]
            }
        ]
      });
  }

/***************************************************************************************************
* searchCompany - retrieves company names from the placesData object
* @param placesData {array} the array of businesses found in Google Places Search
*
*/

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

/***************************************************************************************************
* mapPlacesToJobData - takes the information from placesData and assigns their geometry and vicinty values to the jobData object
*/

function mapPlacesToJobData(){
    for(let i = 0; i < placesData.length; i++){
         if(placesData[i] !== undefined){
            findJobs.jobData.results[i].geometry = placesData[i].geometry;
            findJobs.jobData.results[i].address = placesData[i].vicinity;
            }
    }
}

/***************************************************************************************************
* renderAllMarkers - creates markers for each company in placesData object
* @param placesData {placesData} 
* @returns creates markers on map
*/

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
          });
          markerCounter++;
          markers.push(marker);
          previousName = placesData[i].name;
    }
}

/***************************************************************************************************
* cleanAndPopulateMarkers - cleans the current markers on map and repopulates the map with different search results
* @param placesData {array} the array of businesses found in Google Places Search
* @returns passes coordinates to the initialize function
*/

function cleanAndPopulateMarkers(){
    return new Promise(function(resolve, reject) {
        var promiseArr = [];
        for (var i = 0; i < 9; i++) {
            promiseArr.push(searchCompany(findJobs.jobData.results[i].company.display_name, i));
        }
        Promise.all(promiseArr)
    .then(values => {
        spliceOutNoResults();
        resolve('successfully spliced data');
    }).catch(reason => {
            reject('uncaught promise' + reason);
    });
    });
}

/***************************************************************************************************
* spliceOutNoResults - loops through indexesToBeSpliced and finds data that isn't complete enough for creating a marker out of it
* @param placesData {array} the array of businesses found in Google Places Search
*/

function spliceOutNoResults(){
      for(let i = 0; i < indexesToBeSpliced.length; i++){
          findJobs.jobData.results.splice(indexesToBeSpliced[i], 1);
          placesData.splice(indexesToBeSpliced[i], 1);
      }
}

/***************************************************************************************************
* removeMarkers - removes all markers from the map 
*/

function removeMarkers(){
      for(var i = 0; i < markers.length; i++){
          markers[i].setMap(null);
      }
      markers = [];
}