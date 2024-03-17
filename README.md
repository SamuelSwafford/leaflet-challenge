# leaflet-challenge

This project is a web-based visualization tool that maps earthquake data onto a world map using the Leaflet.js library. It utilizes data from the United States Geological Survey (USGS) to plot earthquakes by both magnitude and depth.

## Project File Structure

- `README.md`: This file, which provides documentation and overview of the project.
- `index.html`: The HTML file that serves as the entry point for the visualization. It references the Leaflet library and links to the CSS and JavaScript files that are essential for the map's functionality.
- `static/`: This directory contains the static resources for the project.
  - `css/style.css`: The stylesheet for the project that defines the styling of the map and the legend.
  - `js/logic.js`: The main JavaScript file that contains the logic for map initialization, data fetching, and visualization.

## Getting Started

To view the map visualization, follow these steps:

1. Clone or download the repository onto your local machine.
2. Navigate to the directory where you saved the project.
3. Open the `index.html` file in a web browser.

The map should automatically load and display the earthquake data.

## Visualization Features

- **Map**: An interactive map that users can navigate to explore global earthquake events.
- **Markers**: Earthquakes are represented as markers whose size is proportional to the magnitude, and color reflects the depth.
- **Popups**: Clickable markers that show detailed information about each earthquake, such as location, magnitude, and depth.
- **Legend**: A legend that explains the color coding of the markers according to the depth of the earthquakes.

## Data Source

The earthquake data is sourced from the [USGS Earthquake Catalog API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php), which provides a real-time GeoJSON feed of recent earthquake events.


