// Initialize the map and set its view to a default location
var mymap = L.map('map').setView([37.8, -96], 4);

// Add an OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(mymap);

// Function to determine the color of a marker based on the earthquake's depth
function getColor(depth) {
    return depth > 90 ? '#d73027' :
           depth > 70 ? '#fc8d59' :
           depth > 50 ? '#fee08b' :
           depth > 30 ? '#d9ef8b' :
           depth > 10 ? '#91cf60' :
                        '#1a9850';
}

// Function to determine the radius of a marker based on the earthquake's magnitude
function getRadius(magnitude) {
    return magnitude * 4;
}

// Fetch earthquake data and add markers to the map
fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson')
.then(response => response.json())
.then(data => {
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, {
                radius: getRadius(feature.properties.mag),
                fillColor: getColorForMagnitude(feature.properties.mag), // Use the correct function for magnitude
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup(`<h3>${feature.properties.place}</h3><p>Magnitude: ${feature.properties.mag}<br>Depth: ${feature.geometry.coordinates[2]} km</p>`);
        }
    }).addTo(mymap);
});

function getColorForMagnitude(magnitude) {
    return magnitude > 5 ? '#d73027' :
           magnitude > 4 ? '#fc8d59' :
           magnitude > 3 ? '#fee08b' :
           magnitude > 2 ? '#d9ef8b' :
           magnitude > 1 ? '#91cf60' :
                           '#1a9850';
}

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        magnitudes = [0, 1, 2, 3, 4, 5],
        labels = [],
        from, to;

    for (var i = 0; i < magnitudes.length; i++) {
        from = magnitudes[i];
        to = magnitudes[i + 1];

        labels.push(
            '<i style="background:' + getColorForMagnitude(from + 1) + '"></i> ' +
            from + (to ? '&ndash;' + to : '+'));
    }

    div.innerHTML = labels.join('<br>');
    return div;
};

legend.addTo(mymap);
