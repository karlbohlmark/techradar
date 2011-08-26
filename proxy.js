var request = require('request');
var http = require('http');
http.createServer(function(req, res){
  console.log(req.url);
  if (req.method === 'GET' && /^\/couch/.test(req.url)) {
    var r = request.get('http://localhost:5984' + req.url.replace('/couch', '')) 
    req.pipe(r);
    r.pipe(res);
  }else{
    r = request.get('http://localhost:9393' + req.url);
    req.pipe(r);
    r.pipe(res);
  }  
}).listen(8001);
