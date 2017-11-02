<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="http://openlayers.org/en/v3.10.1/css/ol.css" type="text/css">
<script src="http://openlayers.org/en/v3.10.1/build/ol.js" type="text/javascript"></script>
<title>openlayer sample </title> 

</head>
 <body>
 
<div id="map" style="width: 100%, height: 400px"></div>
<script>
var map = new ol.Map({target: 'map});
    </script>
    
    map.setView(new ol.View({
    center: [0,0],
    zoom: 2
    }));
    
    var osmSourve = new ol.source.OSM();
    
    var osmLayer = new ol.layer.Tile({source: osmSource});
    map.addLayer(osmLayer);
   
    
 
</body>
</html>
 
 
 
