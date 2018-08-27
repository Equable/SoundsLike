var autofill = function(){
    var myLength = $('#query').val().length;
    var query = document.getElementById('query').value;
    var items;
    var text = $("#music");
    $('#music').empty();
    if (myLength >= 3){
       
        $.ajax({
            url: 'https://api.spotify.com/v1/search',
            type: "GET",
            headers: {
                'Authorization': 'Bearer ' + token
            },
            data: {
                q: query,
                type: 'track,artist',
                limit: 5
            },
    
            success: function (response) {
                console.log(response);
                items = response.tracks.items;
                console.log(items);
                
                $.each(items, function(){
                    $('#music').append("<option value='" + this.name + ", " + this.artists[0].name + "'>");
                });
                $('#music').delay(300).focus();

            }
        });
        
        
       
    };

};
timeoutID = 0;
$('#query').keypress(function(){
    clearTimeout(timeoutID);
    timeoutID = setTimeout(autofill, 500);
});

//test
