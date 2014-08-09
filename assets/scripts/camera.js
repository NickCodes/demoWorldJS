var cameraManager = function(){ 
	var cameraManager = window.cameraManager || {};
	
	if (!('initialState' in cameraManager)){
		cameraManager.initialState = true,
		VIEW_ANGLE = 60,										
		NEAR = 0.1,
		FAR = 20000,
		WIDTH = 800,
		HEIGHT = 600,
		ASPECT = WIDTH / HEIGHT;		
	}

	cameraManager.init = function() {
		cameraManager.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	};
	
	// Move the camera along an axis
	cameraManager.move = function(axis, amount){
		switch (axis.toLowerCase()){
			case "x":
				cameraManager.camera.position.x += amount; break;
			case "y":
				cameraManager.camera.position.y += amount; break;
			case "z":	
				cameraManager.camera.position.z += amount; break;
		}
	}
	
	return cameraManager;
}(window);

