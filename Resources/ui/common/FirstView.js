//FirstView Component Constructor
function FirstView() {
    
    //require the Draggable module please
    var drag = require('ti.draggable');
	
	var win = Ti.UI.createWindow({
        title : "ArtTwo50",
        backgroundColor : "#000000",
        width: '100%',
        height: '100%',
        fullscreen: true
    });
	
	// open photos button
	var btn = Ti.UI.createButton({
	    title: "photo",
        width:125,
        height:50,
        bottom:10,
        left:50,
        zIndex:5
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
    var labels = [];
    // Titanium HTTP API
    var xhr = Ti.Network.createHTTPClient();
    
    // success on JSON
    xhr.onload = function(){
        var json = JSON.parse(xhr.responseText);
        for (var i = 0; i < json.length; i++) {
            var artists = json[i];
            // the container view to put the art image into for scrollable view
            // the scrollable view image can be dragged with .drag
            var container = drag.createView({
                width: '30%',
                height: '30%',
                top: 50,
                zIndex: 0
            });
            var artview = Ti.UI.createImageView({
                image: artists.artwork_image.ipad_display.url
            });
            var copy = Ti.UI.createImageView({
                image: artists.artwork_image.ipad_display.url
            })
            var textview = Ti.UI.createView({
                height: '100%',
                width: 450,
                left: 0,
                zIndex:5
            })
            var title = Ti.UI.createLabel({
                text: artists.title,
                textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
                font: { fontSize:26 },
                left: 20,
                top: 30,
                width: 450,
                zIndex: 4,
                color: '#FFFFFF'
            })
            
            // this is a null value check. UIlabel texts cant process null values. this does not work right yet lol
            if (artists.user_profile.first_name == null && artists.user_profile.last_name == null) {
                artists.user_profile.first_name = "anonymous";
                artists.user_profile.last_name = "";
            } else if (artists.user_profile.first_name == null) {
                artists.user_profile.first_name = "";
            } else if (artists.user_profile.last_name == null) {
                artists.user_profile.last_name = "";
            };

            var name = Ti.UI.createLabel({
                text: artists.user_profile.first_name + " " + artists.user_profile.last_name,
                textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
                font: { fontSize:14 },
                left: 20,
                top: 100,
                width: 450,
                zIndex: 4,
                color: '#FFFFFF'
            })
            var genre = Ti.UI.createLabel({
                text: 'GENRE:' + " " + artists.genre.name,
                textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
                font: { fontSize:16 },
                left: 20,
                top: 140,
                width: 450,
                zIndex: 4,
                color: '#FFFFFF'
            })
            var description = Ti.UI.createLabel({
                text: artists.description,
                textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
                font: { fontSize: 16 },
                left: 20,
                top: 190,
                width: 410,
                zIndex: 4,
                color: '#FFFFFF'
            })
            
            
            // ScrollableView elements require it to be an actual view
            // put images in a view and put views in the array
            container.add(artview);
            artworks.push(container);
            
            artworks2.push(copy);
            textview.add(title);
            textview.add(name);
            textview.add(genre);
            textview.add(description);
            labels.push(textview);
            
            artview.addEventListener('click', function() {
                var num = artscroll.currentPage;
                detailwindow.add(artworks2[num]);
                detailwindow.add(labels[num]);
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
        
        //Art info view and labels container
        var detailview = Ti.UI.createView({
            backgroundColor: '#000000',
            height: Ti.UI.FILL,
            width: 450,
            left:0,
            opacity: 0.5,
            zIndex: 1
        })
        detailwindow.add(detailview);
        
        //close button
        var closebtn = Ti.UI.createButton({
            title: 'X',
            top: -1,
            right: -1,
            width: 40,
            height: 40,
            opacity: 0.5,
            zIndex: 2
        });
        detailwindow.add(closebtn);
        
            /*
             * Detail Window Click actions
             */
        closebtn.addEventListener('click', function(){
            var num = artscroll.currentPage;
            detailwindow.remove(artworks2[num]);
            detailwindow.remove(labels[num]);
            detailwindow.close();
        });
        
    // Collection Bar View    
    var collectionbar = Ti.UI.createView ({
       backgroundColor: '#232528',
       borderRadius: 20,
       width: 400,
       height: 100,
       bottom: -10,
       zIndex: 6
    });
    win.add(collectionbar);
    
    // collection views within bar
    var collection1 = Ti.UI.createView ({backgroundColor: '#101316', width: 70, height: 70, left: 30, zIndex: 1});
    var collection2 = Ti.UI.createView ({backgroundColor: '#101316', width: 70, height: 70, left: 120, zIndex: 1});
    var collection3 = Ti.UI.createView ({backgroundColor: '#101316', width: 70, height: 70, left: 210, zIndex: 1});
    var collection4 = Ti.UI.createView ({backgroundColor: '#101316', width: 70, height: 70, left: 300, zIndex: 1});
    collectionbar.add(collection1);
    collectionbar.add(collection2);
    collectionbar.add(collection3);
    collectionbar.add(collection4);
    
    
    
    
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
