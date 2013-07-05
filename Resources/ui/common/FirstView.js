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
        zIndex:3
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
    
     /*
     * DRAG OVER COLLECTION BAR LOGIC
     */
     //Boolean functions to check the 'overlappers' x and y values against
     //the min and max x and y values of the 'overlappee'
     function valueInRange(value, min, max) {
          return (value >= min) && (value <= max);
     }
     function viewOverlap(A, B) {
          var xOverlap = valueInRange(A.x, B.x, B.x /*+ B.width*/) || valueInRange(B.x, A.x, A.x /*+ A.width*/);
          var yOverlap = valueInRange(A.y, B.y, B.y /*+ B.height*/) || valueInRange(B.y, A.y, A.y /*+ B.height*/);
          return xOverlap && yOverlap;
     }
    
    // holds artworks, artwork copies, and labels for detailwindow
    var artworks = [], artworks2 = [], artworks3 = [], labels = [];
    
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
            for (var k = 0; k < artworks2.length; k++){
                var iterated_views = artworks2[k];
                //just to tell us visibly that overlap has happened
                    function updateUI() {
                        if (viewOverlap(collection1.rect, artworks2[k].rect)) {
                            //collection1.opacity = 0.5;
                            var num = artscroll.currentPage;
                            collection1.add(artworks2[num]);
                            if (collection1.children) {
                                for (var i = 0; i < collection1.children.length; i++) {
                                    if (collection1.children[i] !== undefined) {
                                        collection1.remove(collection1.children[i]);
                                    }
                                }
                            }
                        var blob = win.toImage();
                        var render = Ti.UI.createImageView({
                            image: blob.imageAsCropped({x:1, y:1, width:1300, height:650}),
                            width: '50%',
                            height: '50%',
                            zIndex: 0
                        });
                        sharewin.add(render);
                        buywindow.add(render);
                        } else {
                            //collection1.opacity = 1;
                            alert("Drag the image into the collection");
                        }
                  }
            }
            container.addEventListener('start', function(e){
                //container.setOpacity(0.5);
            })
            container.addEventListener('end', updateUI);
            
            
            //artworks and artwok copies
            var artview = Ti.UI.createImageView({image: artists.artwork_image.artwork_image.ipad_display.url}),
                detailcopy = Ti.UI.createImageView({image: artists.artwork_image.artwork_image.ipad_display.url}),
                sharecopy = Ti.UI.createImageView({image: artists.artwork_image.artwork_image.ipad_display.url, width: '40%', height: '40%'});
             
            // details for artworks in detailwindow    
            var textview = Ti.UI.createView({
                height: '100%',
                width: 450, left: 0, 
                zIndex:5}),
                
                title = Ti.UI.createLabel({
                    text: artists.title,
                    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
                    font: { fontSize:26 },
                    left: 20, top: 30, width: 450,
                    zIndex: 4, 
                    color: '#FFFFFF'}),
                    
                name = Ti.UI.createLabel({
                    text: artists.artist.user_profile.first_name + " " + artists.artist.user_profile.last_name, //message = "'null' is not an object (evaluating 'artists.artist.user_profile.first_name')";
                    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
                    font: { fontSize:14 }, 
                    left: 20, top: 100, width: 450, 
                    zIndex: 4, 
                    color: '#FFFFFF'}),
                    
                genre = Ti.UI.createLabel({
                    text: 'GENRE:' + " " + artists.genre.name,
                    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
                    font: { fontSize:16 },
                    left: 20, top: 140, width: 450,
                    zIndex: 4,
                    color: '#FFFFFF'}),
                    
                description = Ti.UI.createLabel({
                    text: artists.description,
                    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
                    font: { fontSize: 16 },
                    left: 20, top: 190, width: 410,
                    zIndex: 4,
                    color: '#FFFFFF'});
                                            
            // this is a null value check. UIlabel texts cant process null values.
            if (artists.artist.user_profile.first_name == null && artists.artist.user_profile.last_name == null) { //this one doesnt check right
                artists.artist.user_profile.first_name = "anonymous";
                artists.artist.user_profile.last_name = "";
            } else if (artists.artist.user_profile.first_name == null) {
                artists.artist.user_profile.first_name = "";
            } else if (artists.artist.user_profile.last_name == null) {
                artists.artist.user_profile.last_name = "";
            };
            
            
            // ScrollableView elements require it to be an actual view
            // put images in a view and put views in the array
            container.add(artview);
            artworks.push(container);
           
            artworks3.push(sharecopy);
            artworks2.push(detailcopy);
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
        });
        
        artscroll.setZIndex(2);
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
            }),
        
            //Art info view and labels container
            detailview = Ti.UI.createView({
                backgroundColor: '#000000',
                height: Ti.UI.FILL,
                width: 450,
                left:0,
                opacity: 0.5,
                zIndex: 1
            }),
        
            //close button
            closebtn = Ti.UI.createButton({
                title: 'X',
                top: -1,
                right: -1,
                width: 40,
                height: 40,
                opacity: 0.5,
                zIndex: 2
            });
        detailwindow.add(detailview);
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
        shareclosebtn.addEventListener('click', function(){
            sharewin.close();
        })
        
        //twitter stuff
        Ti.include('/ui/common/birdhouse.js');
        var BH = new BirdHouse({
            consumer_key : "AbaGy7Q5iQSZhDbOvngWPA",
            consumer_secret : "1MeG63k4ZsiojUF9Xh3MGAyKe48iJ00BlB1rUDrnduA",
            callback_url : "http://www.arttwo50.com"
        });
        
        //facebook sharing
        var fb = require('facebook');
        fb.appid = 160790730773041;
        fb.permissions = ["publish_stream"];
        
        var data = {
            message: 'a pic',
            picture: artworks2[0] // win.toImage() blob or 'render' in line 139
        };
        sharetofb.addEventListener('click', function(){
           fb.authorize();
           Titanium.Facebook.requestWithGraphPath('me/photos', data, 'POST', function(e){
               if (e.success){
                   alert('Posted Artwork!');
               } else if (e.error){
                   alert(e.error);
               } else {
                   alert('Something went wrong');
               }
           })
        })
        sharetotwit.addEventListener('click', function(){
            if (BH.authorize == true){
                BH.sendTwitterImage({
                    media: artworks2[1]
                })
            }
        })
        purchasebtn.addEventListener('click', function(){
            buywindow.open();
        });
        cardIOopen.addEventListener('click', function(){     
            var ti_cardio = require('ti.cardio');
            Ti.API.info("module is => " + ti_cardio);
            
            ti_cardio.scanCard("627a52c5a88246299e375899fb10a541", function(data){
                Ti.API.info(' info ' + JSON.stringify(data));
            });
        })
        closepurchase.addEventListener('click', function(){
            buywindow.close();
        });
        
    }
    
    //JSON error
    xhr.onerror = function(){
        alert ("Error reading artwork data");
    }
    
    xhr.open("GET", "http://www.arttwo50.com/artworks/query.json?distance=close&limit=2&size=small");
    xhr.send(); // asynchronous call
           /*
            * END ARTWORK BROWSING
            * 
            */
           
           
    // Collection Bar View    
    var collectionbar = Ti.UI.createView ({
       backgroundColor: '#232528',
       borderRadius: 20,
       width: 400,
       height: 100,
       bottom: -10,
       opacity: 0.7,
       zIndex: 1
    });
    win.add(collectionbar);
    
    // collection views within bar
    var collection1 = Ti.UI.createView ({backgroundColor: /*'#101316'*/'green', width: 70, height: 70, left: 30, zIndex: 1}),
        collection2 = Ti.UI.createView ({backgroundColor: '#101316', width: 70, height: 70, left: 120, zIndex: 1}),
        collection3 = Ti.UI.createView ({backgroundColor: '#101316', width: 70, height: 70, left: 210, zIndex: 1}),
        collection4 = Ti.UI.createView ({backgroundColor: '#101316', width: 70, height: 70, left: 300, zIndex: 1});
    collectionbar.add(collection1);
    collectionbar.add(collection2);
    collectionbar.add(collection3);
    collectionbar.add(collection4);  
    

    
    var sharebtn = Ti.UI.createButton({
            title: 'share',
            width: 90, height:50,
            bottom:10,
            right: 160,
            zIndex: 3
        }),
        sharewin = Ti.UI.createWindow({
            backgroundColor: "#004c5e",
            width: '90%',
            height: '90%',
        }),
        shareclosebtn = Ti.UI.createButton({
            title: 'X',
            top: -1,
            right: -1,
            width: 40, height: 40,
            opacity: 0.5,
            zIndex: 2
        }),
        sharetofb = Ti.UI.createButton({
            title: 'sharefb',
            width: 200, height: 100,
            right: 20,
            bottom: 10,
            zIndex: 2
        }),
        sharetotwit = Ti.UI.createButton({
            title: 'sharetwit',
            width: 200, height: 100,
            right: 20,
            top: 10,
            zIndex: 2
        })
    sharewin.add(sharetotwit);
    sharewin.add(shareclosebtn);
    sharewin.add(sharetofb);    
    win.add(sharebtn);
    
    sharebtn.addEventListener('click', function(){
        sharewin.open();
    })

    var buywindow = Ti.UI.createWindow({
            backgroundColor: "#004c5e",
            width: '90%',
            height: '90%',        
        }),
        purchasebtn = Ti.UI.createButton({
            title: 'purchase',
            width: 90, height:50,
            bottom: 10,
            right: 30,
            zIndex: 3
        }),
        closepurchase = Ti.UI.createButton({
            title: 'X',
            top: -1,
            right: -1,
            width: 40, height: 40,
            opacity: 0.5,
            zIndex: 2
        }),
        cardIOopen = Ti.UI.createButton({
            title: 'buy',
            width: 200, height: 100,
            right: 20,
            bottom: 10,
            zIndex: 2
        })
    buywindow.add(cardIOopen);
    buywindow.add(closepurchase);
    win.add(purchasebtn);
	// calls camera functionality   
	Ti.include("Camera.js");
	
	return win;
}

module.exports = FirstView;
