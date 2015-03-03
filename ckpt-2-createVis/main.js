window.onload = function() {
    var vizjson_url = 'http://documentation.cartodb.com/api/v2/viz/ed78c85e-c11b-11e4-ab66-0e853d047bba/viz.json'; // <-- Paste viz.json URL between quotes

    cartodb.createVis(map, vizjson_url) // <-- Change map_id to 'map'
        .done(function(vis, layers) {
            // do stuff
            console.log("Map successfully created");
        })
        .error(function(err) {
            // report error
            console.log("An error occurred: " + err);
        });
}