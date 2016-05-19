/**
 * Created by ldang on 5/17/2016.
 */
var infoWindow, map, chosenLocationName;

$.ajax({
    url: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCp4iyb_5TNyq1_KiMflDb3atZqd2Cu0jw&callback=initMap',
    dataType: 'script',
    error: function() {
        alert('Failed loading Google maps');
    }
});

/**
 * Function called by Google API to initialize the map.
 * Creates a marker for each location and a listener to open infoWindows.
 */
function initMap() {
    // Initialize map centered on Chinatown.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 42.3512973, lng: -71.0631268},
        zoom: 16
    });

    // Create an infoWindow.
    infoWindow = new google.maps.InfoWindow({});

    // For each location, create a marker and set its position on the map to the
    // location's lat/long coordinates.
    locations.forEach(function(location) {
        location.marker = new google.maps.Marker({
            position: new google.maps.LatLng(location.lat, location.long),
            map: map,
            title: location.name
        });

        // add listener event for mouse click to open infoWindow with appropriate
        // location info
        location.marker.addListener('click', function() {
            openLocationInfo(location);
            chosenLocationName(location.name);
        });
    });
}

/**
 * Helper function that sets the html content of an infoWindow using the location's data.
 * @param location {Location} - Location object to display
 */
function openLocationInfo(location) {
    //set html to display location name, yelp link, rating, address, and review count.
    infoWindow.setContent('<div><a href="' + location.yelpUrl + '" target="_blank">' + location.name + '</a></div><div>'
        + location.address + '</div>' + '<div><img src="images/yelp-logo-xsmall.png" class="yelp-logo"><img src="' +
        location.rating.url + '"></div><div>' + location.rating.reviewsCount + ' reviews </div>');

    infoWindow.open(map, location.marker); // open the infoWindow

    // If the marker exists and is not animating, set it to bouncing
    // Stop bouncing after 5 seconds.
    if (!(location.marker && location.marker.getAnimation())) {
        location.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function () {
            location.marker.setAnimation(null);
        }, 5000);
    }
}