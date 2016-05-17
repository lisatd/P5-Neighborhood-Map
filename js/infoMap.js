/**
 * Created by ldang on 5/17/2016.
 */
var infoWindow, map, chosenLocationName;;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 42.3512973, lng: -71.0631268},
        zoom: 16
    });

    infoWindow = new google.maps.InfoWindow({});

    locations.forEach(function(location) {
        location.marker = new google.maps.Marker({
            position: new google.maps.LatLng(location.lat, location.long),
            map: map,
            title: location.name
        });

        location.marker.addListener('click', function() {
            openLocationInfo(location);
            chosenLocationName(location.name);
        });
    });
}

function openLocationInfo(location) {
    infoWindow.setContent('<div><a href="' + location.yelpUrl + '" target="_blank">' + location.name + '</a></div><div>' + location.address + '</div>' +
        '<div><img src="images/yelp-logo-xsmall.png" class="yelp-logo"><img src="' + location.rating.url + '"></div><div>' + location.rating.reviewsCount + ' reviews </div>');
    infoWindow.open(map, location.marker);
    if (!(location.marker && location.marker.getAnimation())) {
        location.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function () {
            location.marker.setAnimation(null);
        }, 2000);
    }
}