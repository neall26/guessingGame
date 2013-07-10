
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('game 3001'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
//app.get('/users', user.list);
//app.get('/start', routes.start);
//app.get('/Batcave',routes.Batcave);
//app.get('/Batman',routes.Batman);
//app.get('/Bruce',routes.Bruce);
//app.get('/Martha',routes.Martha);
//app.get('/Thomas',routes.Thomas);
//app.get('/firstguess',routes.firstguess);
//app.post('/guessHandler', routes.startview);
app.get('/guessHandler', routes.guessHandler);
app.post('/guessHandler', routes.guessHandler);
app.post('/', routes.index);
app.post('/startview', routes.startview);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
