// Camera mode

 
// there are three callbacks in showCamera function
// Success: do something if the device has a camera
// Cancel: when the user cancels camera
// Error: if device does not have camera capabilities

var win = Titanium.UI.createWindow({
	title:"Camera Window",
	backgroundColor:"#FFFFFF",
	exitOnClose:true
})

Titanium.Media.showCamera({
	success:function(usrcam){
		if (usrcam.mediaType === Titanium.Media.MEDIA_TYPE_PHOTO){
			// User is taking a photo
			var imageView = Titanium.UI.createImageView({
				image:usrcam.media,
				width:'auto',
				height:'auto',
				zIndex:1
			})
			win.add(imageView);
		}
	},
	
	cancel:function(){
		//do nothing. user cancels
	},
	error:function(error){
		// create error
		var a = Titanium.UI.createAlertDialog({title:'Camera'});
		
		// set a message
		if (error.code = Titanium.Media.NO_CAMERA){
			//a.setmessage('Device does not have camera capabilities...');
			openGallery();
		}
		else{
			a.setMessage('Unexpected Error: ' + error.code)
		}
		a.show();
	},
	allowEditing:true,
	saveToPhotoGallery:true,
	mediaTypes:[Titanium.Media.MEDIA_TYPE_PHOTO],
	videoQuality:Titanium.Media.QUALITY_HIGH
})

//Open gallery function
function openGallery(){
	Titanium.Media.openPhotoGallery({
				success:function(usrgal){
					if (usrgal.mediaType === Titanium.Media.MEDIA_TYPE_PHOTO){
						// use chosen photo in window
						var imageView = Titanium.UI.createImageView({
							image:usrgal.media,
							width:'auto',
							height:'auto',
							zIndex:1
						})
						win.add(imageView);
					}
				},
				
				cancel:function(){
					
				},
				error:function(error){
					
				},
				allowEditing:true
			})
}
	