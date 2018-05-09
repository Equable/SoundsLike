// Load Modules
//
//Express module loaded to app
var express = require('express');
var app = express();

//module required to read body sent from get & posts
var bodyParser = require('body-parser');

//Request module loaded
var request = require('request');


//start server
//0.0.0.0 allows access via LAN connect. Use <Hosting Computer IP Address>:<Port> when on another computer
app.listen(8888, '0.0.0.0');


//ensure EJS is used to render view files
app.set('view engine', 'ejs');

//repos
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/ion', express.static(__dirname + '/node_modules/ion-rangeslider'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/typeahead', express.static(__dirname + '/bower_components/typeahead.js/dist'));

//used to read information sent to server from client
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));

//routing
//
//home page
app.get('/', function (req, res) {
  res.render('spotify_soundslike', { token });
});

//authorization token to be used for client side calls to spotify
app.get('/auth', function (req, res) {
  res.send({ token: token });
});

//takes audio_feature gained from client side on main page 
//then renders a new view with track information
//and feautres to be used in the ranges we want to edit

//seperated for client GET to set up sliders
var audioFeatures = undefined;
var coverIMG = undefined;

//To send POST'd JSON to new page
var almostThere = undefined;
var finalResults = undefined;

app.post('/almost_there', function (req, res) {
  audioFeatures = req.body.soundsLikeThis;
  coverIMG = req.body.coverIMG;
  almostThere = req.body;;
  res.end();
});

app.get('/almost_there', function(req, res){
  res.render('almost_there', {almostThere});
});

app.get('/slider_info', function(req, res){
  res.send({audioFeatures});
});

app.post('/results', function (req, res) {
  finalResults = req.body.data;
  res.end();
});

app.get('/results', function (req, res){
  res.render('results', {finalResults});
});



//404 response
app.use(function (req, res, next) {
  res.status(404);
  res.render('404', { url: req.url });
});

//spotify Authentication
//
var client_id = 'replace with your client id here'; // Your client id
var client_secret = 'replace with your client secret here'; // Your secret 

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

//token declared outside of request to use variable outside request
//
var token = undefined;

request.post(authOptions, function (error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    token = body.access_token;

  }
});








