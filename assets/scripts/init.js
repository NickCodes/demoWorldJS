// Loosely coupled: objects create and instantiate themselves. Dependency bound setup run via .init() once document is loaded (and all js)


/*
// world manager
var world = function(window){
	var world = window.world || {};

	if (!('initialState' in world)){
		world.initialState = true;
		world.viewportWidth = 800;
		world.viewportHeight = 600;
		console.log('Initial state, container and render element created');
	}

	world.init = function(){
		console.log('init start');
		world.renderer = new THREE.WebGLRenderer();
		world.container = document.getElementById('3jsContainer').appendChild(world.renderer.domElement);
		console.log('init end');
	};

	// Public viewport dimensions setter 
	//world.setScreenDimension = function(WIDTH, HEIGHT){	world.renderer.setSize(WIDTH, HEIGHT); }();
	
	world.scene = new THREE.Scene();

	return world;
}(window);

// Geometry manager
var geometryManager = function(){

	var geometryManager = window.geometryManager || {};
	
	geometryManager.getObstacles = function(){
		var results = world.scene.getObjectByName('ground');
		return results;
	}
	
	
	// Public JSON loader
	geometryManager.loadModelJSON = function(path) {
		var jsonLoader = new THREE.JSONLoader();
		jsonLoader.load( path, function(geometry) {
			var material = new THREE.MeshLambertMaterial({ color: 0xB4F53C2 });
			loadedGeometry = new THREE.Mesh( geometry, material );
			scale = new THREE.Vector3(1,1,1);
			loadedGeometry.scale.set(100,100,100);
			world.scene.add( loadedGeometry );
		});
	}
	
	
	
	return geometryManager;
}(window);

// Camera manager
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
		cameraManager.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	}
				
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

// State manager
var stateManager = function(window) {
	var stateManager = window.stateManager || {};
	
	if (!('initialState' in stateManager)){
		stateManager.initialState = true;
		stateManager.state = 0;
	}
	
	stateManager.chageState = function(newState){
		stateManager.state = newState;
	}
	
	return stateManager;		
}(window);

// Menu manager
var menuManager = function(window){
	menuManager = window.menuManager || {};
	
	if (!('initialState' in menuManager)){
		menuManager.initialState = true;
	}

	// display menu 
	menuManager.displayMenu = function(menu){
		jQuery('#3jsContainer canvas').append('<div id="overlay">');
		jQuery('#overlay').append('<div class="mainMenu"><a href="#" data-dest="something">MENU</a></div>').on('click', function(e){ e.preventDefault(); console.log('lmpthspt'); });
		jQuery('#overlay').css('opacity','.3');
	};
		
	
	menuManager.destroyMenu = function(menu){
		// need to handle removing menus here (menuManager)
		// debug:
		jQuery('#3jsContainer').children('div').remove();			
	};
	
	return menuManager;
}(window);
 
// Keyboard manager
var keyboard = function(window) {
		var keyboard = window.keyboard || {};
		keyboard.keyAllowed = {};
 
    if (!('isPressed' in keyboard)) {
        keyboard._keys = {};
			
				// Attach keydown and keyup listeners to document
				
				// Process for making keys event driven (keydown keyup) instead of constantly polling a boolean on/off register
				//
					
				jQuery(document).keydown(function(e){ 
				  if (keyboard.keyAllowed[e.which] == false) return;			// disable key until keyup
					keyboard.keyAllowed[e.which] = false;										
					var key = String.fromCharCode(e.which).toLowerCase();
					keyboard._keys[key] = true;															// Key is pressed
					// TODO instead of polling a true/false array such as _keys,
					// fire an event here such as keyDown and inject into the system that needs it instead of polling constantly
				});				
				jQuery(document).keyup(function(e){ 
						keyboard.keyAllowed[e.which] = true;									// re-allow key
						var key = String.fromCharCode(e.which).toLowerCase();
						keyboard._keys[key] = false;													// Key is not pressed
				});				
				
				// Check if a key is pressed
				keyboard.isPressed = function(key) {
          key = key.toLowerCase();
          if(key in keyboard._keys) {
            return keyboard._keys[key];
          }
					return false;
        }

    } 
    return keyboard;
}(window);

// Player manager
var player = function(window) {
	var player = window.player || {};
	
	if ( !('playerSpawned' in player )){	
		player.playerSpawned = true;						// Init flag
		
		// Create player rectangle
		var cubeoid = new THREE.BoxGeometry(2,5,2);
		var material = new THREE.MeshLambertMaterial({ color: 0xB4F53C2 });
		var wireMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe:true } );


		player.object = new THREE.Mesh( cubeoid, wireMaterial );
		world.scene.add(player.object);

		var cubeoid2 = new THREE.BoxGeometry(8,2,5);
		player.object2 = new THREE.Mesh( cubeoid2, material );
		//world.scene.add(player.object2);
		player.object2.name = "object2";
		
		player.object.position.y = 9;
		
		player.health = 1;
		player.x = 0;
		player.y = 0;
		player.z = 0;
		
		// Collision detecting

		// An array of vectors (rays) to use for collision detection against the map and other geometry
		player.collisionRays = [
				// fwd, back, left, right and diagonals between each
				new THREE.Vector3(0, -1, 0),
				new THREE.Vector3(0, 1, 0)
			];
		
	}

	player.move = function(direction, units, cameraManager){
		switch(direction.toLowerCase()){
			case 'forward':
				player.z++;
				cameraManager.move('z',-1);
				break;
			case 'left':
				player.x--;
				cameraManager.move('x',-1);
				break;
			case 'back':
				player.z--;
				cameraManager.move('z',1);
				break;
			case 'right':
				player.x++;
				cameraManager.move('x',1);
				break;
		}
	}
	
	player.collisionCheck = function() {
		'use strict';
    var collisions, i;
    var distance = .1;				// Maximum distance from the origin before we consider collision
		
    for (i = 0; i < player.collisionRays.length; i += 1) {
			player.caster = new THREE.Raycaster();

			var pos = new THREE.Vector3( player.object.position.x,player.object.position.y-3, player.object.position.z );
			player.caster.set(pos, player.collisionRays[i]);
			var collisions = player.caster.intersectObjects(world.obstacles);
			
			//if (collisions.length > 1) console.log(collisions);
			
      if (collisions.length && collisions[0].distance < distance) {
					console.log('d'); 
					player.object.position.y = world.scene.getObjectByName("ground").position.y+3;
      }
			
		} // End for each ray check loop
	}
		
	return player;
}(window);

// debug helpers
var debugObject = function(window){
	debugObject = window.debugObject || {};
	
	if ( !('initialState' in debugObject )){
		debugObject.initialState = true;
		// FPS & STATS
		debugObject.stats = new Stats();
		debugObject.stats.domElement.style.position = 'absolute';
		debugObject.stats.domElement.style.bottom = '0px';
		debugObject.stats.domElement.style.zIndex = 100;
		//world.container.appendChild( debugObject.stats.domElement );
		// Axis indicator
		//var axisHelper = new THREE.AxisHelper( 50 );
		//world.scene.add( axisHelper );
	}
	return debugObject;
}(window);
*/


