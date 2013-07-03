// checks if view is over another when dragged
var v = require('ti.draggable');

/*****
 * Boolean functions to check the 'overlappers' x and y values against
 * the min and max x and y values of the 'overlappee'
 * 
 */ 
function valueInRange(value, min, max) {
    return (value >= min) && (value <= max);
}
 
function viewOverlap(A, B) {
    var xOverlap = valueInRange(A.x, B.x, B.x /*+ B.width*/) || valueInRange(B.x, A.x, A.x /*+ A.width*/);
    var yOverlap = valueInRange(A.y, B.y, B.y /*+ B.height*/) || valueInRange(B.y, A.y, A.y /*+ B.height*/);
    return xOverlap && yOverlap;
}
 
//just to tell us visibly that overlap has happened
function updateUI() {
    if (viewOverlapOverlap(v1.rect, v2.rect)) {
        v1.opacity = 0.5;
    } else if (viewOverlap(v1.rect, v3.rect)) {
        v1.opacity = 0.5;
    } else {
        v1.opacity = 1;
    }
    
}
 
var win = Ti.UI.createWindow({
    backgroundColor: '##4c4c4c',
    fullscreen: true
});
 
var v1 = Ti.UI.createView({
    bottom: 20,
    width: '30%',
    height: '30%',
    backgroundColor : 'green'
});

var v3 = v.createView({
    width: '20%',
    height: '20%',
    backgroundColor : 'blue'
});
 
var v2 = v.createView({
    width: '20%',
    height: '20%',
    backgroundColor: 'yellow'
    //backgroundImage: 'http://com.arttwo50.s3-us-west-2.amazonaws.com/production/uploads/artwork/artwork_image/551/ipad_display_IMG_8021.jpg',
});

var scroll = Ti.UI.createScrollableView({
    views:[v2, v3],
    showPagingControl: true
})
 
v2.addEventListener('end', updateUI);
v2.addEventListener('end', function(){
    v3.setTop(40);
});
//v2.addEventListener('move', updateUI);
v3.addEventListener('end', updateUI);
v3.addEventListener('end', function(){
    v3.setTop(40);
});
//v3.addEventListener('move', updateUI);
 
win.add(v1);
win.add(scroll);
win.open();