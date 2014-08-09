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
