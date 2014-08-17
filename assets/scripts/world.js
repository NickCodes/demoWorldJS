var world = function(window){
	var world = window.world || {};

	if (!('initialState' in world)){
		world.initialState = true;
		world.viewportWidth = 1440;
		world.viewportHeight = 990;
		world.obstacles = [];
	}

	world.init = function(){
		console.log('World initializing');
		world.renderer = new THREE.WebGLRenderer();
		world.renderer.setSize(world.viewportWidth, world.viewportHeight)	;
		world.container = document.getElementById('3jsContainer');
		world.container.appendChild(world.renderer.domElement);
		console.log('World ready');
	};
	
	// Clock to keep track of running time and time delta per frame
	world.gameClock = new THREE.Clock;
	
	world.scene = new THREE.Scene();

	return world;
}(window);
