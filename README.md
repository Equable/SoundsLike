<h1><b>SoundsLike Webapp</b></h1>

<h3><b>Author: Louis Huerta-Blake</b></h3>
<h4><b>README Last Edited: 8/27/2018</b><h4>

<h2><b><u>Summary</u></b></h2>


>Want to find a song that reminds you of your favorite? Well look no further. The SoundsLike webapp uses Spotify's API to create a table of up to 5 recommendations based on your song. But what if you are you trying to find songs that have that same energy or more? No problem! With SoundsLike you can improve your search and broaden your horizons with handy sliders helping you find more songs to fit the mood of your next party!

<h2><b><u>How It Works</u></b></h2>

>Using node.js in conjunction with express the application polls the spotify api multiple times, processing the JSON of each request and pulling relevant data to use in the next GET.
>>1. Before any user input. The back-end makes a request for spotify authentication token. This is stored in a variable for when client then makes a get request to obtain the token.
>>2. After the user inputs the track requested, the application does a get call of spotify's search API and takes relevant information storing it into variables. These variables are then POST'd to the node.js server to be rendered and called on the next page.
>>3. The Sliders page '/almost_there' renders the images and values via EJS then processes out relevant data in a seperate js file to an array which is used to create the max/min values for the sliders.
>>4. The Sliders are then rendered with their ranges +/-.1 of the origional song's values. This may vary based on conditions as it may not exceed 1 or drop below 0
>>5. After the user moves the ranges (or choses not to) an AJAX get is used for the recommendation. It takes the values set on each of the sliders as well as the track ID to return a JSON of up to 5 tracks (including other information about that track)
>>6. The Application then POST's the response to the node server where the data is stored in a variable to be rendered in the 'results' EJS page.

<h2><b><u>Dependencies</u></b></h2>

>* body-parser 1.18.2 </br>
>* bootstrap 4.1.0 </br>
>* ejs 2.5.9 </br>
>* express 4.16.3 </br>
>* ion-rangeslider 2.2.0 </br>
>* request 2.85.0


<h2><b><u>Version</u></b></h2>

>* 1.2 Mobile Friendly results
>   * Made results mobile Friendly
>   * Images of album now posted on results page
>
>* 1.1 Auto-Suggest
>   * Added autosuggest feature during search to further clarify selection
>
>* 1.0: Primary release
>   * Recommends tracks based on entered track and ranges selected
>   * Displays up to 5 results. Each time the results are random out of all possible recommendations within the given parameters

<h2><b><u>Known Bugs/Upcoming Improvements</u></b></h2>

>* Currently if multiple artists share a song name, the search will select the most popular of potential choices. Future plan to add artist option in the query or typeahead.
>* Beautification of the page will be continuing in future releases.
>* Considering adding album images for each of the recommended tracks
