var map = L.map('map').setView([25.3548, 51.1839], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Add marker to the map
var marker = L.marker([25.3033720, 51.4961610]).addTo(map);
marker.bindPopup("<b>Hello!</b><br>This is a marker.").openPopup();

// Add a rectangle to the map
var bounds = [[25.30, 51.49], [25.31, 51.50]];
var rectangle = L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(map);
rectangle.bindPopup("<b>This is a rectangle.</b>");

