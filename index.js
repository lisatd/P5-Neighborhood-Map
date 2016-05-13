/**
 * Created by ldang on 4/24/2016.
 */

function Location(name) {
    var self = this;

    self.name = name;
    self.lat = 0;
    self.long = 0;
    self.address = '';
}

Location.prototype.setLatLong = function(lat, long) {
    this.lat = lat;
    this.long = long;

    return this;
};

Location.prototype.setAddress = function(address) {
    this.address = address;

    return this;
};

var locations = [
    new Location('Q Restaurant').setLatLong(42.3518324, -71.0645836).setAddress('660 Washington St.'),
    new Location('Gourmet Dumpling House').setLatLong(42.3515121, -71.0628519).setAddress('52 Beach St.'),
    new Location('Hei La Moon').setLatLong(42.3511625, -71.0609087).setAddress('88 Beach St.'),
    new Location('New Dong Khanh').setLatLong(42.3509395, -71.0637834).setAddress('81 Harrison Ave.'),
    new Location('Penang').setLatLong(42.3513574,-71.0652484).setAddress('685 Washington St.')
];

var infoWindow, map;

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
    infoWindow.setContent('<div><strong>' + location.name + '</strong></div><div>' + location.address + '</div>');
    infoWindow.open(map, location.marker);
    if (!(location.marker && location.marker.getAnimation())) {
        location.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function () {
            location.marker.setAnimation(null);
        }, 2000);
    }
}

function newNonce() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < 10; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

var parameters = {
    oauth_consumer_key: 'W3Fgj0pcqayF-INv1iey1g',
    oauth_token: 'xMdB9y_6YrSkx_4AaxDMi2Ewv0cYPKhs',
    oauth_nonce: newNonce(),
    oauth_timestamp: Math.floor(new Date().getTime() / 1000),
    oauth_signature_method: 'hmac-sha1',
    oauth_version : '1.0'
};

var sig = oauthSignature.generate('GET', 'https://api.yelp.com/v2/business/q-restaurant-boston', parameters,
    'aZA03ZKJoMEJBiNG2x-kkWSKCsE', 'hUBw1JK02NI1vqT00_XbrIL0QmU', {encodeSignature: false});

parameters.oauth_signature = sig;

function callback(data) {
    console.log(data);
}

$.get('https://api.yelp.com/v2/business/q-restaurant-boston', parameters, callback);

var chosenLocationName;

function appViewModel() {
    var self = this;

    self.locations = ko.observableArray(locations);
    self.chosenLocationName = chosenLocationName = ko.observable();
    self.filterText = ko.observable();

    self.filteredLocations = ko.computed(function() {
        return locations.filter(function (location) {
            if (location.name.toLowerCase().indexOf(self.filterText() ? self.filterText().toLowerCase() : '') === -1) {
                if (location.marker)
                    location.marker.setMap(null);
                return false;
            } else {
                if (location.marker)
                    location.marker.setMap(map);
                return true;
            }
        });
    });

    self.openInfoWindow = function(location) {
        openLocationInfo(location);
        self.chosenLocationName(location.name);
    };
}

ko.applyBindings(new appViewModel());