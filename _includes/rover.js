  var stop=0;
  var timeout=6000;
  var zoomout=3000;
  var currentLocation = 0;

$('body').append('<div class="map-ui">')

$('body').append("<div id='count' style='z-index:90000;position:fixed'></div>")




   function getStyle() {
        return {
            color: '#ffcc00',
            opacity: 0.4,
            stroke: '#000',
            fillOpacity: 1,
            weight: 8
        };
    }

var cData;
$.getJSON('/planets/js/locations.geojson', function(geoJson) {
    var map, markerLayer;
    function BuildImages() {
       $('#pictures').empty();
        markerLayer.setFilter(function(f) {
            f.properties['marker-symbol'] = 'marker'
            f.properties['marker-color'] = '#255697'
            if(f.properties['image'].length > 0 ){
                var n = f.properties,
                 d = new Date(n['arrivaltime']).toDateString(),
                $item = $('<div id="' + n['uid'] + '" class="item pad2" data-coords="' + f.geometry.coordinates + '">');

                $item.append('<h2>Sol '
                    + parseInt(n.startsol) + '</h2>');
console.log(n.endsol)
                $item.append(
                    '<a href="http://mars.jpl.nasa.gov/msl/multimedia/raw/test/?rawid=' 
                    + n.itemname 
                    + '"  target="_blank"><img src="' 
                    + n.image 
                    + '" class="full"/></a><p><a href="http://mars.jpl.nasa.gov/msl/multimedia/raw/test/?s='
                    + parseInt(n.startsol,10)

                    + '&camera=MAST_" target="_blank">All images from Sol '
                    + parseInt(n.startsol,10) 
                    + '</a></p>') || ''
                $item.append(
                    '<table><tbody>'
                    + '<tr><td>Arrival Time</td><td>' + d +'</td></tr>'
                     + '<tr><td>Contributor</td><td>' + n.contributor +'</td></tr>'
                    + '<tbody></table>');


                $('#pictures').append($item);
                return true;
            }
        });

        $('#pictures').scrollTo(0);

        var bounds = markerLayer.getBounds();
        map.fitBounds(bounds);

        // Re-init newspapers
        $('#pictures .item').on('mouseover',function(){
            var coords = $(this).data('coords').split(',');
            map.setView(new L.LatLng(coords[1],coords[0]),18);
        });
    }

    // ----------------------------------------------------------------------
    // When document is ready, start everything up

$(document).ready(function() {

    // Set up the map, set the zoom level, then add points from above array
    map = L.mapbox.map('map', 'herwig.mars-terrain,herwig.hirise-ortho,herwig.hirise-ortho-psp,herwig.curiosity-path-imagery', {
        minZoom: 8,
        maxZoom: 18,
    });
    map.setView([39, -90.7372], 13);
    $.getJSON('/planets/js/curiosity-path.geojson', function(geojson) {
    var layer = L.geoJson(geojson, {
        style: getStyle
       });
       map.addLayer(layer).fitBounds(layer.getBounds())
    });

    markerLayer = L.mapbox.markerLayer(geoJson).addTo(map);

    // Filter the map by the initial active year
    BuildImages();

    markerLayer.on('click', function(e) {
        e.layer.unbindPopup();
        var n = e.layer.feature.properties;
        $('#pictures').scrollTo('#' + n['uid'], 500 );
    });
});
})

