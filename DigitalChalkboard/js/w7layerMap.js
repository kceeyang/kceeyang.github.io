
//https://leafletjs.com/examples/layers-control/


//https://github.com/pointhi/leaflet-color-markers
var redIcon = new L.Icon({
	iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

//add robberies location (add red color to the marker)
var r1 = L.marker([41.79201044304059, -87.59773329573103], {icon: redIcon}).bindPopup('5639 S. University <br> April 17, 2024 (2:50 p.m.)'),
    r2    = L.marker([41.793209006839966, -87.59220683160191], {icon: redIcon}).bindPopup('1367 E. 56th Street <br> April 17, 2024 (2:55 p.m.)'),
    r3    = L.marker([41.79226237302877, -87.60162827514532], {icon: redIcon}).bindPopup('5640 S. Ellis Ave <br> March 11, 2024 (11:16 p.m.)'),
    r4    = L.marker([41.78721636988572, -87.59925370398106], {icon: redIcon}).bindPopup('1425 E. Midway Plaisance <br> January 24, 2024 (5:20 p.m.)');


var robberies = L.layerGroup([r1, r2, r3, r4]);




//create 2 base layers 
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', 
{
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});

var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', 
{
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'});


//add osm as the default one to the map object , also add robberies location to the map
var map = L.map('map', 
{
    center: [41.789722, -87.599724],
    zoom: 15,
    layers: [osm, robberies]
});


//baseMaps object contains base layers 
//it will set the text for the layer in the control (e.g. “OpenStreetMap”).
//while the corresponding value is a reference to the layer (e.g. osm).

// var baseMaps = {
//     "OpenStreetMap": osm,
//     "OpenStreetMap.HOT": osmHOT
// };

//make the label for the OpenStreetMap.HOT map red
var baseMaps = 
{
    "OpenStreetMap": osm,
    "<span style='color: red'>OpenStreetMap.HOT</span>": osmHOT
};
//overlayMaps object contains overlays
var overlayMaps = 
{
    "Armed Robberies": robberies
};






//The first argument passed when creating the layers control is the base layers object. 
//The second argument is the overlays object. 
//Both arguments are optional: you can pass just a base layers object by omitting the second argument, 
//or just an overlays objects by passing null as the first argument. 
//In each case, the omitted layer type will not appear for the user to select.
var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
//here, we added osm and robberies layers to the map but didn’t add osmHOT. 
//The layers control is smart enough to detect what layers we’ve already added and have corresponding checkboxes and radioboxes set.






//// add campus buildings location
var reglibrary = L.marker([41.792183066077406, -87.60005188390828]).bindPopup('Reg Library'),
    bookstore = L.marker([41.7900063561485, -87.60140484631003]).bindPopup('Bookstore'),
    mainquad = L.marker([41.789753058094675, -87.59964927514555]).bindPopup('Main Quad'),
    artcenter = L.marker([41.78570526957812, -87.60394450398118]).bindPopup('Logan Center for the Arts');
    
var buildings = L.layerGroup([reglibrary, bookstore, mainquad, artcenter]);


var openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', 
{
    maxZoom: 19,
    attribution: 'Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)'
});

layerControl.addBaseLayer(openTopoMap, "OpenTopoMap");
layerControl.addOverlay(buildings, "Campus Buildings");

