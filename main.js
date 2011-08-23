window.$ = require('./node_modules/jquery/dist/node-jquery');
window._ = require('./node_modules/underscore');
window.Backbone = require('./node_modules/backbone');
require('./lib/storage/Store');

require('./lib/model/Tech');
var techview =require('./lib/view/techview.js');
require('./lib/collection/TechList.js');

var techs = new TechList();
techs.add(new Tech());


var data = [
    {x:540, y:440, symbol:'circle', title: 'git'},
    {x:380, y:390, symbol: 'triangle', title: 'dojo'},
    {x:400, y:300, symbol: 'triangle', title: 'websockets'}];

function render(){
    techview.drawDots(data);
    var str="";
    data.forEach(function(i){
        str +='<li>' + i.title  + '</li>'
    })
    $('.techs').html(str);
}




render();

$('input').keydown(function(e){
    if(e.keyCode==13){
        var val = $(this).val();
        $(this).val('');
        data.push({x:200, y:200, symbol: 'circle', title: val});
        render();
    }
})




