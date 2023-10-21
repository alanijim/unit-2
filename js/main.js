// Initialize the map
var map = L.map('map').setView([51.505, -0.09], 13);

// Adding an OpenStreetMap tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function getData() {
    // Load your GeoJSON data (replace 'your_data.geojson' with the actual file path)
    fetch("data/Summer_Sports_Experience.geojson")
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            // Create a Leaflet GeoJSON layer with custom styling and popups
            L.geoJson(json, {
                pointToLayer: function(feature, latlng) {
                    return L.circleMarker(latlng, {
                        radius: 8,
                        fillColor: "#ff7800",
                        color: "#000",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                    });
                },
                onEachFeature: function(feature, layer) {
                    // Bind popups or customize as per data attributes
                    if (feature.properties) {
                        layer.bindPopup("Borough Location: " + feature.properties["Borough Location"] + "<br>Attendance Sum: " + feature.properties["Attendance Sum"]);
                    }
                }
            }).addTo(map);
        });
}

//Calling the getData function
getData();
