mapboxgl.accessToken = MapBoxToken;
//const parsedCampground = JSON.parse(campground);
console.log(campground);
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 9, // starting zoom
    projection: 'globe' // display the map as a 3D globe
});

map.addControl(new mapboxgl.NavigationControl());

map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style
});

new mapboxgl.Marker()
.setLngLat(campground.geometry.coordinates)
.setPopup(
    new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<h6>${campground.title}</h6>
            <p>${campground.location}</p>`
        )
)
.addTo(map)
