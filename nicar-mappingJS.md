## Mapping JS: Building narrative with geo data + CartoDB

Aurelia Moser, Map Scientist, [CartoDB](http://cartodb.com)
Workshop - NICAR Session [Link](http://ire.org/events-and-training/event/1494/1646/)

**March 6, 2015, 3:20PM-4:20PM**

Find this document here: 
Stackedit: <>
Gist: <https://github.com/auremoser/nicar-test/blob/master/nicar-mappingJS.md>

Find the code checkpoints here:

Github: <https://github.com/auremoser/nicar-test/>

![Atlanta Flag from Wikipedia](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/flag-ga.png)

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
	+ Quick map with `CreateVis` ([ckpt-1](https://github.com/auremoser/nicar-test/tree/master/ckpt-1-visjson))
	+ Custom map with `CreateLayer` ([ckpt-2](https://github.com/auremoser/nicar-test/tree/master/ckpt-2-createVis))
	+ Add SQL/CSS Templates [(ckpt-3](https://github.com/auremoser/nicar-test/tree/master/ckpt-3-createLayer))
	+ Add Interactivity - Buttons/ ([ckpt-4](https://github.com/auremoser/nicar-test/tree/master/ckpt-4-sqlcss)) 
	+ Infowindows ([ckpt-5]())
	+ Bonus: Add charts!
5. Building a Narrative
	+ Case Study: ATL - Onomatopeoia Map
	+ [CrashPop_Demo](http://bl.ocks.org/auremoser/)
	+ Tell Time/Stories: Odyssey + Torque
	+ Datatelling: Graphs + Charts
6. Wrap-Up and Resources

# Visualizing Data
![Types of Visualizations](https://raw.githubusercontent.com/auremoser/images/master/1-vis-types.png)

[**CartoDB**](cartodb.com) is a light open source library and graphical user interface application for hosting and visualizing geospatial data.

![Data import dialog](https://raw.githubusercontent.com/ohasselblad/workshops/master/img/common/data_import_dialog.png)

# Intro to CartoDB
## Examples
+ [Global Forest Watch](http://www.globalforestwatch.org/map/3/15.00/27.00/ALL/grayscale/loss,forestgain?begin=2001-01-01&end=2013-12-31&threshold=30)
+ [Urban Reviewer](http://www.urbanreviewer.org/#map=12/40.7400/-73.9998&sidebar=plans)

## Tour of the interface
![int-data](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/int-data.jpg)
![int-upload](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/int-upload.jpg)
![int-vis](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/int-vis.jpg)
![int-share](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/int-share.jpg)
## APIs / JS Libs
* [CartoJS](http://docs.cartodb.com/cartodb-platform/cartodb-js.html) - JS library for interacting with CartoDB
* [Maps API](http://docs.cartodb.com/cartodb-platform/maps-api.html) - generate public/private maps with data hosted on your CDB account
* [SQL API](http://docs.cartodb.com/cartodb-platform/sql-api.html) - run sql in your code that dynamically filters/affects/queries your mapped data stored in CartoDB
* [Import API](http://docs.cartodb.com/cartodb-platform/import-api.html) - CRUD files in your CartoDB Account

# Mapping Basics
## Setting Up Accounts
You can setup a _free_ student account today since we're all learning: <https://cartodb.com/signup?plan=academy>

IRE members are eligible for a free upgraded account that includes:

* more space
* private tables ([a Magellan account feature](http://cartodb.com/pricing))
* sync tables 

Email <cometdocs@ire.org> with your request for an upgraded CartoDB account and IRE member info, and we'll get you setup!

## Data Import
We're going to be building a visualization of traffic accidents in Georgia.

We'll be mapping crash/fatalities from motor accidents (c. 2006) and census population data (c. 2010 for a Crash/Pop map (what I've called an "onomatopoeia map," [just because](http://www.noisehelp.com/examples-of-onomatopoeia.html)).

![Problem](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/trafficTweet.png)

Traffic accidents are pretty common/available datasets, as is census information. We'll be building a choropleth of traffic accidents, resulting in fatality and crash/injury reports percapita.

## Datasets
You can download the datasets we'll be working with, and the files for the workshop here.

Description | Source | Download | Dropbox
------------ | ------------- | ------------
2010 Georgia Census Demographics | [Atlanta Regional Data](http://www.atlantaregional.com/info-center/2010-census)  | [pop_2010s](https://www.dropbox.com/s/6j6j5vt616yq2ek/atl_census_demo_2010.geojson?dl=1) | [pop_2010s](https://www.dropbox.com/s/6j6j5vt616yq2ek/atl_census_demo_2010.geojson?dl=0)
Traffic Fatality Data | [GA Office of Highway Safety](http://www.gahighwaysafety.org/research/data-by-county/)  | [crash_2006](https://www.dropbox.com/s/7rvrpkytll3bq1e/traffic_accidents.geojson?dl=1) | [crash_2006](https://www.dropbox.com/s/7rvrpkytll3bq1e/traffic_accidents.geojson?dl=0)

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
4. `GROUP BY` and `ORDER BY` are optional additions, you can read more about aggregate/other functions below

## Geocoding + SQL/PostGIS
There are two special columns in CartoDB:

1. `the_geom`
2. `the_geom_webmercator`

The first of these is in the units of standard latitude/longitude, while the second is a projection based on the [original Mercator projection](http://en.wikipedia.org/wiki/Mercator_projection) but [optimized for the web](http://en.wikipedia.org/wiki/Web_Mercator).

If you want to run SQL commands and see your map update, make sure to `SELECT` the `the_geom_webmercator` because this is the column that's used for mapping--the other is more of a convenience column since most datasets use lat/long.

This is a SQL statement and you can load it in your visualization tray as a way of querying and exploring your data with immediate visual output. In this case the Traffic Accident data is aliased to "ta" and the Atlanta Census data is aliased to "ac"/

```sql
SELECT ac.the_geom_webmercator, ta.county_name, 100000 * ta.number_injury / ac.population injuries_per_capita
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

* when you download the traffic data from source, it has county names but no polygon or geospatial reference. 
* [this dataset](https://www.dropbox.com/s/eyq2p1uzg2njifx/ga-counties.kml?dl=0) has polygon info for georgia counties, as well as a corresponding column of county names.
* you can load them both into cartodb, and select the "merge tables" button
* select `column` or `spatial` join

![joins](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/5-joins.png)
* select the columns that you want to join on, in this case, both datasets share a "county_name" column

![merge](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/5-merge.png)
* toggle the columns you want to exist in your new "joined" dataset

![mergGen](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/mergeGen.png)

## Customizing UI
Once you load both datasets, add them together as layers in the same visualization.

* navigate to your census data, select `Add layer`, create a visualization when prompted (titled something like `nicar-atl` or whatever you'd like)

![sql](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/0-wizard.png)

You have myriad customization options in the in-browser editor.

* `sql` lets you run sql and postgis functions across your data
* `wizard` lets you adjust the type, colors and fills in your map
* `infowindow` lets you creat hovers, tooltips with information from your datatables
* `css` allows you to customize the css and style of your map outside the wizard
* `legends` allows you to creat keys for your map
* `filters` allows you to filter the data without sql

You can also select and change your `basemaps` in the upper left corner of your map.

![Basemap options](https://raw.githubusercontent.com/ohasselblad/workshops/gh-pages/img/alaska/basemap_options.png)

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


## Quick map with `CreateVis`
#### Here's a reference point for this section: [ckpt-1](https://github.com/auremoser/nicar-test/tree/master/ckpt-1-visjson)

You will need:
+ datasets from above
+ visjson from your account, you can [reference mine](https://github.com/auremoser/nicar-test/blob/master/ckpt-1-visjson/vis.json) to find yours too.
+ Basic Text Editor
+ Browser

You can open HTML files on your hard drive from a browser. Use CMD+O or CTRL+O like you'd do to open a file in any program.
You can also run a little server by navigating to the folder where you will store your files and running `http-server &`; you have

###VisJson
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



[HTML template here](https://gist.github.com/auremoser/a57654e18ce06ab396d6)

## Custom map with `CreateLayer`
#### Here's a reference point for this section: [ckpt-2](https://github.com/auremoser/nicar-test/tree/master/ckpt-2-createVis)
 
## Add SQL/CSS Templates
#### Here's a reference point for this section: [ckpt-3](https://github.com/auremoser/nicar-test/tree/master/ckpt-3-createLayer)

## Add Interactivity - Buttons 
#### Here's a reference point for this section: [ckpt-4](https://github.com/auremoser/nicar-test/tree/master/ckpt-4-sqlcss)
 
	+ Infowindows ([ckpt-5]()
	+ Bonus: Add charts!
# Building Narrative

## Case Study: ATL - Onomatopeoia Map
[CrashPop_Demo](http://bl.ocks.org/auremoser/)

## Tell Time + Stories

**Maps that tell Time** - **[Torque](http://docs.cartodb.com/tutorials/introduction_torque.html)**

1. [Demonstrations in Brazil](http://blog.cartodb.com/mapping-the-world-ongoing-demonstrations-in-brazil/)
2. Tweets that mention [sunrise map](http://cartodb.s3.amazonaws.com/static_vizz/sunrise.html)
3. [Animal migration patterns](http://robbykraft.github.io/AnimalTrack/)
4. [Beyonce Album Release](https://srogers.cartodb.com/viz/337d9194-6458-11e3-85b5-e5e70547d141/embed_map)
5. [Diwali Celebrated](http://bl.ocks.org/anonymous/raw/b9b7c7d6de1c6398e435/)
6. [Ramadan Tweets w/OdysseyJS](http://bl.ocks.org/anonymous/raw/2f1e9a5a74ceeb88e977/)
	7. [Alcatraz Escapees](http://www.washingtonpost.com/news/morning-mix/wp/2014/12/15/the-alcatraz-escapees-could-have-survived-and-this-interactive-model-proves-it/?tid=hp_mm&hpid=z3)
	8. [Lynching and the Press](http://yale.cartodb.com/u/mdweaver/viz/ffd06ece-8545-11e4-a898-0e018d66dc29/embed_map)
	
**Maps that tell Stories** - **[Odyssey JS](http://cartodb.github.io/odyssey.js/index.html)**

1. [Tour of Scotland](http://alasdair.cartodb.com/viz/1332c872-a887-11e4-8c45-0e9d821ea90d/embed_map?zoom=14&center_lat=55.948595&center_lon=-3.199913)
2. [*Al Jazeera*: Israeli-Palestinian Conflict by Tweets](http://stream.aljazeera.com/projects/socialmediaconversation/)
3. [The Sounds of 11M](http://www.cadenaser.com/sonidos-11m/)
4. [Berlin Wall Historic Tour](http://bl.ocks.org/namessanti/raw/d5cf706f68b7c6dce9a3/#3)
5. [Maya Angelou Quotes](http://cartodb.com/v/maya-angelou#6)


## Talk Data in Charts
You can use CartoDB's SQL API to query your data and pull it into any charting library of your choosing.

Learn more about it [here](http://docs.cartodb.com/tips-and-tricks.html#charts--graphs)

Here are some examples:

Type | Title | Link/Demo | BlogPost
------------ | ------------- | ------------ 
[Highcharts](http://www.highcharts.com/) | Sensor Data  | [Github](https://github.com/auremoser/VitalSigns-water/) / [Demo](http://auremoser.github.io/VitalSigns-water/)  | [MOW Post](http://blog.cartodb.com/map-of-the-week-pulse-plotting/)
[Highcharts](http://www.highcharts.com/) | Weather Data | [Aurelia's Block](http://bl.ocks.org/auremoser/96b70f6dbcc724ecc973) | [Tutorial](https://stackedit.io/viewer#!provider=gist&gistId=e2d4f0f0b71f258f3ac9&filename=beirut.md)
[Chart.js](http://www.chartjs.org/) Line Graph | Tornado Data  | [Andrew's Block](http://bl.ocks.org/andrewxhill/9134155) 
[Chart.js](http://www.chartjs.org/) Bar Graph | Car Accidents Data| [Andy's Block](http://bl.ocks.org/ohasselblad/0320048cdba5b1c67903)
[Plot.ly](https://plot.ly/) | Earthquake Data  | [Plotly Tutorial](https://plot.ly/ipython-notebooks/cartodb/) | [CartoDB Blog](http://blog.cartodb.com/plotly/)

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


My contact: [aurelia@cartodb.com](mailto:aurelia@cartodb.com)

If you make a map you're proud of or just want to say hello, connect with me [@auremoser](https://twitter.com/auremoser)

![GA Traffice](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/seal-ga.jpg)
