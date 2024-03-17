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
            // Use the getColor function here to set fillColor based on the earthquake's depth
            return L.circleMarker(latlng, {
                radius: getRadius(feature.properties.mag),
                fillColor: getColor(feature.geometry.coordinates[2]), // This now uses the depth for color
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

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        depths = [0, 10, 30, 50, 70, 90],
        labels = [];

    // Generate a label with a colored square for each depth interval
    for (var i = 0; i < depths.length; i++) {
        var from = depths[i];
        var to = depths[i + 1];

        // Wrap the label text in a div to ensure proper clearing of the float
        labels.push(
            '<i style="background:' + getColor(from + 1) + '"></i> ' +
            '<div>' + from + (to ? '&ndash;' + to : '+') + ' km</div>');
    }

    div.innerHTML = labels.join('');
    return div;
};

legend.addTo(mymap);
