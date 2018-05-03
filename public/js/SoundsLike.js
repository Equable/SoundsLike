// get authentication token to complete recommendation search
var token = undefined;
var soundsLikeThis = undefined;
$.ajax({
    url: 'http://localhost:8888/auth',
    type: "GET",
    dataType: "json",
    success: function (data) {
        token = data.token;
        console.log(token);
    }
});


//GET Track ID
//
//Use a GET call to Spotify Search to find the ID# of the track
//
//take the resulting ID# and store it in the variable trackID for later use (don't have to do this)
//then pass it through the trackFeatures function

var trackID = undefined;
var coverIMG = undefined;
var artistName = undefined;

var searchTrack = function (query) {
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + token
        },
        data: {
            q: query,
            type: 'track',
            limit: 1
        },

        success: function (response) {
            console.log(response);
            trackID = response.tracks.items[0].id;
            coverIMG = response.tracks.items[0].album.images[0];
            artistName = response.tracks.items[0].artists[0].name;
            trackFeatures(trackID);
        }
    });
};


//takes the ID# of the artist found in searchTrack Function and generates the JSON of audio features
//
//result is sent to takeitback function to POST to nodejs server
var trackFeatures = function (trackID) {
    $.ajax({
        url: 'https://api.spotify.com/v1/audio-features/' + trackID,
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + token
        },


        success: function (response) {
            soundsLikeThis = response;
            console.log(soundsLikeThis);
            takeitback(response);
        }
    });
};

//POST to nodejs server for new render view
var takeitback = function (response) {
    $.ajax({
        url: 'http://localhost:8888/almost_there',
        type: "POST",
        data: { soundsLikeThis, coverIMG, artistName},

        success: function (post) {
           window.location.replace('/almost_there');
        }
    });
};

//take the information typed into the search box after pressing submit
document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    searchTrack(document.getElementById('query').value);

}, false);

