// Camera mode

 
// there are three callbacks in showCamera function
// Success: do something if the device has a camera
// Cancel: when the user cancels camera
// Error: if device does not have camera capabilities

Ti.Media.showCamera({
	// User is taking a photo
	success : function(usrcam) {
		var imageView = Titanium.UI.createImageView({
			image:usrgal.media,
			width:win.width,
			height:win.height,
			zIndex:1
		}) 
	win.add(imageView);
	//alert('photo saved');
		
	},
	cancel : function() {
		//do nothing. user cancels
	},
	error : function(error) {
		var message;
		if (error.code == Ti.Media.NO_CAMERA) {
			message = 'This device does not have camera capabilities :(';
		} else {
			message = 'Unexpected error: ' + error.code;
		}
		
		// create error
		Ti.UI.createAlertDialog({
			title : 'No Camera',
			message : message
		}).show();
	},
	saveToPhotoGallery : true,
	allowEditing : true,
	mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
	videoQuality:Titanium.Media.QUALITY_HIGH
});
