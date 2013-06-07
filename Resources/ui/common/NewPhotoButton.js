// New Photo Button View/Logic

function NewPhotoButton() {
	
	var imgView = Ti.UI.createView({
		width:'100%',
		height:'100%',
		fullscreen:true
	})
	
	// photos button
	var button = Titanium.UI.createButton({
		title: "photo",
		width:125,
		height:50,
		bottom:10,
		left:50,
		zIndex:2
	})
 	imgView.add(button);
	
	//open dialog box
	button.addEventListener("click", function(e){
		// Dialog box
		var dialog = Titanium.UI.createOptionDialog({
			title: 'Choose Source',
			options: ['Camera', 'Photo Gallery'],
			cancel: -1
		})
		
	dialog.addEventListener('click', function(e){
		if (e.index == 0){
			//calls camera function
			Ti.include("Camera.js");
		}
		else if (e.index == 1){
			
			//opens gallery photos
			Titanium.Media.openPhotoGallery({
				success:function(usrgal){
					if (usrgal.mediaType == Titanium.Media.MEDIA_TYPE_PHOTO){
						// use chosen photo in window
						var imageView = Titanium.UI.createImageView({
							image:usrgal.media,
							width:imgView.width,
							height:imgView.height,
							zIndex:1
						})
						imgView.add(imageView);
					}
				},
				
				cancel:function(){
					//do nothing; user cancels
				},
				error:function(error){
					var alert = Ti.UI.createAlertDialog({
						title: 'Error',
						message: 'Something went wrong.',
						ok: 'Cancel'
					}) 
					alert.show();
				},
				allowEditing : true,
				mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
				videoQuality:Titanium.Media.QUALITY_HIGH,
				popoverView:button
			})
		}
	})
	
	
	dialog.show({view:button});
	})
	
	return imgView;
	
}

module.exports = NewPhotoButton;
