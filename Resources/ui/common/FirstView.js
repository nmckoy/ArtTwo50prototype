

//The FirstView!!!
function FirstView() {
	var win = Ti.UI.createWindow({
		title : "art250",
		backgroundColor : "#000000",
		width: '100%',
		height: '100%',
		fullscreen: true
	})
	
	//load and contruct UI for New Photo 
	var NewPhotoButton = require('ui/common/NewPhotoButton');
	
	var Newphoto = new NewPhotoButton();
	win.add(Newphoto);
	
	//calls camera function
	Ti.include("Camera.js");
	return win;
	
}


module.exports = FirstView;




