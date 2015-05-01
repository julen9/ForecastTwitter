var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  ,Twit = require('twit')
  ,r00=0
  ,r10=0
  ,r20=0
  ,r01=0
  ,r02=0
  ,r11=0
  ,r22=0
  ,r12=0
  ,r21=0
  , io = require('socket.io').listen(server);

server.listen(8080);

// routing
app.get('/', function (req, res) {
res.sendFile(__dirname + '/index.html');
});

//watchlist contains any tweet whit this words
var watchList = ['chelsea PSG 0-0', 'chelsea PSG 1-0', 'chelsea PSG 2-0', 'chelsea PSG 0-1',
'chelsea PSG 0-2', 'chelsea PSG 1-1', 'chelsea PSG 1-2', 'chelsea PSG 2-1', 'chelsea PSG 2-2'];

//var watchList = ['hate', 'love'];
 
 var T = new Twit({
    consumer_key:         'your twitter api key'
  , consumer_secret:      'your twitter api key'
  , access_token:         'your twitter api key'
  , access_token_secret:  'your twitter api key'
})

io.sockets.on('connection', function (socket) {
  console.log('Connected');


 var stream = T.stream('statuses/filter', { track: watchList });

  stream.on('tweet', function (tweet) {

    var text = tweet.text.toLowerCase();
    if (text.indexOf('00') !== -1) {
      r00=r00+0.5
      io.sockets.emit('00',r00);
    }

    if (text.indexOf('10') !== -1) {
      r10 = r10+0.5
      io.sockets.emit('10',r10);
    }

    if (text.indexOf('2-0') !== -1) {
      r20 = r20+0.5
      io.sockets.emit('20',r20);
    }

    if (text.indexOf('0-1') !== -1) {
      r01 = r01+0.5
      io.sockets.emit('01',r01);
    }

    if (text.indexOf('0-2') !== -1) {
      r02 = r02+0.5
      io.sockets.emit('02',r02);
    }

    if (text.indexOf('1-1') !== -1) {
      r11 = r11+0.5
      io.sockets.emit('11',r11);
    }

    if (text.indexOf('2-2') !== -1) {
      r22 = r22+0.5
      io.sockets.emit('22',r22);
    }

    if (text.indexOf('1-2') !== -1) {
      r12 = r12+0.5
      io.sockets.emit('12',r12);
    }

      if (text.indexOf('2-1') !== -1) {
      r21 = r21+0.5
      io.sockets.emit('21',r21);
    }




    

    //io.sockets.emit('stream',tweet.text);
    
    

    //console.log(tweet.text);


  });


    var initResults = [r00,r10,r20,r01,r02,r11,r22,r12,r21];
    io.sockets.emit('initChart',initResults);

 });
