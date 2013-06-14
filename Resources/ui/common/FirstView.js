//FirstView Component Constructor
function FirstView() {
	
	var win = Ti.UI.createWindow({
        title : "ArtTwo50",
        backgroundColor : "#000000",
        width: '100%',
        height: '100%',
        fullscreen: true
    });
	
	var btn = Ti.UI.createButton({
	    title: "photo",
        width:125,
        height:50,
        bottom:10,
        left:50,
        zIndex:2
	});
	win.add(btn);
	
	//open dialog box
    btn.addEventListener("click", function(e){
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
                        });
                        
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
                    });
                    alert.show();
                },
                allowEditing : true,
                mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
                videoQuality:Titanium.Media.QUALITY_HIGH,
                popoverView:btn
            });
        }
    });
    
    
    dialog.show({view:btn});
    });
    
        /*
     * THIS IS THE START OF THE ARTWORK BROWSING
     * 
     */
    
    var artworks = [];
    var artworks2 = [];
    // Titanium HTTP API
    var xhr = Ti.Network.createHTTPClient();
    
    // success on JSON
    xhr.onload = function(){
        var json = JSON.parse(xhr.responseText);
        for (var i = 0; i < json.length; i++) {
            var artists = json[i];
            var container = Ti.UI.createView({
                width: '30%',
                height: '30%',
                top: 50,
                zIndex: 0
            });
            var artview = Ti.UI.createImageView({
                image: artists.artwork_image.ipad_display.url
            });
            
            // ScrollableView elements require it to be an actual view
            // put images in a view and put views in the array
            container.add(artview);
            artworks.push(container);
            artworks2.push(artview)
            
            artview.addEventListener('click', function() {
                var num = artscroll.currentPage;
                detailwindow.add(artworks2[num]);
                detailwindow.open();
            });
    
	   }
	   var artscroll = Ti.UI.createScrollableView({
            views: artworks,
            maxZoomScale: 10,
            minZoomScale: 0.1,
        })
        artscroll.setZIndex(3);
        win.add(artscroll);
        
            /*
             *  ARTWORK DETAILS
             * 
             */
        var detailwindow = Ti.UI.createWindow({
            backgroundColor: '#000000',
            width: '100%',
            height: '100%',
            fullscreen: true
        });
        
        //close button
        var closebtn = Ti.UI.createButton({
            title: 'X',
            top: -1,
            right: -1,
            width: 40,
            height: 40,
            zIndex: 2
        });
        detailwindow.add(closebtn);
        
            /*
             * Detail Window Click actions
             */
        closebtn.addEventListener('click', function(){
            var num = artscroll.currentPage;
            detailwindow.remove(artworks2[num]);
            detailwindow.close();
        });
    }
    
    // JSON error
    xhr.onerror = function(){
        alert ("Error reading data");
    }
    
    xhr.open("GET", "http://www.arttwo50.com/artworks/query.json");
    xhr.send(); // asynchronous call
           /*
            * END ARTWORK BROWSING
            * 
            */
	
	// calls camera functionality   
	Ti.include("Camera.js");
	
	return win;
}

module.exports = FirstView;
