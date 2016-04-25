/**
 * Created by ldang on 4/24/2016.
 */

function Location(name) {
    var self = this;

    self.name = name;
    self.lat = 0;
    self.long = 0;
}

Location.prototype.setLatLong = function(lat, long) {
    this.lat = lat;
    this.long = long;

    return this;
};

var locations = [
    new Location('Q Restaurant').setLatLong(42.3518324, -71.0645836),
    new Location('Gourmet Dumpling House').setLatLong(42.3515121, -71.0628519),
    new Location('Hei La Moon').setLatLong(42.3511625, -71.0609087),
    new Location('New Dong Khanh').setLatLong(42.3509395, -71.0637834),
    new Location('Penang').setLatLong(42.3513574,-71.0652484)
];

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 42.3497472, lng: -71.0651117},
        zoom: 17
    });

    var infoWindow = new google.maps.InfoWindow({});

    locations.forEach(function(location) {
        location.marker = new google.maps.Marker({
            position: new google.maps.LatLng(location.lat, location.long),
            map: map,
            title: location.name
        });

        location.marker.addListener('click', function() {
            openLocationInfo(location);
        });
    });

    function openLocationInfo(location) {
        infoWindow.setContent(location.name);
        infoWindow.open(map, location.marker);
    }
}

function appViewModel() {
    var self = this;

    self.locations = ko.observableArray(locations);
}

ko.applyBindings(new appViewModel());