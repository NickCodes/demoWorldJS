var world = function(window){
	var world = window.world || {};

	if (!('initialState' in world)){
		world.initialState = true;
		world.viewportWidth = 800;
		world.viewportHeight = 600;
		console.log('Initial state, container and render element created');
	}

	world.init = function(){
		console.log('World initializing');
		world.renderer = new THREE.WebGLRenderer();
		world.container = document.getElementById('3jsContainer');
		world.container.appendChild(world.renderer.domElement);
		console.log('World ready');
	};

	// Clock to keep track of running time and time delta per frame
	world.gameClock = new THREE.Clock;
	
	// Public viewport dimensions setter 
		//world.setScreenDimension = function(WIDTH, HEIGHT){	world.renderer.setSize(WIDTH, HEIGHT); }();
	
	world.scene = new THREE.Scene();

	return world;
}(window);
