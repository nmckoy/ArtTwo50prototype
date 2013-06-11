/*
 * As of right now this file is not being used
 * 
 * Scrollable View for Artist Browising and JSON parsing
 */ 
 
function ArtBrowsing() {
	var browseview = Ti.UI.createImageView({
		backgroundColor: '#000000',
		width: 300,
		height: 300
	})
	
	var artworks = [];
	
	// Titanium HTTP API
	var xhr = Ti.Network.createHTTPClient();
	
	xhr.onload = function(){
		var json = JSON.parse(xhr.responseText);
		
		for (var i = 0; i < json.length; i++) {
			var container = Ti.UI.createView();
			
			var artview = Ti.UI.createImageView({
				image: json[i].artwork_image.url,
				top:0,
				bottom:0,
				left:0,
				right:0
			})
			
			container.add(artview);
			
			artworks.push(container);
		}
		
		var artscroll = Ti.UI.createScrollableView({
			views: artworks,
			maxZoomScale:4.0
		})
		
		browseview.add(artscroll);
	}
	
	xhr.onerror = function(){
		alert ("Error reading data");
	}
	
	xhr.open("GET", "http://www.arttwo50.com/artworks/query.json");
	xhr.send();
	
	return browseview;
	
}

module.exports = ArtBrowsing