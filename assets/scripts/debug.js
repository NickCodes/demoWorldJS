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
		
		// Lights
		world.defaultDirectionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
		world.defaultDirectionalLight.position.set(0, -11, 0 );
		world.scene.add( world.defaultDirectionalLight );
		world.defaultDirectionalLight2 = new THREE.DirectionalLight( 0xffffff, 1 );
		world.defaultDirectionalLight2.position.set(0, 500, 500 );
		world.scene.add( world.defaultDirectionalLight2 );

		// Skybox
			// Load the images
			var urlPrefix = "assets/images/d_skybox/";
			var urls = [ urlPrefix + "ashcanyon_right.jpg", urlPrefix + "ashcanyon_left.jpg",
				urlPrefix + "ashcanyon_top.jpg", urlPrefix + "ashcanyon_top.jpg",
				urlPrefix + "ashcanyon_front.jpg", urlPrefix + "ashcanyon_back.jpg" ];
			var textureCube = THREE.ImageUtils.loadTextureCube( urls ); 

			var shader = THREE.ShaderLib[ "cube" ];
			shader.uniforms[ "tCube" ].value = textureCube;

			var material = new THREE.ShaderMaterial( {

				fragmentShader: shader.fragmentShader,
				vertexShader: shader.vertexShader,
				uniforms: shader.uniforms,
				depthWrite: false,
				side: THREE.BackSide

			} ),

			mesh = new THREE.Mesh( new THREE.BoxGeometry( 10000, 10000, 10000 ), material );
			world.scene.add( mesh );
			
			
		// Load additional scene geometry exported from Blender
		debugObject.debugScene = geometryManager.loadModelJSON('assets/models/scene.js');
		
		// Manually positioning the player
		// TODO - remove this and also adjust the pointerlockcontrols class so it doesn't enforce an arbitrary y=10 clamp
		cameraManager.camera.position.y = -8;
	};

	return debugObject;
}(window);
