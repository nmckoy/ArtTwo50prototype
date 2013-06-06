 
//FirstView Component Constructor
function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var win = Ti.UI.createWindow({
		title : "art250",
		backgroundColor : "#000000",
		width: '100%',
		height: '100%',
		fullscreen: true
	})
	
	var button = Titanium.UI.createButton({
		title: "open gallery",
		width:125,,
		height:50,
		bottom:10,
		left:10,
		zIndex:2
	})
 	win.add(button);
	
	button.addEventListener("click", function(e){
		// calls gallery
		Ti.include("Gallery.js");
	})
	//calls camera function
	Ti.include("Camera.js");
	
	return win;
	
}

module.exports = FirstView;




