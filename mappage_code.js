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
    
// Style Feature overlay 

      var featureOverlay = new ol.layer.Vector({
        source: new ol.source.Vector(),
        map: map,
        style: new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: '#f00',
            width: 1
          }),
          fill: new ol.style.Fill({
            color: 'rgba(255,0,0,0.1)'
          })
        })
      });


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
          wrapX: false
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
 //    	var source = new ol.source.Vector()
//     	var drawvector = new ol.layer.Vector({
//         source: source,
//         style: new ol.style.Style({
//           fill: new ol.style.Fill({
//             color: 'rgba(255, 255, 255, 0.2)'
//           }),
//           stroke: new ol.style.Stroke({
//             color: '#ffcc33',
//             width: 2
//           }),
//           image: new ol.style.Circle({
//             radius: 7,
//             fill: new ol.style.Fill({
//               color: '#ffcc33'
//             })
//           })
//         })
//       });
//       map.addLayer(drawvector);
//     
    	

    	
 //    	Add tool to modify layer 
//     	
//     	var modify = new ol.interaction.Modify({source: source});
//       map.addInteraction(modify);
// 
//       var draw, snap; // global so we can remove them later
//       var typeSelect = document.getElementById('type');
// 
//       function addInteractions() {
//         draw = new ol.interaction.Draw({
//           source: source,
//           type: /** @type {ol.geom.GeometryType} */ (typeSelect.value)
//         });
//         map.addInteraction(draw);
//         snap = new ol.interaction.Snap({source: source});
//         map.addInteraction(snap);
// 
//       }
// 
// 		Add tool to select
//     	
//     	var select = new ol.interaction.Select({
//         wrapX: false
//       });
//       map.addInteraction(select)
//       
//        var modify = new ol.interaction.Modify({
//         features: select.getFeatures()
//       });
//       map.addInteraction(getfeature)
//       
//       /**
//        * Handle change event.
//        */
//       typeSelect.onchange = function() {
//         map.removeInteraction(draw);
//         map.removeInteraction(snap);
//         addInteractions();
//       };
// 
//       addInteractions();
      
      // Display feature info 
      
            var highlight;
      var displayFeatureInfo = function(pixel) {

        var feature = map.forEachFeatureAtPixel(pixel, function(feature) {
          return feature;
        });

        var info = document.getElementById('info');
        if (feature) {
          info2.innerHTML = feature.getId() + ': ' + feature.get('name');
        } else {
          info2.innerHTML = '&nbsp;';
        }

        if (feature !== highlight) {
          if (highlight) {
            featureOverlay.getSource().removeFeature(highlight);
          }
          if (feature) {
            featureOverlay.getSource().addFeature(feature);
          }
          highlight = feature;
        }

      };

      map.on('pointermove', function(evt) {
        if (evt.dragging) {
          return;
        }
        var pixel = map.getEventPixel(evt.originalEvent);
        displayFeatureInfo(pixel);
      });

      map.on('click', function(evt) {
        displayFeatureInfo(evt.pixel);
      });

});
