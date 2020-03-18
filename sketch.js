var mapimg;
var clat = 0;
var clon = 0;

var lat = 31.2304;
var long = 121.4737;

var zoom = 1;
var deaths;
var confirmed;
var recovered;

function preload() {
  mapimg = loadImage(
    `https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,${zoom},0,0/1024x512?access_token=pk.eyJ1IjoiYW5kZXNzODYiLCJhIjoiY2p3dzJ2NXozMW1xcTN6cDU1cmN5OTVkMSJ9.QusmuAsR11ZNzLtt0m-CsA`
  );
  deaths = loadStrings(
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv'
  );
  confirmed = loadStrings(
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv'
  );
  recovered = loadStrings(
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv'
  );
}

function mercX(long) {
  long = radians(long);
  var a = (256 / PI) * pow(2, zoom);
  var b = long + PI;
  return a * b;
}
function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}

function setup() {
  createCanvas(1024, 512);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);

  var centerX = mercX(clon);
  var centerY = mercY(clat);

  for (var i = 0; i < deaths.length; i++) {
    var data = deaths[i].split(/,/);
    // console.log(data);
    var lat = data[2];
    var long = data[3];
    var dead = data[data.length -1];

    var x = mercX(long) - centerX;
    var y = mercY(lat) - centerY;
    fill(255, 0, 255, 25);
    ellipse(x, y, 0.1*dead, 0.1*dead);
  }
}
