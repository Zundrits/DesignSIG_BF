<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="http://openlayers.org/en/v3.10.1/css/ol.css" type="text/css">
    <script src="http://openlayers.org/en/v3.10.1/build/ol.js" type="text/javascript"></script>
    <title>openlayer sample </title>

    <style>
        html, body{
            height:100%;
            width:100:
                    }
            #map {
            height:100%;
            }
    </style>

    <title>Openlayer sample</title>

</head>
 
<body>
 
    <div id="map" style="width: 100%, height: 400px"></div>


    <script>
    var map = new ol.Map({
            target: 'map'});

            view: new ol.View ({
            center: ol.proj.fromLonLat([6.5, 46.5]),
            zoom: 9
        });

 // create an add the tile layer
    
    
    var osmSource = new ol.source.OSM();
    
    var osmLayer = new ol.layer.Tile({
            source: osmSource
            });

    map.addLayer(osmLayer);
   
 </script>
 
</body>
</html>
 
 
 
