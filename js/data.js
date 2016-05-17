/**
 * Created by ldang on 5/17/2016.
 */

/**
 * Constructor function for a Location object.
 * @param name {string} - Name of location
 * @constructor
 */
function Location(name) {
    var self = this;

    self.name = name;
    self.lat = 0;
    self.long = 0;
    self.address = '';
    self.yelpId = '';
    self.rating = {
        url: '',
        reviewsCount: 0
    };
    self.yelpUrl = '';
}

/**
 * Setter function to set lat long coordinates of Location. Allows for chaining.
 * @param lat {float} - latitude
 * @param long {float} - longitude
 * @returns {Location}
 */
Location.prototype.setLatLong = function(lat, long) {
    this.lat = lat;
    this.long = long;

    return this;
};

/**
 * Setter function to set the yelp business id used in queries. Allows for chaining.
 * @param id {string} - yelp business ID
 * @returns {Location}
 */
Location.prototype.setYelpId = function(id) {
    this.yelpId = id;

    return this;
};

// create the 5 locations for app
var locations = [
    new Location('Q Restaurant')
        .setLatLong(42.3518324, -71.0645836)
        .setYelpId('q-restaurant-boston'),
    new Location('Gourmet Dumpling House')
        .setLatLong(42.3515121, -71.0628519)
        .setYelpId('gourmet-dumpling-house-boston'),
    new Location('Hei La Moon')
        .setLatLong(42.3511625, -71.0609087)
        .setYelpId('hei-la-moon-boston'),
    new Location('New Dong Khanh')
        .setLatLong(42.3509395, -71.0637834)
        .setYelpId('new-dong-khanh-boston'),
    new Location('Penang')
        .setLatLong(42.3513574,-71.0652484)
        .setYelpId('penang-boston')
];