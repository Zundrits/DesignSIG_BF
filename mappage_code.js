	var map; 
 
 //Definition of style for the vectorroads layer 

	var BF_Style = new ol.style.Style({ 
        stroke: new ol.style.Stroke({ color: 'rgba(0,0,255,1)', width: 1.5 })
    });
	
	var Point_Style = new ol.style.Style({
            image: new ol.style.Circle({
                    radius: 1,
                    fill: new ol.style.Fill({color: 'lightblue'}),
                    stroke: new ol.style.Stroke({color: 'lightblue', width: 0})
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
   $(document).ready(function(){
	    
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
	    style: BF_Style,
        source: new ol.source.Vector({
          url: 'https://openlayers.org/en/v4.4.2/examples/data/geojson/countries.geojson',
          format: new ol.format.GeoJSON(),
        })
      });
        map.addLayer(vectorLayer);
	    
	     //Add vectorroads geojson
    var vectorroads = new ol.layer.Vector({
        style: BF_Style,
      source: new ol.source.Vector({
        url: '../public/geojson/BF_Geojson.geojson',
        format: new ol.format.GeoJSON(),
      })
    });
    	map.addLayer(vectorroads);
    	
    	//Add vectorroads geojson
    var places = new ol.layer.Vector({
        style: Point_Style,
      source: new ol.source.Vector({
        url: '../public/geojson/places.geojson',
        format: new ol.format.GeoJSON(),
      })
    });
    	map.addLayer(places);
    	
    	// Add new vector layer to stock
    	var source = new ol.source.Vector()
    	var vector = new ol.layer.Vector({
        source: source,
        style: new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
          }),
          stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2
          }),
          image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
              color: '#ffcc33'
            })
          })
        })
      });
      
    
    	
    	
    	//Add tool to modify layer 
    	
    	var modify = new ol.interaction.Modify({source: source});
      map.addInteraction(modify);

      var draw, snap; // global so we can remove them later
      var typeSelect = document.getElementById('type');

      function addInteractions() {
        draw = new ol.interaction.Draw({
          source: source,
          type: /** @type {ol.geom.GeometryType} */ (typeSelect.value)
        });
        map.addInteraction(draw);
        snap = new ol.interaction.Snap({source: source});
        map.addInteraction(snap);

      }

      /**
       * Handle change event.
       */
      typeSelect.onchange = function() {
        map.removeInteraction(draw);
        map.removeInteraction(snap);
        addInteractions();
      };

      addInteractions();

});
