var geometryManager = function(){
	var geometryManager = window.geometryManager || {};

	if (!('geometryList' in geometryManager)){
		// array to hold all loaded geometry
		geometryManager.initialState = true;
		geometryManager.geometryList = [];	
	}
	
	geometryManager.getObstacles = function(){
		var results = [];
		// Get any object in geometryList with collideable = true and add its mesh to the obstacles array for collision checking
		console.log(geometryManager.geometryList.length);
		if (geometryManager.geometryList.length){
			console.log('1');
			geometryManager.geometryList.forEach( function(obj){ 
				console.log('2');
				if (obj.collideable == true) results.push(obj.mesh);	
			});		
		}
		
		return results;
	}
	
	// Public JSON loader
	geometryManager.loadModelJSON = function(path) {
		var jsonLoader = new THREE.JSONLoader();
		jsonLoader.load( path, function(geometry) {
			var material = new THREE.MeshLambertMaterial({ color: 0x79D75A });
			loadedGeometry = new THREE.Mesh( geometry, material );
			world.scene.add( loadedGeometry );
		
			loadedGeometry.scale.set(4,4,4);
		
			// DEBUG - automatically push mesh onto collideable array
			geometryManager.geometryList.push(loadedGeometry);
			world.obstacles.push(loadedGeometry);
		});
	}
	
	return geometryManager;
}(window);
