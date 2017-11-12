	var map; 
 
 //Definition of style for the vectorroads layer 

	var BF_Style = new ol.style.Style({ 
        stroke: new ol.style.Stroke({ color: 'rgba(0,0,255,1)', width: 1.5 })
    });
	
	var Point_Style = new ol.style.Style({
            image: new ol.style.Circle({
                    radius: 5,
                    fill: new ol.style.Fill({color: 'black'}),
                    stroke: new ol.style.Stroke({color: 'black', width: 0})
            })
    });
 	var style = new ol.style.Style({
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.6)'
        }),
        stroke: new ol.style.Stroke({
          color: '#319FD3',
          width: 1
        }),
        text: new ol.style.Text({
          font: '12px Calibri,sans-serif',
          fill: new ol.style.Fill({
            color: '#000'
          }),
          stroke: new ol.style.Stroke({
            color: '#fff',
            width: 3
          })
        })
      });



    // Take out this function
   // $(document).ready(function(){
	    
        // Crée la carte avec une couche de fond MapQuest (ou OpenStreetMap en comment)
	    map = new ol.Map({
            layers: [
    			new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            target: 'map',
            renderer: 'canvas',
            view: new ol.View({
              center: ol.proj.fromLonLat([-2, 12]),
          	  zoom: 7
		})
	    });
	    
	    
	     //Add vectorroads geojson
	    var vectorLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
          url: 'https://openlayers.org/en/v4.4.2/examples/data/geojson/countries.geojson',
          format: new ol.format.GeoJSON()
        }),
        style: function(feature) {
          style.getText().setText(feature.get('name'));
          return style;
        }
      });
	    
	     //Add vectorroads geojson
    var vectorroads = new ol.layer.Vector({
        style: BF_Style,
      source: new ol.source.Vector({
        url: './geojson/BF_Geojson.geojson',
        format: new ol.format.GeoJSON(),
      })
    });
    map.addLayer(vectorroads);


