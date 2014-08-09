var debugObject = function(window){
	debugObject = window.debugObject || {};
	
	if ( !('initialState' in debugObject )){
		debugObject.initialState = true;
	}

	debugObject.init = function(){
		// FPS and ms display
		debugObject.stats = new Stats();
		debugObject.stats.domElement.style.position = 'absolute';
		debugObject.stats.domElement.style.top = '10px';
		debugObject.stats.domElement.style.left = '10px';
		debugObject.stats.domElement.style.zIndex = 100;
		world.container.appendChild( debugObject.stats.domElement );
		
		// Axis indicator todo - add to debug object
		var axisHelper = new THREE.AxisHelper( 50 );
		world.scene.add( axisHelper );
		
	}

	return debugObject;
}(window);
