/**
 * Created by ldang on 4/24/2016.
 */
/**
 * Callback for jQuery to call when receiving yelp data.
 * Sets the yelp info in Location object then calls yelp API on next location.
 * @param data - Yelp data
 */
var cb = function (data) {
    locations[i].rating.url = data.rating_img_url;
    locations[i].rating.reviewsCount = data.review_count;
    locations[i].address = data.location.address[0];
    locations[i].yelpUrl = data.url;
    if (++i < locations.length) // if there are still locations to query,
        getYelpInfo(locations[i]); // call yelp api
};

var i = 0; // set counter to start of locations array
getYelpInfo(locations[i]); // get yelp data for first location

/**
 * Makes oAuth call to Yelp api to get business data for a given Location.
 * @param location {Location} - location to get yelp data for
 */
function getYelpInfo(location) {
    // set request params
    var parameters = {
        oauth_consumer_key: 'W3Fgj0pcqayF-INv1iey1g',
        oauth_token: 'xMdB9y_6YrSkx_4AaxDMi2Ewv0cYPKhs',
        oauth_nonce: newNonce(),
        oauth_timestamp: Math.floor(Date.now() / 1000),
        oauth_signature_method: 'HMAC-SHA1',
        oauth_version : '1.0',
        callback: 'cb'
    };
    var yelpURL = 'https://api.yelp.com/v2/business/' + location.yelpId; // api URL

    // Generate oAuthSignature to use in request
    var sig = oauthSignature.generate('GET', yelpURL, parameters,
        'aZA03ZKJoMEJBiNG2x-kkWSKCsE', 'hUBw1JK02NI1vqT00_XbrIL0QmU', {encodeSignature: false});

    parameters.oauth_signature = sig; // set the signature in the params

    // Make jsonp call for yelp data.
    $.ajax({
        url: yelpURL,
        data: parameters,
        cache: true,
        dataType: 'jsonp',
        jsonpCallback: 'cb',
        error: function(e) {
            // Prompt user if request failed.
            alert('Failed to retrieve yelp data.');
        }
    }).fail(function() {
        // Prompt user if request failed.
        alert('Failed to retrieve yelp data.');
    });
}

/**
 * Helper function to generate random #s to use in oAuth request.
 * @returns {string}
 */
function newNonce() {
    return (Math.floor(Math.random() * 1e12).toString());
}

