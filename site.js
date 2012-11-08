$(function() {
    // Holds tilejson hashes for all layers.
    var layers = {};

    // Construct a url for a MapBox API tilejson request from a map id.
    var tileUrl = function(id) {
        return 'http://a.tiles.mapbox.com/v3/' + id + '.jsonp';
    }

    // Build map, returns function to update map.
    var buildMap = function(tilejson) {
        var map = new MM.Map('map',
        new wax.mm.connector(tilejson));
        map.setCenterZoom(new MM.Location(48.27,
            -4.33),
            3);
        if (tilejson.handle == 'hirise') {
			    map.setCenterZoom(new MM.Location(
			           -4.7270,137.4051),
			           11);
        };
        wax.mm.zoomer(map).appendTo(map.parent);

        // Interaction
        var interaction = wax.mm.interaction()
            .map(map)
            .tilejson(tilejson)
            .on(wax.tooltip().animate(true).parent(map.parent).events());

        // Legend
        var legend = wax.mm.legend(map, tilejson).appendTo(map.parent);

        // Update UI from map info
        var updateUI = function(tilejson) {
            $('#attribution').empty().append(tilejson.attribution);
			$('#more-data').children('.description').appendTo('.active');
            $('#layer-switcher li').removeClass('active');
			$('#more-data').empty();
            $('#layer-switcher li#' + tilejson.handle).addClass('active');
			$('.active').children('.description').appendTo('#more-data');
		};
        updateUI(tilejson);

        // Return handler for updating the map.
        return function(tilejson) {
            if (map.layers.length > 1) return;
            interaction && interaction.remove();
            $(map.layers[0].parent).css('z-index', 100);
            map.insertLayerAt(1, new wax.mm.connector(tilejson));
            $(map.layers[0].parent).fadeOut(500, function() {
                map.removeLayerAt(0);
            });

            interaction = wax.mm
                .interaction()
                .map(map)
                .tilejson(tilejson)
                .on(wax.tooltip().animate(true).parent(map.parent).events());
            if (legend) {
                $(legend.element()).css('opacity', 0);
                legend.content(tilejson);
                $(legend.element()).animate({opacity: 1}, 500);
            }
		    updateUI(tilejson);
        
			if (tilejson.handle == 'hirise') {
				    map.setCenterZoom(new MM.Location(
				           -4.7270,137.4051),
				           11);
	        };
        };
    };

    // Set up map and layerswitcher.
    $('#layer-switcher li').each(function(i, el) {
        wax.tilejson(tileUrl($('a', el).attr('data-layer')), function(tilejson) {
            tilejson.handle = $(el).attr('id');
            layers[tilejson.handle] = tilejson;
            if (i == 0) {
                var updateMap = buildMap(tilejson);
                $('#layer-switcher li .title').click(function() {;
                    updateMap(layers[$(this).parent().attr('id')]);
                   return false;

				});
            }
        });
    });

    // Map sharing.
    $('#share a').click(function() {
        var id = $('.active a').attr('data-layer');
        $('.share .tilejson textarea').empty().text(tileUrl(id));
        $('.share .embed textarea').empty().text(
            "<iframe style='background-color: #000' width='500' height='300' " +
            "frameBorder='0' src='http://a.tiles.mapbox.com/v3/" + id + ".html" +
            "#11,40.7010,-74.0137'></iframe>"
        );
        $('.modal.share').stop().fadeIn(100);
    });
    $('.modal .close').click(function() {
        $('.modal').stop().fadeOut(100);
    });
});