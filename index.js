/**
 * Created by ldang on 4/24/2016.
 */

function Location(name) {
    var self = this;

    self.name = name;
    self.lat = 0;
    self.long = 0;
    self.address = '';
    self.yelpId = '';
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

Location.prototype.setYelpId = function(id) {
    this.yelpId = id;

    return this;
};

var locations = [
    new Location('Q Restaurant')
        .setLatLong(42.3518324, -71.0645836)
        .setAddress('660 Washington St.')
        .setYelpId('q-restaurant-boston'),
    new Location('Gourmet Dumpling House')
        .setLatLong(42.3515121, -71.0628519)
        .setAddress('52 Beach St.')
        .setYelpId('gourmet-dumpling-house-boston'),
    new Location('Hei La Moon')
        .setLatLong(42.3511625, -71.0609087)
        .setAddress('88 Beach St.')
        .setYelpId('hei-la-moon-boston'),
    new Location('New Dong Khanh')
        .setLatLong(42.3509395, -71.0637834)
        .setAddress('81 Harrison Ave.')
        .setYelpId('new-dong-khanh-boston'),
    new Location('Penang')
        .setLatLong(42.3513574,-71.0652484)
        .setAddress('685 Washington St.')
        .setYelpId('penang-boston')
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

var cb = function (data) {
    console.log(data.name + ': ' + data.rating);
    if (i < locations.length)
        getYelpInfo(locations[i++]);
};

var i = 0;
getYelpInfo(locations[i++]);

function getYelpInfo(location) {
    var parameters = {
        oauth_consumer_key: 'W3Fgj0pcqayF-INv1iey1g',
        oauth_token: 'xMdB9y_6YrSkx_4AaxDMi2Ewv0cYPKhs',
        oauth_nonce: newNonce(),
        oauth_timestamp: Math.floor(Date.now() / 1000),
        oauth_signature_method: 'HMAC-SHA1',
        oauth_version : '1.0',
        callback: 'cb'
    };
    var yelpURL = 'https://api.yelp.com/v2/business/' + location.yelpId;

    var sig = oauthSignature.generate('GET', yelpURL, parameters,
        'aZA03ZKJoMEJBiNG2x-kkWSKCsE', 'hUBw1JK02NI1vqT00_XbrIL0QmU', {encodeSignature: false});

    parameters.oauth_signature = sig;

    $.ajax({
        url: yelpURL,
        data: parameters,
        cache: true,
        dataType: 'jsonp',
        jsonpCallback: 'cb',
        error: function(e) {
            console.log('error');
            console.log(e);
        }
    });
}

function newNonce() {
    return (Math.floor(Math.random() * 1e12).toString());
}

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