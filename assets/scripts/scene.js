// PRIMITIVES -------------------------------------------------------------

// set up the sphere vars
var radius = 50,
    segments = 16,
    rings = 16;
// create the sphere's material
var sphereMaterial =
  new THREE.MeshLambertMaterial(
    {
      color: 0xCC0000
    });
	
// create a new mesh 
var sphere = new THREE.Mesh(
	new THREE.SphereGeometry(
		radius,
		segments,
		rings),
		sphereMaterial);

scene.add(sphere);