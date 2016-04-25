/**
 * Created by ldang on 4/24/2016.
 */
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 42.3497472, lng: -71.0651117},
        zoom: 17
    });
}