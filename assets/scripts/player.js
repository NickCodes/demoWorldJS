window.player = function(window) {
	var player = window.player || {};
	
	var lastMovementDirection='';
	
	if ( !('playerSpawned' in player )){	
		player.playerSpawned = true;						// Init flag		
	}

	player.init = function() {
		// Player stats
		player.health = 1;
		
		/* Bounding box removed, simple raycast from camera position used for collision detection
		player.x = 0;
		player.y = 0;
		player.z = 0;

		// Player bounding box
		var cubeoid = new THREE.BoxGeometry(2,5,2);
		var material = new THREE.MeshLambertMaterial({color: 0x000000, transparent: true, opacity: 1, wireframe:true});
		player.object = new THREE.Mesh( cubeoid, material );
		world.scene.add(player.object);
		*/
		
		// An array of vectors (rays) to use for collision detection against the map and other geometry
		player.collisionRays = [
				['up', new THREE.Vector3(0, -1, 0)],			// up
				['down', new THREE.Vector3(0, -1, 0)],		// down
				['left', new THREE.Vector3(-1, 0, 0)],		// left
				['right', new THREE.Vector3(1, 0, 0)],		// right
				['forward', new THREE.Vector3(0, 0, 1)],	// fwd
				['back', new THREE.Vector3(0, 0, -1)]			// back
			];
	};
	
	/* Movement handled via FirstPersonControls
	player.move = function(direction, units, cameraManager){
		switch(direction.toLowerCase()){
			case 'forward':	
				lastMovementDirection = direction.toLowerCase();
				player.z++;
				//cameraManager.move('z',-1);
				break;
			case 'left':
				player.x--;
				lastMovementDirection = direction.toLowerCase();
				//cameraManager.move('x',-1);
				break;
			case 'back':
				lastMovementDirection = direction.toLowerCase();
				player.z--;
				//cameraManager.move('z',1);
				break;
			case 'right':
				lastMovementDirection = direction.toLowerCase();
				player.x++;
				//cameraManager.move('x',1);
				break;
		}
	}
	*/
	
	player.collisionCheck = function() {
		'use strict';
    var collisions, i;
    var distance = 1;				// Maximum distance from the origin before we consider collision
		
		// Get FPS controls object (camera) position (will not work with cameraManager.camera.position)
		var playerPosition = cameraManager.controls.getObject().position;
		
    for (i = 0; i < player.collisionRays.length; i += 1) {
			player.caster = new THREE.Raycaster();
			
			//var pos = new THREE.Vector3( player.object.position.x,player.object.position.y+3, player.object.position.z ); // was -3
			//player.caster.set(pos, player.collisionRays[i][1].normalize());
			
			// Cast rays from the current camera position, offsetting Y by 3 so the ray is cast ABOVE the ground if standing on the ground
			var pos = new THREE.Vector3( playerPosition.x, playerPosition.y-7, playerPosition.z ); 
			player.caster.set(pos, player.collisionRays[i][1].normalize());
			
			var collisions = player.caster.intersectObjects(world.obstacles);
				
			if (collisions.length && collisions[0].distance < distance ) {
			
				console.log('Collision detected via ' + player.collisionRays[i][0] + ' implementation needed to affect camera movement via FPScontrols!');
			
				/*
				switch(player.collisionRays[i][0]){
					case 'forward':
						console.log('collision detected ' + player.collisionRays[i][0]);
						player.object.position.z -= .2;
						break;
					case 'back':
						console.log('collision detected ' + player.collisionRays[i][0]);
						player.object.position.z += .2;
						break;
					case 'left':
						console.log('collision detected ' + player.collisionRays[i][0]);
						player.object.position.x += .2;
						break;
					case 'right':
						console.log('collision detected ' + player.collisionRays[i][0]);
						player.object.position.x -= .2;
						break;
					case 'down':
						console.log('collision detected ' + player.collisionRays[i][0]);
						player.object.position.y += .1 ;
						break;
				}
				*/
			
			} // End collision handling
		} // End for each ray check loop
	}	// End collision check
		
	return player;
}(window);
