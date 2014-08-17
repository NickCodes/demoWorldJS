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
		cameraManager.controls = new THREE.PointerLockControls( cameraManager.camera );
		world.scene.add( cameraManager.controls.getObject() );
	
		// Setup pointerlock and callbacks
		var havePointerLock = 'pointerLockElement' in document ||
		'moz	PointerLockElement' in document ||
		'webkitPointerLockElement' in document;
		if (havePointerLock){
			world.container.requestPointerLock = world.container.requestPointerLock ||
				world.container.mozRequestPointerLock ||
				world.container.webkitRequestPointerLock;
			// Ask the browser to lock the pointer
			jQuery(world.container).on('click', function(){ world.container.requestPointerLock(); cameraManager.controls.enabled=1; });
		}
		changeCallback = function(){
			if (document.pointerLockElement === world.container ||
				document.mozPointerLockElement === world.container ||
				document.webkitPointerLockElement === world.container) {
				document.addEventListener("mousemove", this.moveCallback, false);
			} else {
				document.removeEventListener("mousemove", this.moveCallback, false);
			}
		};
		document.addEventListener('pointerlockchange', changeCallback, false);
		document.addEventListener('mozpointerlockchange', changeCallback, false);
		document.addEventListener('webkitpointerlockchange', changeCallback, false);
		document.addEventListener("mousemove", this.moveCallback, false);
		
	};
		
	return cameraManager;
}(window);

