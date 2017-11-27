 var map; 
 var tempFeature;
 var obsLayer;
 var editedFeature;
 
    //Definition of style for the vectorroads layer 

    var BF_Style = new ol.style.Style({ 
        stroke: new ol.style.Stroke({ color: 'rgba(0,0,255,1)', width: 1.5 })
    });
    var Street_style = new ol.style.Style({ 
        stroke: new ol.style.Stroke({ color: 'rgba(255,0,255,1)', width: 4 })
    });

    var Point_Style = new ol.style.Style({
            image: new ol.style.Circle({
                    radius: 3,
                    fill: new ol.style.Fill({color: 'lightblue'}),
                    stroke: new ol.style.Stroke({color: 'lightblue', width: 0})
            })
    });


    var node = "none";


    function setMode() {
        if(this.id == "addButton") {
            if(mode==="add") {
                mode="none";
                this.style.color = "black";
            }
            else {
                mode = "add";
                this.style.color = "red";
                draw.on('drawend', roadAdded);
                map.addInteraction(draw);
                map.addInteraction(snap);
                }
            }
            else if(this.id == "modButton") {
            
            }
            else if(this.id == "delButton") {

            }
        };


    function roadAdded(event) {
        };

    function roadSelectedToDelete(event) {
        };

		

    function init() {

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

            var countriesvector = new ol.layer.Vector({
            style: BF_Style,
                source: new ol.source.Vector({
                  url: 'https://openlayers.org/en/v4.4.2/examples/data/geojson/countries.geojson',
                  format: new ol.format.GeoJSON(),
                  wrapX: false
                })
              });
                map.addLayer(countriesvector);
            
             //Add vectorroads geojson
            var vectorroads = new ol.layer.Vector({
                style: Street_style,
              source: new ol.source.Vector({
                url: '../public/geojson/BF_Geojson.geojson',
                format: new ol.format.GeoJSON(),
              })
            });
            map.addLayer(vectorroads);
           
            //Add places geojson
            var places = new ol.layer.Vector({
                style: Point_Style,
              source: new ol.source.Vector({
                url: '../public/geojson/places.geojson',
                format: new ol.format.GeoJSON(),
              })
            });
            map.addLayer(places);
			
			//Added 27.11 still need to add style I think, not on slide 30 
			// Add observations" 
			obsLayer = new ol.layer.Vector({
			});
			map.addLayer(obsLayer) 
			
			// End added 

            document.getElementById("addButton").onclick = setMode;
            document.getElementById("modButton").onclick = setMode;
            document.getElementById("delButton").onclick = setMode;

    };
	
	// Last Added 27.11
	function mapClick(e) {
		if(mode==="add") {
			var tFeature = {
				'type: Feature',
				'properties': {
						'name' : 'new name', 
						'comment': 'no commet, 
						'added': '',
						'image': ''
				}.
				'geometry': {
						'type: 'Point',
						'coordinates': e.coordinates}
			}
		};
		
		var reader = new ol.format.GeoJSON();
		tempFeature = reader.readFeature(tFeature);
		obsLayer.getSource().addFeature(tempFeature);
		
		document.getElementById("nameinput").value =tFeature.properties.name;
		document.getElementById("commentinput").value =tFeature.properties.comment;
		document.getElementById("dateinput").value =tFeature.properties.added;
		document.getElementById("Xinput").value =tFeature.properties.coordinates[0];
		document.getElementById("Yinput").value =tFeature.properties.coordinates[1];
		document.getElementById("form").style.visibility = "visible";
		
		else if(mode ==="mode") {
				this.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
					if(layer === obsLayer) {
						document.getElementById("IDinput").value =feature.getProperties().id;
						document.getElementById("nameinput").value =feature.getProperties().name;
						document.getElementById("commentinput").value =feature.getProperties().comment;
						document.getElementById("dateinput").value =feature.getProperties().added
						document.getElementById("Xinput").value =feature.getProperties().geometry.
							getCoordinates()[0];
						document.getElementById("Yinput").value =feature.getProperties().geometry.
							getCoordinates()[1];
						document.getElementById("form").style.visibility = "visible";
						editedFeature = feature;
						return;
					}
				});
		}
		
						
		
	}
		
	function savedata(callback) {
		var request = window.superagent;
		var observation = { id:document.getElementById("IDinput").value, 
	
	
	function addObservations() {
		var request = window.superagent;
		request 
			.get('/form')
			.end(function(err, res) {
					if(err) {
						return callback(null, 'Erreur de connexion au server, ' + err.message);
					}
					if (res.status !== 200) {
						return callback(null, res.text);
					}
					var data = JSON.parse(res.text);
					for (i = 0; i < data.length; i++) {
							var geojsonFeature = {
									"type": "Feature",
									"properties": {
										"id": data[i]._id,
										"name": data[i].name,
										"comment": data[i].comment,
										"added": data[i].added,
										"image": data[i].image
									},
									"geometry": { 
										"type": "Point",
										"coordinates": [Number(data[i].geometry.coordinates[0]),
											Number(data[i.geometry.coordinates[1])]
									}
							};
							var reader = new ol.format.GeoJSON();
							var olFeature = reader.readFeature(geojsonFeature);
							obsLayer.getSource().addFeature(olFeature);
					}
			});
	}
	
	function onsaved(arg, msg) {
		if(arg == nll){
				console.log(msg);
		}
		else { 
			if(mode == 'add') { tempFeature._id =arg._id }
		}
		
		document.getElementById("addButton").style.color = "black";
        document.getElementById("modButton").style.color = "black";
        document.getElementById("delButton").style.visibility = "collapse";
	}
	
	function cancelform() {
			if(mode === 'add') {
				obsLayer.getSource().removeFeature(tempFeature);
			}
			onsaved(null,'cancelled');
	}

		// End Last Added 
		
	

  var mode = "none";
    var draw = new ol.interaction.Draw({
                source: new ol.source.Vector({
                url: '../public/geojson/BF_Geojson.geojson',
                format: new ol.format.GeoJSON(),
                })
})
    var snap = new ol.interacction.Snap({source: roadlayerSource});;
    var modify = new ol.interaction.Modify({
                source: new ol.source.Vector({             
                url: '../public/geojson/BF_Geojson.geojson',
                format: new ol.format.GeoJSON(),
                    })
})​