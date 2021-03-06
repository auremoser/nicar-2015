## Mapping JS: Building narrative with geo data + CartoDB

Aurelia Moser, Map Scientist, [CartoDB](http://cartodb.com)
Workshop - NICAR Session [Link](http://ire.org/events-and-training/event/1494/1646/)

**March 6, 2015, 3:20PM-4:20PM**

Find this document here:

* Stackedit: <http://bit.ly/1BMad7n>
* Gist: <http://bit.ly/1BciteV>

Find the code checkpoints here:

* Github: <https://github.com/auremoser/nicar-2015>

![Georgia State Flag from Wikipedia](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/flag-ga.png)

# Outline
0. Visualizing Data
	+ Why Maps?
1. Introduction to CartoDB
	+ Examples
	+ Tour of the interface
	+ APIs / JS Libs
2. Mapping **Basics**
	+ Setting up accounts!
  	+ Data import
	+ Datasets
3. Mapping **Data**
	+ Getting Geospatial Data
  	+ Data representation in CartoDB (SQL schema)
	+ Geocoding + SQL/PostGIS
	+ Merging Tables
	+ Customizing UI
4. Building a Map
  + Basics of `VisJson` ([ckpt-1](https://github.com/auremoser/nicar-test/tree/master/ckpt-1-visjson))
	+ Quick map with `CreateVis` ([ckpt-2](https://github.com/auremoser/nicar-test/tree/master/ckpt-2-createVis))
	+ Custom map with `CreateLayer` [(ckpt-3](https://github.com/auremoser/nicar-test/tree/master/ckpt-3-createLayer))
	+ Add SQL/CSS Templates ([ckpt-4](https://github.com/auremoser/nicar-test/tree/master/ckpt-4-sqlcss))
	+ Add Interactivity - Buttons ([ckpt-5](https://github.com/auremoser/nicar-2015/tree/master/ckpt-5-buttons))
	+ Infowindows ([ckpt-6](https://github.com/auremoser/nicar-2015/tree/master/ckpt-6-info))
  + BONUS: Charts ([ckpt-7](https://github.com/auremoser/nicar-2015/tree/master/ckpt-7-chart))
5. Building a Narrative
	+ Case Study: GA - Onomatopeoia Map
	+ [CrashPop_Demo](http://bl.ocks.org/auremoser/a90356af6669ccdc11ae)
	+ Tell Time/Stories: Odyssey + Torque
	+ Datatelling: Graphs + Charts
6. Wrap-Up and Resources

# Visualizing Data
![Types of Visualizations](https://raw.githubusercontent.com/auremoser/images/master/1-vis-types.png)

Source: [The Data Visualization Catalogue](http://www.datavizcatalogue.com/).

![PeriodicTable](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/periodic.png)

Source: [Periodic Table of Visualizations](http://www.visual-literacy.org/periodic_table/periodic_table.html)

[**CartoDB**](cartodb.com) is a light open source library and graphical user interface application for hosting and visualizing geospatial data.

![Data import dialog](https://raw.githubusercontent.com/ohasselblad/workshops/master/img/common/data_import_dialog.png)

# Intro to CartoDB
## Examples
+ [Alcatraz Escape Revisited](http://www.washingtonpost.com/news/morning-mix/wp/2014/12/15/the-alcatraz-escapees-could-have-survived-and-this-interactive-model-proves-it/)
+ [LA Sheriff Election Results](http://graphics.latimes.com/2014-la-sheriff-primary-map/)
+ [Starwars Galaxy Map](http://www.swgalaxymap.com/)
+ [Demonstrations in Brazil](http://blog.cartodb.com/mapping-the-world-ongoing-demonstrations-in-brazil/)
+ [Global Forest Watch](http://www.globalforestwatch.org/map/3/15.00/27.00/ALL/grayscale/loss,forestgain?begin=2001-01-01&end=2013-12-31&threshold=30)
+ [Urban Reviewer](http://www.urbanreviewer.org/#map=12/40.7400/-73.9998&sidebar=plans)

![globalForestWatch](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/globalforest.png)

![urban-reviewer](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/urban_reviewer_code_example.png)

## Tour of the interface
![int-data](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/int-data.jpg)
![int-upload](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/int-upload.jpg)
![int-vis](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/int-viz.jpg)
![int-share](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/int-share.jpg)
## APIs / JS Libs
You can read more about the [CartoDB APIs and JS Library here](http://docs.cartodb.com/cartodb-platform.html)
* [CartoJS](http://docs.cartodb.com/cartodb-platform/cartodb-js.html) - JS library for interacting with CartoDB
* [Maps API](http://docs.cartodb.com/cartodb-platform/maps-api.html) - generate public/private maps with data hosted on your CDB account
* [SQL API](http://docs.cartodb.com/cartodb-platform/sql-api.html) - run sql in your code that dynamically filters/affects/queries your mapped data stored in CartoDB
* [Import API](http://docs.cartodb.com/cartodb-platform/import-api.html) - CRUD files in your CartoDB Account

# Mapping Basics
## Setting Up Accounts
You can setup a _free_ student account today since we're all learning: <https://cartodb.com/signup?plan=academy>

![ire](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/ire.png)

IRE members are eligible for a free upgraded account that includes:

* more space
* private tables ([a Magellan account feature](http://cartodb.com/pricing))
* sync tables

Email cartodb@ire.org with your request for an upgraded account and membership ID, and we'll set you up.

## Data Import
We're going to be building a visualization of traffic accidents in Georgia.

![countychoropleth](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/2-countyChoro.png)

We'll be mapping crash/fatalities from motor accidents (c. 2006) and census population data (c. 2010) for a Crash/Pop map (what I've called an "onomatopoeia map," [just because](http://www.noisehelp.com/examples-of-onomatopoeia.html)).

![Problem](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/trafficTweet.png)

Traffic accidents are pretty common/available datasets, as is census information. We'll be building a choropleth of traffic accidents, resulting in fatality and crash/injury reports percapita.

## Datasets
You can download the datasets we'll be working with, and the files for the workshop here.

Description | Source | Download | Dropbox
---------- | -------- | -------- | ---------
2010 Georgia Census Demographics | [Atlanta Regional Data](http://www.atlantaregional.com/info-center/2010-census)  | [pop_2010](https://www.dropbox.com/s/6j6j5vt616yq2ek/atl_census_demo_2010.geojson?dl=1) | [pop_2010](https://www.dropbox.com/s/6j6j5vt616yq2ek/atl_census_demo_2010.geojson?dl=0)
Traffic Fatality Data | [GA Office of Highway Safety](http://www.gahighwaysafety.org/research/data-by-county/)  | [crash_2006](https://www.dropbox.com/s/7rvrpkytll3bq1e/traffic_accidents.geojson?dl=1) | [crash_2006](https://www.dropbox.com/s/7rvrpkytll3bq1e/traffic_accidents.geojson?dl=0)

![trafficData](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/4-trafficData.png)

# Mapping Data
## Getting Geospatial Data

**Geospatial data** is info that ids a geolocation and its characteristic features/frontiers, typically represented by points, lines, polygons, and/or complex geographic features.

### Issues:
+ Comes in multiple formats ([supported formats for CartoDB](http://docs.cartodb.com/cartodb-editor.html#supported-file-formats))
+ Sources uncertain
+ Contains errors
+ etc.

Downloading the [Traffic Data](http://www.gahighwaysafety.org/research/data-by-county/) and the [Census Data](http://www.atlantaregional.com/info-center/2010-census) requires some finessing.

### Data Check:

* check the source and update date of your data
* remove headers/extra columns (in Excel or Open Refine)
* import the csv/geojson and auto-geocoding via carto
* correct column names to more intelligible terms
* correct datatypes
* do any preliminary sql or filtering that suits

![correctDatatypes](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/6-datatypes.png)

The sets I've prepared should give you "cleaner" data. Here are the fields, or columns, we'll be focusing on:

* **Georgia Census Data** - names of counties and population counts
* **Georgia Traffic Data** - names of counties, crash counts, fatality counts (injury counts are also available)

Here is what it might look like when you upload your data:

![Geocoding](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/1-geocoding.png)

## Data representation in CartoDB (SQL schema)
The most basic SQL statement is:

```sql
SELECT * FROM table_name
```

The * means everything. This means that all rows and columns from the table are given back once the query is run.

A more detailed query is like this:

```sql
SELECT
  name,
  height,
  age
FROM
  class_list
WHERE
  name = 'Aure'
  AND (
    height > 1.2
    OR
    height < 1.9
  )
```

1. `SELECT` is what you're requesting (required)
2. `FROM` is where the data is located (required)
3. `WHERE` is the filter on the data you're requesting (optional)
4. `GROUP BY` and `ORDER BY` are optional additions, you can read more about aggregate/other functions below.

## Geocoding + SQL/PostGIS
There are two special columns in CartoDB:

1. `the_geom`
2. `the_geom_webmercator`

The first of these is in the units of standard latitude/longitude, while the second is a projection based on the [original Mercator projection](http://en.wikipedia.org/wiki/Mercator_projection) but [optimized for the web](http://en.wikipedia.org/wiki/Web_Mercator).

If you want to run SQL commands and see your map update, make sure to `SELECT` the `the_geom_webmercator` because this is the column that's used for mapping--the other is more of a convenience column since most datasets use lat/long.

This is a SQL statement and you can load it in your visualization tray as a way of querying and exploring your data with immediate visual output. In this case the Traffic Accident data is aliased to "ta" and the Atlanta Census data is aliased to "ac".

```sql
SELECT ac.the_geom_webmercator, ta.county_name, 100000 * ta.number_fatality / ac.population fatalities_per_capita
      FROM
        traffic_accidents ta, atl_census_demo_2010 ac
      WHERE ac.county_name = ta.county_name
```

This is a query that adds some more information from the sample, to include percapita counts of the fatality and crash data available in your datasets.

![sql](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/0-sql.png)

You can enter queries, apply them, click on "create table from query" in the green field below the column names.

## Merging Tables
Joining and merging tables to make one dataset is a common need. Say you have two datasets related to the same place/map and need to combine them so that they can share the same geometry.

You can do this in SQL [read more here](http://docs.cartodb.com/tutorials/merging_data.html), but CartoDB also has an in-editor button for that.

![mergeButton](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/5-mergeButton.png)

Here is a usecase relative to these datasets:

* when you download the traffic data from source, it has county names but no polygon or geospatial reference
* [this dataset](https://www.dropbox.com/s/eyq2p1uzg2njifx/ga-counties.kml?dl=0) has polygon info for georgia counties, as well as a corresponding column of county names
* you can load them both into cartodb, and select the "merge tables" button
* select `column` or `spatial` join

![joins](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/5-joins.png)

* select the columns that you want to join on, in this case, both datasets share a "county_name" column

![merge](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/5-merge.png)

* toggle the columns you want to exist in your new "joined" dataset

![mergGen](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/5-mergeGen.png)

## Customizing UI
Once you load both datasets, add them together as layers in the same visualization.

Navigate to your census data, select `Add layer`, create a visualization when prompted (titled something like `nicar-atl` or whatever you'd like).

![sql](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/0-wizard.png)

You have myriad customization options in the in-browser editor.

![editor customizations](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/7-editorCustom.png)

* `sql` - run sql and postgis functions across your data
* `wizard` - adjust the type, colors and fills in your map
* `infowindow` - create hovers, tooltips with information from your datatables
* `css` - customize the css and style of your map outside the wizard
* `legends` - create keys for your map
* `filters` - filter the data without sql

You can also select and change your `basemaps` in the upper left corner of your map.

![basemap-options](https://raw.githubusercontent.com/ohasselblad/workshops/gh-pages/img/alaska/basemap_options.png)

All of these options can be cloned in javascript!

# Building a Map
You can build any type of visualization that suits your data.

#### Types of visualizations
+ **Simple** -- most basic visualization
+ **Cluster** -- counts number of points within a certain binned region
+ **Choropleth** -- makes a histogram of your data and gives bins different colors depending on the color ramp chosen
+ **Category** -- color data based on unique category (works best for a handful of unique types)
+ **Bubble** -- size markers based on column values
+ **Intensity** -- colors by density
+ **Density** -- data aggregated by number of points within a hexagon
+ **Torque** -- temporal visualization of data (categorical and heatmap versions)

Check out [visualization documentation](http://docs.cartodb.com/cartodb-editor.html#wizards) for more.

#### Choropleth
We'll be making choropleths because we have county-level polygon data for Georgia.

Choropleth maps show map elements colored according to where a value associated with the map element falls in a range. It's like a histogram where each bin is colored differently according to a color scale you pick.

* **_Quantification_** is an option to pay attention to since it controls how the data is binned into different colors.
* **_Equal interval_** gives bins of equal size across the range,  which means that outliers stand out.
* **_Quantile_** bins so that each quantile has approximately the same number of values.

Once you load your data, you can play with the editor options to see what type of visualization you might light to make. You can make a `population` choropleth for example, using the `population` data from your census table.

![population](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/3-population.png)

## Quick map with `CreateVis`
#### Here's a reference point for this section: [ckpt-1](https://github.com/auremoser/nicar-test/tree/master/ckpt-1-visjson)

You will need:
+ datasets from above
+ visjson from your account, you can [reference mine](https://github.com/auremoser/nicar-test/blob/master/ckpt-1-visjson/vis.json) to find yours too.
+ Basic Text Editor
+ Browser

#### Running Locally
* You can open HTML files on your hard drive from a browser. Use CMD+O or CTRL+O like you'd do to open a file in any program.
* You can also run a little server by navigating to the folder where you will store your files and running `http-server &`; you have node installed with http-server setup!

###VisJson

![Share-vizualization](http://i.imgur.com/gVxeNMg.png)

The viz.json file is the main source of data for CartoDB JavaScript functions (createVis and createLayer) for creating visualizations in the browser.

![visjson](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/1-visJson.png)

* Structure of file: JSON
* Defines how to access data: listing servers, subdomains, etc.
* Most important for developers is the `layers` array because it explicitly shows the structure of how visualizations are put together
    * Defines base maps, if applicable, as `layers[0]`
    * CartoDB data layer is `layers[1]`, may consist of multiple sublayers
        * Defines infowindows, which we'll cover in this workshop
        * Defines data accessed by using a SQL statement
        * Defines styling for tile layers, if applicable
        * Defines interactivity (what data shows up on layer events)
        * `layer_name` is the also the name of table where data comes from in the account with key `user_name`

You can view it by opening a text editor and loading the file, or downloading a JSON viewer extension for inbrowser views ([Chrome](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en) or [Firefox](https://addons.mozilla.org/en-us/firefox/addon/jsonview/)).

![createVisPreview](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/3-createVis.png)

### Creating Basic Visualization in JavaScript

Copy &amp; paste template from [here](https://gist.github.com/auremoser/a57654e18ce06ab396d6).

Overview of template:

1. Included JavaScript libraries and CSS file
2. `map` element
3. `<script>` tags

Create basic visualization using `createVis` by copying and pasting the following either between script tags in your html or by making a file called `[?].js` (I used `main.js` in the template) and referencing it between your script tags:

```js
window.onload = function() {
    var vizjson_url = ''; // <-- Paste viz.json URL between quotes

    cartodb.createVis(map_id, vizjson_url) // <-- Change map_id to 'map'
        .done(function(vis, layers) {
            // do stuff
            console.log("Map successfully created");
        })
        .error(function(err) {
            // report error
            console.log("An error occurred: " + err);
        });
}
```

`createVis` is excellent for creating maps quickly with very little code. There is a lot of customization with it as well. The documentation is [here](http://docs.cartodb.com/cartodb-platform/cartodb-js.html#visualization).

![createVis](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/0-ckpt-createVis.png)

**Edit the fields to match your map reload your browser window, your map should work.**

## Custom map with `CreateLayer`
#### Here's a reference point for this section: [ckpt-2](https://github.com/auremoser/nicar-test/tree/master/ckpt-2-createVis)

![createLayer](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/9-createLayer.png)

`createLayer` is the other main method for bring maps to your browser.

The following is the basic createLayer structure (depends on [Leaflet.js](http://leafletjs.com/)):

```javascript
window.onload = function () {
  //
   var layerSource = 'http://documentation.cartodb.com/api/v2/viz/ed78c85e-c11b-11e4-ab66-0e853d047bba/viz.json'; // add your url ID here between viz/ and /viz.json

   var options = {
       sql: "SELECT * FROM atl_census_demo_2010",
       cartocss: "#atl_census_demo_2010{polygon-fill:#0fa59f;}"
   }

   var sublayers = [];

   // instantiate map object from Leaflet
   var mapObj = new L.Map(map, {  // <-- use your map #id for rendering
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
           sublayers[0].set(options); // altering the SQL and CartoCSS; see above
           sublayers[1].hide(); // hiding the traffic data
       })
       .error(function(err) {
           console.log("Map not created: " + err);
       });
}
```
One big difference here is that we explicitly expose the SQL and CartoCSS, allowing for easy customization.

![createLayer](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/0-ckpt-createLayer.png)

**Edit the fields to match your map reload your browser window, your map should work.**

## Add SQL/CSS Templates
#### Here's a reference point for this section: [ckpt-3](https://github.com/auremoser/nicar-test/tree/master/ckpt-3-createLayer)

**New goal:** We'll create an interactive map that allows us to toggle between the basic view and the view of crashes per county per capita.

To accomplish this, we need to know how many crashes happened per neighborhood, then divide that number by the population of the neighborhood.

You can do this a number of ways, we'll be using SQL, you can read documentation on available function magic in the [PostGIS docs](http://postgis.net/docs/) and otherwise just follow along.

Going back to the `createLayer` example we just made:

* Copy the following SQL into your index.html file below the `<style>` tags.

```sql
<script type='sql/text' id='sql'>
      SELECT ac.the_geom_webmercator, ac.population, ta.county_name, ceil(100000 * ta. number_crash / ac. population) crashes_per_capita, ceil(100000 * ta.number_fatality / ac.population) fatalities_per_capita
      FROM
        traffic_accidents ta, atl_census_demo_2010 ac
      WHERE ac.county_name = ta.county_name
</script>
```

* Paste the following CartoCSS structure in the `<head>` section of your webpage.
* This is a pre-configured Choropleth style. You could also create one on the fly by calculating the range in data and creating bins within that range.

```css
<style type='cartocss/text' id='choropleth'>
    /** choropleth visualization */
    #atl_census_demo_2010{
      polygon-fill: #F1E6F1;
      polygon-opacity: 0.8;
      line-color: #FFF;
      line-width: 0.5;
      line-opacity: 1;
    }
    #atl_census_demo_2010 [ fatalities_per_capita <= 116.48223645894] {
       polygon-fill: #8A4E8A;
    }
    #atl_census_demo_2010 [ fatalities_per_capita <= 43.4522839606757] {
       polygon-fill: #A05AA0;
    }
    #atl_census_demo_2010 [ fatalities_per_capita <= 34.5685840707965] {
       polygon-fill: #B379B3;
    }
    #atl_census_demo_2010 [ fatalities_per_capita <= 27.2727272727273] {
       polygon-fill: #C08FC0;
    }
    #atl_census_demo_2010 [ fatalities_per_capita <= 21.2074084546868] {
       polygon-fill: #CCA5CC;
    }
    #atl_census_demo_2010 [ fatalities_per_capita <= 16.7128259001051] {
       polygon-fill: #D8BBD8;
    }
    #atl_census_demo_2010 [ fatalities_per_capita <= 12.3350191192796] {
       polygon-fill: #F1E6F1;
    }
</style>
```

* Next replace the string for `sql in the options object with

```javascript
$("#sql").text(),
```

(don't forget the comma!), and the string after `cartocss` with

```javascript
$("#choropleth").text()
```

These two pieces of code are just a jQuery operation that finds the HTML element that has an `id` of `sql` or `cartocss` and extracts the text contained within it.

* add a sublayer reference to your data tile layer function at the end of your js:

`sublayers[0].set(options); // altering the SQL and CartoCSS; see above`

Check [the checkpoint code](https://github.com/auremoser/nicar-test/tree/master/ckpt-4-sqlcss) here if you're stuck. You can also run the SQL in the tray (not in the your local files) and the the map will populate. The advantage to adding it as a template, is that you can swap it for other SQL or run different queries with different template references locally, and you are not limited to one query option.

![createButtons](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/0-ckpt-sqlcss.png)

**Reload your browser window, your map should work!**


## Add Interactivity - Buttons
#### Here's a reference point for this section: [ckpt-4](https://github.com/auremoser/nicar-test/tree/master/ckpt-4-sqlcss)

To add more interactivity, we'll create two buttons to toggle between the `Simple` map view and the view that gives a choropleth map. We can easily do this in CartoDB by using the `sublayer.setSQL()` and `sublayer.setCartoCSS()` methods to change the data.

First, create another `<style type="cartocss/text" id="simple">` tag set with the following CartoCSS style. Make sure the `id` is set to `simple`

```css
      /** simple visualization */
      #atl_census_demo_2010{
        polygon-fill: #0fa59f;
        polygon-opacity: 0.7;
        line-color: #FFF;
        line-width: 1;
        line-opacity: 1;
    }
```

* Next, let's create some buttons. Put the following snippet below the `div` with an `id='map'`.

```html
<div id="cartocss" class="layer_selector">
        <p>Buttons</p>
        <ul>
            <li data="choropleth">Fatality Choropleth Per Capita</li>
            <li data="simple">Simple County Map</li>
        </ul>
</div>
```

* Wire up the buttons with click events:

```js
function createSelector(layer) {
      var cartocss = "";
      var $options = $(".layer_selector").find("li");
      $options.click(function(e) {
          var $li = $(e.target);
          var selected = $li.attr('data');

          $options.removeClass('selected');
          $li.addClass('selected');

          cartocss = $('#'+selected).text();

          layer[0].setCartoCSS(cartocss);
      });
   }
```

![sqlcss](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/0-ckpt-buttons.png)

Examples:

![quake-sample](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/quakes.png)

+ [JSFiddle with Selectors](http://jsfiddle.net/gh/get/library/pure/CartoDB/academy/tree/master/t/03-cartodbjs-ground-up/lesson-3/jsfiddle_demo_cartocss)
+ [Interactivity tutorial](http://docs.cartodb.com/tutorials/custom_interactivity.html)
+ [Advanced example](http://byndhack.herokuapp.com/)


## Infowindows + More
#### Here's a reference point for this section [ckpt-5](https://github.com/auremoser/nicar-2015/tree/master/ckpt-6-info)

### Adding infowindows in Editor
You can enable hover infowindows in your editor, that will port to your map and give you some choropleth context.

![infowindows](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/8-editorInfowindow2.png)

* customization in html/css
* all data in your table is available to you to populate the tooltips

### Adding infowindows in JS
* HTML templates
    * Handlebar notation
    * Customizing display of information
    * Pulling in images

```html
<script type="infowindow/html" id="infowindow_template">
  <div class="cartodb-popup">
    <a href="#close" class="cartodb-popup-close-button close">x</a>
     <div class="cartodb-popup-content-wrapper">
       <div class="cartodb-popup-header">
         <img style="width: 100%" src="http://cartodb.com/assets/logos/logos_full_cartodb_light-5ef5e4ff558f4f8d178ab2c8faa231c1.png"></src>
       </div>
       <div class="cartodb-popup-content">
         <!-- content.data contains the field info -->
         <h4>County: </h4>
         <p>{{content.data.county_name}}</p>
       </div>
     </div>
     <div class="cartodb-popup-tip-container"></div>
  </div>
</script>
```

Then add this to the `options`:
```javascript
interactivity: 'cartodb_id, county_name'
```

After `sublayers[0].set(...)`, add this:

```javascript
sublayers[0].infowindow.set('template', $('#infowindow_template').html());
```

* Click events
    * On hover
    * On click

You can build on this, or checkout the demo block here to view the result of your work with some limited interactivity!

### Final project here: [Onomatopoeia (Crash/Pop) Map](http://bl.ocks.org/auremoser/a90356af6669ccdc11ae)

![info](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/0-ckpt-info.png)

# Building Narrative
Outside of the CartoJS library, we have others to help you build dynamic narrative with your data.

## Tell Time + Stories

**Maps that tell Time** - **[Torque](http://docs.cartodb.com/tutorials/introduction_torque.html)**

<iframe src="https://srogers.cartodb.com/viz/337d9194-6458-11e3-85b5-e5e70547d141/embed_map" width="100%" height="500px"></iframe>

1. [Demonstrations in Brazil](http://blog.cartodb.com/mapping-the-world-ongoing-demonstrations-in-brazil/)
2. Tweets that mention [sunrise map](http://cartodb.s3.amazonaws.com/static_vizz/sunrise.html)
3. [Animal migration patterns](http://robbykraft.github.io/AnimalTrack/)
4. [Beyonce Album Release](https://srogers.cartodb.com/viz/337d9194-6458-11e3-85b5-e5e70547d141/embed_map)
5. [Diwali Celebrated](http://bl.ocks.org/anonymous/raw/b9b7c7d6de1c6398e435/)
6. [Ramadan Tweets w/OdysseyJS](http://bl.ocks.org/anonymous/raw/2f1e9a5a74ceeb88e977/)
7. [Alcatraz Escapees](http://www.washingtonpost.com/news/morning-mix/wp/2014/12/15/the-alcatraz-escapees-could-have-survived-and-this-interactive-model-proves-it/?tid=hp_mm&hpid=z3)
8. [Lynching and the Press](http://yale.cartodb.com/u/mdweaver/viz/ffd06ece-8545-11e4-a898-0e018d66dc29/embed_map)

![Twitter Import](http://i.imgur.com/d3GSSYQ.gif)

**Maps that tell Stories** - **[Odyssey JS](http://cartodb.github.io/odyssey.js/index.html)**

1. [Tour of Scotland](http://alasdair.cartodb.com/viz/1332c872-a887-11e4-8c45-0e9d821ea90d/embed_map?zoom=14&center_lat=55.948595&center_lon=-3.199913)
2. [*Al Jazeera*: Israeli-Palestinian Conflict by Tweets](http://stream.aljazeera.com/projects/socialmediaconversation/)
3. [The Sounds of 11M](http://www.cadenaser.com/sonidos-11m/)
4. [Berlin Wall Historic Tour](http://bl.ocks.org/namessanti/raw/d5cf706f68b7c6dce9a3/#3)
5. [Maya Angelou Quotes](http://cartodb.com/v/maya-angelou#6)


## Talk Data in Charts
You can use CartoDB's SQL API to query your data and pull it into any charting library of your choosing.

You can easily wire up a chart of county-level traffic fatalities, [check the code here](http://bl.ocks.org/auremoser/af95a29cd76267d3925e).

![Chart-by-County](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/chartjs.png)

Learn more about it [here](http://docs.cartodb.com/tips-and-tricks.html#charts--graphs)!

Here are some examples:

Type | Title | Link/Demo | BlogPost
---- |------ | --------- | ---------
[Chart.js](http://www.chartjs.org/) Bar Graph | Traffic Data| [Aurelia's Block](http://bl.ocks.org/auremoser/af95a29cd76267d3925e)
[Highcharts](http://www.highcharts.com/) | Sensor Data  | [Github](https://github.com/auremoser/VitalSigns-water/) / [Demo](http://auremoser.github.io/VitalSigns-water/)  | [MOW Post](http://blog.cartodb.com/map-of-the-week-pulse-plotting/)
[Highcharts](http://www.highcharts.com/) | Weather Data | [Aurelia's Block](http://bl.ocks.org/auremoser/96b70f6dbcc724ecc973) | [Tutorial](https://stackedit.io/viewer#!provider=gist&gistId=e2d4f0f0b71f258f3ac9&filename=beirut.md)
[Chart.js](http://www.chartjs.org/) Line Graph | Tornado Data  | [Andrew's Block](http://bl.ocks.org/andrewxhill/9134155)
[Plot.ly](https://plot.ly/) | Earthquake Data  | [Plotly Tutorial](https://plot.ly/ipython-notebooks/cartodb/) | [CartoDB Blog](http://blog.cartodb.com/plotly/)

### More
* `sql.execute(SQL command)` to extract data from your account, place into charts, infowindows, etc.
    * Using [Chart.js](http://bl.ocks.org/andrewxhill/9134155)
* `sql.getBounds(SQL command)` to find the bounding box of data returned by SQL command
    * [Porpoise Map](http://robbykraft.github.io/AnimalTrack/)

# Resources
##CartoDB
1. [Map Academy](http://academy.cartodb.com)
    + [CartoDB.js](http://academy.cartodb.com/courses/03-cartodbjs-ground-up/lesson-3.html) -- build a web app to visualize your data, allowing for user interaction
	+ [SQL and PostGIS](http://academy.cartodb.com/courses/04-sql-postgis.html)
2. [CartoDB Tutorials](http://docs.cartodb.com/tutorials.html)
3. [CartoDB Editor Documentation](http://docs.cartodb.com/cartodb-editor.html)
4. [CartoDB APIs](http://docs.cartodb.com/cartodb-platform.html)
5. [Community help on StackExchange](http://gis.stackexchange.com/questions/tagged/cartodb)
6. [CartoDB Map Gallery](http://cartodb.com/gallery/)

##Data
1. [GIS Layer Data for Georgia](http://gis.atlantaga.gov/apps/gislayers/)
	* Tax Allocation Districts
	* Public vs. Private School distribution
	* Development districts
	Watershed management
	* Bike and Transport Data
2. [ARC Census Data](http://arc.garc.opendata.arcgis.com/datasets/f37c6a6c451447f8af2693f736cd9044_12)
3. [Georgia County Polygons](http://arc.garc.opendata.arcgis.com/datasets/dc20713282734a73abe990995de40497_68)

##Visualization
1. [Charting Tools Repository](https://github.com/auremoser/chart-tools)
2. [Workshops @CartoDB](http://cartodb.github.io/training/)
3. [Recommended tools for visualizations](http://selection.datavisualization.ch/)
4. [Perception concerns](https://github.com/tmcw/perception)
5. [Colorbrewer](http://colorbrewer2.org/) or [Geocolor](http://geocolor.io/)


My contact: [aurelia@cartodb.com](mailto:aurelia@cartodb.com)

If you make a map you're proud of or just want to say hello, connect with me [@auremoser](https://twitter.com/auremoser)

![GA-Seal](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/seal-ga.jpg)
