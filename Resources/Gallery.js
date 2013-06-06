//Open gallery function
//Works the same way as showCamera

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
				saveToPhotoGallery : true,
				allowEditing : true,
				mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
				videoQuality:Titanium.Media.QUALITY_HIGH
			})