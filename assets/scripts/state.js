var stateManager = function(window) {
	var stateManager = window.stateManager || {};
	
	stateManager.states = [];
	
	if (!('initialState' in stateManager)){
		stateManager.initialState = true;
		stateManager.state = 0;
	}
	
	stateManager.init = function(){
		// Change from state 0 to state 1
		stateManager.chageState(1);		
	};
	
	stateManager.addState = function(newState){
		// Add state object including state transition callbacks
		// state object = object.name, object.stateCode, object.before.callback, object.after.callback		
		stateManager.states.push(newState);
	};
	
	stateManager.chageState = function(newState){
		// Does state we are in have any exit routine to execute?
		//		//	Destroy menu or scene, stop game clock, etc
		// Does the state we are going into have any setup routine to execute?
		//		//	Load menus, show mouse cursor, play menu music, etc
		stateManager.state = newState;
	}
	
	return stateManager;		
}(window);
