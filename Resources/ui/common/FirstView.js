

//The FirstView!!!
function FirstView() {
	var win = Ti.UI.createWindow({
		title : "ArtTwo50",
		backgroundColor : "#000000",
		width: '100%',
		height: '100%',
		fullscreen: true
	})
	
	/*
	 * 	Trying to get this code not to look messy is confusing
	 *  on howing to understand views and view hierarchy
	 *  
	 *  ---------------------------------------------------------
	 * I am trying to add different views to the main window 'win' using .require
	 * but when a view is added on top of other views it becomes the only
	 * one that is responsive
	 */
	
	/*
	 *  THIS STARTS THE NEW PHOTO BUTTON UI AND LOGIC
	 * 
	 */
	
	// photos button
	var button = Titanium.UI.createButton({
		title: "photo",
		width:125,
		height:50,
		bottom:10,
		left:50,
		zIndex:3
	})
 	win.add(button);
	
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
							width:win.width,
							height:win.height,
							zIndex:0
						})
						win.add(imageView);
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
	
	
	/*
	 * THIS IS THE START OF THE ARTWORK BROWSING
	 * 
	 * 
	 */
	
	var artworks = [];
	
	// Titanium HTTP API
	var xhr = Ti.Network.createHTTPClient();
	
	xhr.onload = function(){
		var json = JSON.parse(xhr.responseText);
		
		for (var i = 0; i < json.length; i++) {
			var container = Ti.UI.createView();
			
			var artview = Ti.UI.createImageView({
				image: json[i].artwork_image.url,
				width:'50%',
				height: '50%',
				top: 30
			})
			
			container.add(artview);
			
			artworks.push(container);
		}
		
		var artscroll = Ti.UI.createScrollableView({
			views: artworks
		})
		artscroll.setZIndex(2);
		win.add(artscroll);
	}
	
	xhr.onerror = function(){
		alert ("Error reading data");
	}
	
	xhr.open("GET", "http://www.arttwo50.com/artworks/query.json");
	xhr.send();
	
	//calls camera function
	Ti.include("Camera.js");
	
	return win;
	
}


module.exports = FirstView;




