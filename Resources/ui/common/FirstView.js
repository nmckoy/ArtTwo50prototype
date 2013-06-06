 
 //global window

//FirstView 
function FirstView() {
	
	var win = Ti.UI.createWindow({
		title : "art250",
		backgroundColor : "#000000",
		width: '100%',
		height: '100%',
		fullscreen: true
	})
	
	var button = Titanium.UI.createButton({
		title: "open gallery",
		width:125,
		height:50,
		bottom:10,
		left:10,
		zIndex:2
	})
 	win.add(button);
	
	button.addEventListener("click", function(e){
		// calls gallery
		//Ti.include("Gallery.js"); //screw you
		
		// Nasty, sloppy drunk code. Ti.include() didnt work as i wanted
		// code insrterd with .include couldnt find win 
		Titanium.Media.openPhotoGallery({
				success:function(usrgal){
					if (usrgal.mediaType == Titanium.Media.MEDIA_TYPE_PHOTO){
						// use chosen photo in window
						var imageView = Titanium.UI.createImageView({
							image:usrgal.media,
							width:win.width,
							height:win.height,
							zIndex:1
						})
						win.add(imageView);
					}
				},
				
				cancel:function(){
					
				},
				error:function(error){
					alert("Too Bad. This can't happen");
				},
				allowEditing : true,
				mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
				videoQuality:Titanium.Media.QUALITY_HIGH
			})
	})
	
	//calls camera function
	Ti.include("Camera.js");
	return win;
	
}


module.exports = FirstView;




