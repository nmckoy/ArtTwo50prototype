var v = require('ti.draggable');
 
function valueInRange(value, min, max) {
    return (value >= min) && (value <= max);
}
 
function rectOverlap(A, B) {
    var xOverlap = valueInRange(A.x, B.x, B.x + B.width) || valueInRange(B.x, A.x, A.x + A.width);
    var yOverlap = valueInRange(A.y, B.y, B.y + B.height) || valueInRange(B.y, A.y, A.y + B.height);
    return xOverlap && yOverlap;
}
 

var win = Ti.UI.createWindow({
    backgroundColor: '##4c4c4c',
    fullscreen: true
});
 
var v1 = Ti.UI.createView({
    bottom: 20,
    width: '15%',
    height: '15%',
    backgroundColor : 'green'
});
var views = [];
for (var i = 0; i < 3; i++){
    var v2 = v.createView({
        width: '30%',
        height: '30%',
        top: 60,
        backgroundColor: 'yellow'
    });
    
    //represents art image put into container
    var v3 = Ti.UI.createView({
        //bottom: 20,
        width: '15%',
        height: '15%',
        backgroundColor : 'red'
    });
    v2.add(v3);
    
    views.push(v2);
    v2.addEventListener('move', function(){
    //updateUI
    var num = scroll.currentPage;
        if (rectOverlap(v1.rect, views[num].rect)) {
            views[num].opacity = 0.5;
        } else {
            views[num].opacity = 1;
        }
    
    });
    v2.addEventListener('end', function(){
        var num = scroll.currentPage;
        views[num].setTop(60);
        views[num].opacity = 1;
    });
}


var scroll = Ti.UI.createScrollableView({
    views: views,
    showPagingControl: true
})


/*    function updateUI() {
        if (rectOverlap(v1.rect, views[num].rect)) {
            views[num].opacity = 0.5;
        } else {
            views[num].opacity = 1;
        }
    }
*/

 
var btn = Ti.UI.createButton({
    title: 'scrollview curr page',
    width: 150,
    height: 50,
    left: 10,
    bottom: 10,
    zIndex: 2
})

btn.addEventListener('click', function(){
    alert(scroll.currentPage);
})

win.add(btn);

 
win.add(v1);
win.add(scroll);
win.open();