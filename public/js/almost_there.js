var audioFeatures = undefined;
var token = undefined;

$.ajax({
    url: '/auth',
    type: "GET",
    dataType: "json",
    success: function (data) {
        token = data.token;
        console.log(token);
    }
});

$.ajax({
    url: '/slider_info',
    type: "GET",
    dataType: "json",

    success: function (response) {
        audioFeatures = response;
        fillarrays(audioFeatures);
    }
});

//variables for sliders
var afarray = [];
var minmaxarray = [];
var queryarray = [];


var fillarrays = function (data) {
    afarray[0] = data.audioFeatures.danceability;
    afarray[1] = data.audioFeatures.energy;
    afarray[2] = data.audioFeatures.acousticness;
    afarray[3] = data.audioFeatures.instrumentalness;
    afarray[4] = data.audioFeatures.speechiness;
    afarray[5] = data.audioFeatures.valence;
    minmax(afarray);
    console.log(afarray);
    console.log(minmaxarray);

};

var minmax = function (data) {
    var x = 0;
    var y = 0;

    while (x >= 0 && x <= 5 && y <= 11 && y >= 0) {
        if ((Number(afarray[x]) - 0.1) >= 0) {
            if ((Number(afarray[x]) + 0.1) <= 1) {
                minmaxarray[y] = (Number(afarray[x]) - .1);
                y++;
                minmaxarray[y] = (Number(afarray[x]) + .1);
                y++;
            }
            else {
                minmaxarray[y] = (Number(afarray[x]) - .1);
                y++;
                minmaxarray[y] = 1;
                y++;
            }
        }
        else {

            minmaxarray[y] = 0;
            y++;
            minmaxarray[y] = (Number(afarray[x]) + 0.1);
            y++;
        };

        x++;
    };
    sliders();
};

var sliders = function () {

    $("#dance").ionRangeSlider({
        type: "double",
        min: 0,
        max: 1,
        from: minmaxarray[0],
        to: minmaxarray[1],
        step: 0.1,
        hide_min_max: true,
        onStart: function(data){
            queryarray[0] = data.from;
            queryarray[1] = data.to;
            console.log(queryarray);
        },
        onFinish: function(data){
            queryarray[0] = data.from;
            queryarray[1] = data.to;
            console.log(queryarray);
        }
    });
    $("#energy").ionRangeSlider({
        type: "double",
        min: 0,
        max: 1,
        from: minmaxarray[2],
        to: minmaxarray[3],
        step: 0.1,
        hide_min_max: true,
        onStart: function(data){
            queryarray[2] = data.from;
            queryarray[3] = data.to;
            console.log(queryarray);
        },
        onFinish: function(data){
            queryarray[2] = data.from;
            queryarray[3] = data.to;
            console.log(queryarray);
        }
    });
    $("#acoust").ionRangeSlider({
        type: "double",
        min: 0,
        max: 1,
        from: minmaxarray[4],
        to: minmaxarray[5],
        step: 0.1,
        hide_min_max: true,
        onStart: function(data){
            queryarray[4] = data.from;
            queryarray[5] = data.to;
            console.log(queryarray);
        },
        onFinish: function(data){
            queryarray[4] = data.from;
            queryarray[5] = data.to;
            console.log(queryarray);
        }
    });
    $("#instru").ionRangeSlider({
        type: "double",
        min: 0,
        max: 1,
        from: minmaxarray[6],
        to: minmaxarray[7],
        step: 0.1,
        hide_min_max: true,
        onStart: function(data){
            queryarray[6] = data.from;
            queryarray[7] = data.to;
            console.log(queryarray);
        },
        onFinish: function(data){
            queryarray[6] = data.from;
            queryarray[7] = data.to;
            console.log(queryarray);
        }
    });
    $("#speech").ionRangeSlider({
        type: "double",
        min: 0,
        max: 1,
        from: minmaxarray[8],
        to: minmaxarray[9],
        step: 0.1,
        hide_min_max: true,
        onStart: function(data){
            queryarray[8] = data.from;
            queryarray[9] = data.to;
            console.log(queryarray);
        },
        onFinish: function(data){
            queryarray[8] = data.from;
            queryarray[9] = data.to;
            console.log(queryarray);
        }
    });
    $("#valence").ionRangeSlider({
        type: "double",
        min: 0,
        max: 1,
        from: minmaxarray[10],
        to: minmaxarray[11],
        step: 0.1,
        hide_min_max: true,
        onStart: function(data){
            queryarray[10] = data.from;
            queryarray[11] = data.to;
            console.log(queryarray);
        },
        onFinish: function(data){
            queryarray[10] = data.from;
            queryarray[11] = data.to;
            console.log(queryarray);
        }
    });
};

var finalRecommendation = function(data){
    $.ajax({
        url: 'https://api.spotify.com/v1/recommendations',
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + token
        },
        data: {
            limit: 5,
            seed_tracks: data.audioFeatures.id,
            min_danceability: queryarray[0],
            max_danceability: queryarray[1],
            min_energy:queryarray[2],
            max_energy: queryarray[3],
            min_acousticness: queryarray[4],
            max_acousticness: queryarray[5],
            min_instrumentalness: queryarray[6],
            max_instrumentalness: queryarray[7],
            min_speechiness: queryarray[8],
            max_speechiness: queryarray[9],
            min_valence: queryarray[10],
            max_valence: queryarray[11],
        
        },
        success: function(response){
            finalRun(response);
            console.log(response);
        }

    });
    
};

var finalRun = function(data){
    $.ajax({
        url: '/results',
        type: "POST",
        data: {data},
        success: function(post){
            window.location.replace('/results');
        }

    });
};

document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    finalRecommendation(audioFeatures);

}, false);