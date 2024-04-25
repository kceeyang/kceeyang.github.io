var map = L.map('map').setView([41.789722, -87.599724], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// var marker = L.marker([41.789722, -87.599724]).addTo(map);


//add popup
L.marker([41.789722, -87.599724]).addTo(map)
    .bindPopup('University of Chicago <br> (41.789722, -87.599724)')
    .openPopup();

    

//add circle 
var circle = L.circle([41.792183066077406, -87.60005188390828], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 50
}).addTo(map);
circle.bindPopup("Reg Library");



//add triangle 
var polygon = L.polygon([
    [41.790058455489294, -87.60076442984608],
    [41.790057600643316, -87.59810079366527],
    [41.789160126267056, -87.59814130863663],
    [41.78916525961268, -87.60072312090129]
    
]).addTo(map);

polygon.bindPopup("UChicago Main Quad");







//     ///
// var popup = L.popup()
//     .setLatLng([41.789722, -87.599724])
//     .setContent("I am a standalone popup.")
//     .openOn(map);
// /////




var popup = L.popup();

function onMapClick(e) 
{
    popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
}
    
map.on('click', onMapClick);


