/**
 * Created by youxiachai on 14-3-18.
 */


/**
 * Module dependencies.
 */

var NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'localhost';

var config = require('./config/multipart-' + NODE_ENV);


var express = require('express'),
    multipart = require('connect-multiparty'),
    crossOrigin = require('express-cross-origin')({
        origin : '*'
    }),
    multipartMiddleware = multipart(config),
    path = require('path'),
    http = require('http');

var app = express();

// bodyParser in connect 2.x uses node-formidable to parse
// the multipart form data.

app.set('port', 5000);

app.use(express.logger('dev'));

app.use(crossOrigin);

app.use(express.static(__dirname + '/static/'));


app.get('/', function (req, res) {
    res.send('<form method="post" enctype="multipart/form-data">'
        + '<p>Title: <input type="text" name="title" /></p>'
        + '<p>Image: <input type="file" name="image" /></p>'
        + '<p><input type="submit" value="Upload" /></p>'
        + '</form>');
});

app.post('/', multipartMiddleware, function (req, res) {

    res.json({
        host : '',
        dir : 'static',
        name : path.basename(req.files.image.path),
        url : '' + 'static/' +  path.basename(req.files.image.path)});

});

app.use(function (err, req, res, next){
    console.log('handle error')
    console.error(err.stack);
    res.send(500, 'Something broke!');

})


http.createServer(app).listen(app.get('port'), function () {
    console.log('env: ' + process.env.NODE_ENV);
    console.log('Express server listening on port ' + app.get('port'));
});
