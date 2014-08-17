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
	
	// DEBUG scene settings used for working out the kinks!
	debugObject.defaultSceneSettings = function(){
		world.defaultDirectionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
		world.defaultDirectionalLight.position.set(0, -11, 0 );
		world.scene.add( world.defaultDirectionalLight );
		
		world.defaultDirectionalLight2 = new THREE.DirectionalLight( 0xffffff, 1 );
		world.defaultDirectionalLight2.position.set(0, 500, 500 );
		world.scene.add( world.defaultDirectionalLight2 );
		
		debugObject.debugScene = geometryManager.loadModelJSON('assets/models/scene.js');
		
		cameraManager.camera.position.y = -8;
	};

	return debugObject;
}(window);
