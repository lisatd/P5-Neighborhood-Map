/**
 * Created by ldang on 4/24/2016.
 */

var cb = function (data) {
    locations[i-1].rating.url = data.rating_img_url;
    locations[i-1].rating.reviewsCount = data.review_count;
    locations[i-1].address = data.location.address[0];
    locations[i-1].yelpUrl = data.url;
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

