var world = function(window){
	var world = window.world || {};

	if (!('initialState' in world)){
		world.initialState = true;
		world.viewportWidth = 1440;
		world.viewportHeight = 990;
		console.log('Initial state, container and render element created');
	}

	world.init = function(){
		console.log('World initializing');
		world.renderer = new THREE.WebGLRenderer();
		world.container = document.getElementById('3jsContainer');
		world.container.appendChild(world.renderer.domElement);
		console.log('World ready');
	};
	
	world.defaults = function(){
		world.defaultDirectionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
		world.defaultDirectionalLight.position.set(0, -11, 0 );
		world.scene.add( world.defaultDirectionalLight );
		
		world.defaultDirectionalLight2 = new THREE.DirectionalLight( 0xffffff, 1 );
		world.defaultDirectionalLight2.position.set(0, 500, 500 );
		world.scene.add( world.defaultDirectionalLight2 );
	};

	// Clock to keep track of running time and time delta per frame
	world.gameClock = new THREE.Clock;
	
	// Public viewport dimensions setter 
		//world.setScreenDimension = function(WIDTH, HEIGHT){	world.renderer.setSize(WIDTH, HEIGHT); }();
	
	world.scene = new THREE.Scene();

	return world;
}(window);
