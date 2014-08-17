window.player = function(window) {
	var player = window.player || {};
	
	if ( !('playerSpawned' in player )){	
		player.playerSpawned = true;						// Init flag		
	}

	player.init = function() {
		player.health = 1;
	};
	
	player.collisionCheck = function() {
		'use strict';
    var collisions, i;
    var distance = 1;	
		var reboundAmount = 1;
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
