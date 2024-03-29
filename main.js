window.$ = require('./node_modules/jquery/dist/node-jquery');
require('./lib/storage/sync');
var bus = require('./lib/bus').bus;
var radar = require('./lib/model/radar').radar;
var radarview =require('./lib/view/radarview.js');
var techview =require('./lib/view/techview.js');

var transform = require('transformjs');

$('input').keydown(function(e){
    if(e.keyCode==13){
        var val = $(this).val();
        $(this).val('');
        
        bus.emit('new-tech', {x:600, y:200, symbol: 'circle', title: val})
    }
})

$(document).delegate('a[data-command]', 'click', function(e){
    bus.emit('delete-tech', $(this).attr('data-command-arg'))
    return false;
})


