###STEP 5 INTERACTIVITY - infowindows

** add script **
`<script type="infowindow/html" id="infowindow_template">
  <div class="cartodb-popup">
    <a href="#close" class="cartodb-popup-close-button close">x</a>
     <div class="cartodb-popup-content-wrapper">
       <div class="cartodb-popup-header">
         <img style="width: 100%" src="http://cartodb.com/assets/logos/logos_full_cartodb_light-5ef5e4ff558f4f8d178ab2c8faa231c1.png"></src>
       </div>
       <div class="cartodb-popup-content">
         <!-- content.data contains the field info -->
         <h4>County: </h4>
         <p></p>
       </div>
     </div>
     <div class="cartodb-popup-tip-container"></div>
  </div>
</script>`

####################################

** add to `sublayerOptions`**

interactivity: 'cartodb_id, county_name'

####################################
** after sublayer[0].set(...) **

sublayers[0].infowindow.set('template', $('#infowindow_template').html());