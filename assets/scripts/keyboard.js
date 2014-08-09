/* Pseudocode for key control mappings
	//	Example: create a new set of control mappings
		standardControls = function() {
			standardControls = new keyController;
			standardControls.addKeyListener('W', function(){ player.moveUp(new vector3(1,0,0)); });	// Anonymous
			standardControls.addKeyListener('A', standardControls.moveLeft );												// this object (or another obj)
			standardControls.addKeyListener('S', standardControls.moveBack );												// this object (or another obj)
			standardControls.addKeyListener('D', standardControls.moveLeft );												// this object (or another obj)
			standardControls.moveLeft = function(e){ player.move(new vector3(1,0,0)); }						// callback for above
			standardControls.moveRight = function(e){ player.move(new vector3(1,0,0)); }					// callback for above
			standardControls.moveUp = function(e){ player.move(new vector3(1,0,0)); }							// callback for above
			standardControls.moveBack = function(e){ player.move(new vector3(1,0,0)); }						// callback for above						

			standardControls.layout = [];

			// Add key and callback to the layout
			standardControls.addKeyListener = function(key, callback){
				standardControls.layout.push([key, callback]);	
			};								

			return standardControls;
		}
	*/


var keyboard = function(window) {
		var keyboard = window.keyboard || {};
		keyboard.keyAllowed = {};
 
    if (!('isPressed' in keyboard)) {
        keyboard._keys = {};
			
				// Attach keydown and keyup listeners to document
				// Process for making keys event driven (keydown keyup) instead of constantly polling a boolean on/off register
				
				// Check if a key is pressed
				keyboard.isPressed = function(key) {
          key = key.toLowerCase();
          if(key in keyboard._keys) {
            return keyboard._keys[key];
          }
					return false;
        }
    } 
		
		// TODO instead of polling a true/false array such as _keys,
		// fire an event here such as keyDown and inject into the system that needs it instead of polling constantly
		keyboard.init = function(){
			jQuery(document).keydown(function(e){ 
				if (keyboard.keyAllowed[e.which] == false) return;			// disable key until keyup
					keyboard.keyAllowed[e.which] = false;										
				var key = String.fromCharCode(e.which).toLowerCase();
				keyboard._keys[key] = true;															// Key is pressed
			});				
			jQuery(document).keyup(function(e){ 
				keyboard.keyAllowed[e.which] = true;									// re-allow key
				var key = String.fromCharCode(e.which).toLowerCase();
				keyboard._keys[key] = false;													// Key is not pressed
			});				
		};
		
    return keyboard;
}(window);
