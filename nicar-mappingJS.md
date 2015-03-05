## Mapping JS: Building narrative with geo data + CartoDB

Aurelia Moser, Map Scientist, [CartoDB](http://cartodb.com)
Workshop - NICAR Session [Link](http://ire.org/events-and-training/event/1494/1646/)
**March 6, 2015, 3:20PM-4:20PM**

Find this document here: 
Stackedit: <>
Gist: <>

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
3. Mapping **Data** with Javascript
	+ Getting Geospatial Data
  	+ Data representation in CartoDB (SQL schema)
	+ Geocoding + SQL/PostGIS
	+ Customizing UI
4. Building a Map
	+ Quick map with `CreateVis` [ckpt-1]()
	+ Custom map with `CreateLayer` [ckpt-2]()
	+ Add Interactivity - SQL/CSS [ckpt-3]()
	+ Add Interactivity - Buttons/ [ckpt-4]() Infowindows [ckpt-5]()
	+ Bonus: Add charts!
5. Building a Narrative
	+ Case Study: ATL - Onomatopeoia Map
	+ [CrashPop_Demo](http://bl.ocks.org/auremoser/)
	+ Odyssey + Torque: Tell Time + Stories
	+ Graphs + Charts
6. Wrap-Up and Resources

# Visualizing Data
# Intro to CartoDB
# Mapping Basics
## Setting Up Accounts
You can setup a _free_ student account today since we're all learning: <https://cartodb.com/signup?plan=academy>

IRE members are eligible for a free upgraded account that includes:

* more space
* private tables (a Magellan account feature)
* sync tables 

Email <> with your request for an account and IRE member info, and we'll get you setup. 


## Data Import
## Datasets
You can download the datasets we'll be working with, and the files for the workshop here.


Description | Source | Download | Dropbox
------------ | ------------- | ------------
2010 Georgia Census Demographics | [Atlanta Regional Data](http://www.atlantaregional.com/info-center/2010-census)  | [pop_2010s](https://www.dropbox.com/s/6j6j5vt616yq2ek/atl_census_demo_2010.geojson?dl=1) | [pop_2010s](https://www.dropbox.com/s/6j6j5vt616yq2ek/atl_census_demo_2010.geojson?dl=0)
Traffic Fatality Data | [GA Office of Highway Safety](http://www.gahighwaysafety.org/research/data-by-county/)  | [crash_2006](https://www.dropbox.com/s/7rvrpkytll3bq1e/traffic_accidents.geojson?dl=1) | [crash_2006](https://www.dropbox.com/s/7rvrpkytll3bq1e/traffic_accidents.geojson?dl=0)

# Mapping Data with JS
# Mapping Process
# Building Narrative
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

My contact: [aurelia@cartodb.com](mailto:aurelia@cartodb.com)

If you make a map you're proud of or just want to say hello, connect with me [@auremoser](https://twitter.com/auremoser)

![GA Traffice](https://raw.githubusercontent.com/auremoser/nicar-test/master/img/seal-ga.jpg)
