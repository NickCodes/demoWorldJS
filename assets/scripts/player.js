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
		
		/*
		// An array of vectors (rays) to use for collision detection against the map and other geometry
		player.collisionRays = [
				['up', new THREE.Vector3(0, -1, 0)],			// up
				['down', new THREE.Vector3(0, -1, 0)],		// down
				['left', new THREE.Vector3(-1, 0, 0)],		// left
				['right', new THREE.Vector3(1, 0, 0)],		// right
				['forward', new THREE.Vector3(0, 0, 1)],	// fwd
				['back', new THREE.Vector3(0, 0, -1)]			// back
			];
			*/
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
    var distance = 1;	
		var playerPosition = cameraManager.controls.getObject().position;
		
		// Vector relative to CAMERA SPACE (in front)
		var pLocal = new THREE.Vector3( 0, 0, -1 );		
		// Transform the relative camera space above into WORLD SPACE
		var pWorld = pLocal.applyMatrix4( cameraManager.controls.getObject().matrixWorld );
		// Construct the collision ray vector
		var dir = pWorld.sub( cameraManager.controls.getObject().position ).normalize();
		
		// Get collision vectors relative to current camera location and orientation
		var pLeft = new THREE.Vector3( -1, 0, 0 );		
		var pLeftWorld = pLeft.applyMatrix4( cameraManager.controls.getObject().matrixWorld );
		var lLeft = pLeftWorld.sub( cameraManager.controls.getObject().position );
		var pRight = new THREE.Vector3( 1, 0, 0 );		
		var pRightWorld = pRight.applyMatrix4( cameraManager.controls.getObject().matrixWorld );
		var lRight = pRightWorld.sub( cameraManager.controls.getObject().position );
		var pForward = new THREE.Vector3( 0, 0, -1 );		
		var pForwardWorld = pForward.applyMatrix4( cameraManager.controls.getObject().matrixWorld );
		var lForward = pForwardWorld.sub( cameraManager.controls.getObject().position );
		var pBack = new THREE.Vector3( 0, 0, 1 );		
		var pBackWorld = pBack.applyMatrix4( cameraManager.controls.getObject().matrixWorld );
		var lBack = pBackWorld.sub( cameraManager.controls.getObject().position );
		
		player.collisionRays = [
			['left', lLeft],				
			['right', lRight],			
			['forward', lForward],	
			['back', lBack],				
		];
		
		// Check each ray for collision
    for (i = 0; i < player.collisionRays.length; i += 1) {
			player.caster = new THREE.Raycaster();				
			// Get camera controller position, set current ray from that position and check collisions
			var pos = new THREE.Vector3( playerPosition.x, playerPosition.y-7, playerPosition.z ); 
			player.caster.set(pos, player.collisionRays[i][1].normalize());

			//player.caster.ray.origin.copy( cameraManager.controls.getObject().position );

			var collisions = player.caster.intersectObjects(world.obstacles);
			
			var reboundAmount = .4;
			
			// Handle collisions
			if (collisions.length && collisions[0].distance < distance ) {
				switch(player.collisionRays[i][0]){
					case 'forward':
						console.log('collision detected ' + player.collisionRays[i][0]);
						//cameraManager.controls.getObject().position.z += 2;
						cameraManager.controls.getObject().translateZ(reboundAmount);
						break;
					case 'back':
						console.log('collision detected ' + player.collisionRays[i][0]);
						//cameraManager.controls.getObject().position.z -= 2;
						cameraManager.controls.getObject().translateZ(-reboundAmount);
						break;
					case 'left':
						console.log('collision detected ' + player.collisionRays[i][0]);
						//cameraManager.controls.getObject().position.x += 2;
						cameraManager.controls.getObject().translateX(reboundAmount);
						break;
					case 'right':
						console.log('collision detected ' + player.collisionRays[i][0]);
						//cameraManager.controls.getObject().position.x -= 2;
						cameraManager.controls.getObject().translateX(-reboundAmount);
						break;
					case 'down':
						console.log('collision detected ' + player.collisionRays[i][0]);
						break;
				}
			} // End collision handling
		} // End for each ray check loop
	}	// End collision check
		
	return player;
}(window);
