

/***************************************************************************************************
* createInitialMapCenter - finds the geolocation of the city searched and make it the center of the map that is shown initially
* @param placesData {array} the array of businesses found in Google Places Search
* @returns passes coordinates to the initialize function
*/

var map;
var markers = [];
var center = null;
var indexesToBeSpliced = [];

function createInitialMapCenter(location){
    return new Promise(function (resolve, reject){
        
        var geocoder = new google.maps.Geocoder();
        var address = location;
        
        geocoder.geocode({ 'address': address }, function (results, status) {
            let initLatitude = 33.6845673;
            let initLongitude = -117.82650490000003;
            if(status === google.maps.GeocoderStatus.OK) {
                initLatitude = results[0].geometry.location.lat();
                initLongitude = results[0].geometry.location.lng();
            }
            center = new google.maps.LatLng(initLatitude, initLongitude);
            
        });
        if( initialize()){
            resolve('map created');
        }
        else{
        reject('map failed');
        }
    });
}


/***************************************************************************************************
* initialize() - takes the coordinates passed from createInitialMapCenter and creates the map
* @param placesData coordinates from createInitialMapCenter
* @returns passes coordinates to the initialize function
*/
  
  function initialize() {

    var myStyles =[
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [
                  { visibility: "off" }
            ]
        }
    ];

      map = new google.maps.Map(document.getElementById('map'), {
          maxZoom: 16,
          center: center,
          zoom: 10,
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
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [
                      { "visibility": "off" }
                ]
            },
            {
                "featureType": "transit.station.airport",
                "elementType": "labels",
                "stylers": [
                    { "visibility": "off" }
              ]
            },
            {
                "featureType": "transit.station.bus",
                "stylers": [{ "visibility": "off" }]
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
      return true;
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
               radius: '8000',
               name: companyName
           };
           if(map === 'undefined'){
               
           }
           service = new google.maps.places.PlacesService(map);
           service.nearbySearch(request, addToPlacesData);
           
           function addToPlacesData(results, status) {
               if (status !== undefined && status !== 'ZERO_RESULTS') {
                   if (status == google.maps.places.PlacesServiceStatus.OK) {
                    //    placesData[i] = results[0];
                       placesData.push({result:results[0], index:i});
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
            let index = placesData[i].index;
            findJobs.jobData.results[index].geometry = placesData[i].result.geometry;
            findJobs.jobData.results[index].address = placesData[i].result.vicinity;
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
          if(placesData[i].result.name === previousName){
              var marker = new google.maps.Marker({
                  position: {
                      lat: results[i].geometry.location.lat() + 0.00002,
                      lng: results[i].geometry.location.lng() + 0.0006
                  },
                  animation: google.maps.Animation.DROP,
                  map: map,
                  icon: `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=${markerCounter}|FF0000|000000`
              });
              marker.addListener('click', function() {
                setIcon(i);
                expandJobDescription(i);
                    if ($('#map').hasClass('mapWithoutInfo') === true){
                        jobStatsMenuToggle();
                    }
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
              marker.addListener('click', function() {
                // marker.setIcon('https://www.google.com/mapfiles/marker_green.png');
                setIcon(i);
                expandJobDescription(i);
                    if ($('#map').hasClass('mapWithoutInfo') === true){
                        jobStatsMenuToggle();
                    }
            });
          }
            
          markerCounter++;
          markers.push(marker);
          previousName = placesData[i].result.name;
    }

    recenterMap();
}

function recenterMap(){
    var bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < markers.length; i++) {
    bounds.extend(markers[i].getPosition());
    }

    map.fitBounds(bounds);
}

function setIcon(indexOfMarker){
    var markerCounter = 1;

    for(i = 0; i < markers.length; i++){
        markers[i].setIcon(`http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=${markerCounter}|FF0000|000000`)
        markerCounter++
    }
    markers[indexOfMarker].setIcon('https://www.google.com/mapfiles/marker_green.png')
}

/***************************************************************************************************
* cleanAndPopulateMarkers - cleans the current markers on map and repopulates the map with different search results
* @param placesData {array} the array of businesses found in Google Places Search
* @returns passes coordinates to the initialize function
*/

function cleanAndPopulateMarkers(){
    return new Promise(function(resolve, reject) {
        var promiseArr = [];
        for (var i = 0; i < findJobs.jobData.results.length; i++) {
            promiseArr.push(searchCompany(findJobs.jobData.results[i].company.display_name, i));
        }
        Promise.all(promiseArr)
    .then(values => {
        resolve('resolved company coordinates lookup');
    }).catch(reason => {
        console.log('error catch for markers');
            reject('uncaught promise' + reason);
    });
    });
}

/***************************************************************************************************
* spliceOutNoResults - loops through indexesToBeSpliced and finds data that isn't complete enough for creating a marker out of it
* @param placesData {array} the array of businesses found in Google Places Search
*/

function spliceOutNoResults(){
    indexesToBeSpliced.sort().reverse();
      for(let i = 0; i < indexesToBeSpliced.length; i++){
          findJobs.jobData.results.splice(indexesToBeSpliced[i], 1);
        //   placesData.splice(indexesToBeSpliced[i], 1);
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