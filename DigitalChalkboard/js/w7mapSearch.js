//won't work
var redIcon = new L.Icon({
	iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});


//https://github.com/MokahalA/Leaflet.PinSearch/tree/main

var map = L.map('map').setView([41.789722, -87.599724], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
}).addTo(map);

// markers
var r1 = L.marker([41.79201044304059, -87.59773329573103], {title: 'Robbery 1'}).addTo(map).bindPopup('5639 S. University <br> April 17, 2024 (2:50 p.m.)');
var r2 = L.marker([41.793209006839966, -87.59220683160191],  {title: 'Robbery 2'}).addTo(map).bindPopup('1367 E. 56th Street <br> April 17, 2024 (2:55 p.m.)');
var r3 = L.marker([41.79226237302877, -87.60162827514532], {title: 'Robbery 3'}).addTo(map).bindPopup('5640 S. Ellis Ave <br> March 11, 2024 (11:16 p.m.)');
var r4 = L.marker([41.78721636988572, -87.59925370398106],  {title: 'Robbery 4'}).addTo(map).bindPopup('1425 E. Midway Plaisance <br> January 24, 2024 (5:20 p.m.)');


var reglibrary = L.marker([41.792183066077406, -87.60005188390828], {title: 'Library'}).addTo(map).bindPopup('Reg Library');
var bookstore = L.marker([41.7900063561485, -87.60140484631003], {title: 'Bookstore'}).addTo(map).bindPopup('Bookstore');
var mainquad = L.marker([41.789753058094675, -87.59964927514555], {title: 'Main Quad'}).addTo(map).bindPopup('Main Quad');
var artcenter = L.marker([41.78570526957812, -87.60394450398118], {title: 'Logan Center'}).addTo(map).bindPopup('Logan Center for the Arts');


// PinSearch component
var searchBar = L.control.pinSearch({
    position: 'topright',
    placeholder: 'Search...',
    buttonText: 'Search',
    onSearch: function(query) {
        console.log('Search query:', query);
        // Handle the search query here
    },
    searchBarWidth: '200px',
    searchBarHeight: '30px',
    maxSearchResults: 3
}).addTo(map);