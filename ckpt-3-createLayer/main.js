window.onload = function () {
  //
   var layerSource = 'http://documentation.cartodb.com/api/v2/viz/ed78c85e-c11b-11e4-ab66-0e853d047bba/viz.json'; // add your url ID here between viz/ and /viz.json

   var options = {
       sql: "SELECT * FROM traffic_accidents",
       cartocss: "#traffic_accidents{polygon-fill:#229A00;polygon-opacity: 0.7;line-color: #FFF;line-width: 1;line-opacity: 1;}"
   }

   var sublayers = [];

   // instantiate map object from Leaflet
   var mapObj = new L.Map(map, {  // <-- Replace map_id with your #id for rendering
       center: [31.7550, -84.3900], // Atlanta, Georgia
       zoom: 7 // zoom projection to adjust starting point zoom
   });

   // add basemap tiles
   L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
       attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
   }).addTo(mapObj);

   // add data tile layer
   cartodb.createLayer(mapObj,layerSource)
       .addTo(mapObj)
       .done(function(layer) {
           console.log("Map successfully created.");
           sublayers[0] = layer.getSubLayer(0);
           sublayers[1] = layer.getSubLayer(1);
           sublayers[1].set(options); // altering the SQL and CartoCSS; see above
           sublayers[0].hide(); // hiding the traffic data
       })
       .error(function(err) {
           console.log("Map not created: " + err);
       });
}
