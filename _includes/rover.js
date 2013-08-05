  var stop=0;
  var timeout=6000;
  var zoomout=3000;
  var currentLocation = 0;

function cycle(markers) {
    var i = 0;
    function run() {
        var count = Object.keys(markers._layers).length
        if (++i > count - 1) i = 0;
            var feat = markers._layers[parseInt(Object.keys(points._layers)[i])]
            map.addLayer(feat)
            console.log(feat)
            map.setView(markers._layers[parseInt(Object.keys(points._layers)[i])].getLatLng(),18);
            document.getElementById('count').innerHTML = ('<div class="clearfix"><a href="http://mars.jpl.nasa.gov/msl/multimedia/raw/test/?rawid=' 
                + feat.feature.properties.itemname 
                + '"  target="_blank"><img src="' 
                + feat.feature.properties.image 
                + '" height="400px"/></a><p class="item-date">' + feat.feature.properties.arrivaltime + '</p></div>') || ''
                window.setTimeout(run, 2000);
    };
    run();
}

$('body').append("<div id='count' style='z-index:90000;position:fixed'></div>")

    $.getJSON('/planets/js/curiosity-path.geojson', function(geojson) {
        var layer = L.geoJson(geojson, {
            style: getStyle
       });
       map.addLayer(layer).fitBounds(layer.getBounds())
    });
    var cData;
    $.getJSON('/planets/js/locations.geojson', function(cLocations) {

        var arr = cLocations.features.filter(function (value, index, array) {
                    return (value.properties.image.length > 0) ? true : false;
                });
        points = L.geoJson(arr, {
            style: getStyle //,
        });
        points._leaflet_id = 'points';
       map.fitBounds(points.getBounds())
       cycle(points)
    })

    function getStyle() {
        return {
            color: '#ffcc00',
            opacity: 0.2,
            stroke: '#000',
            fillOpacity: 1,
            weight: 8
        };
    }

