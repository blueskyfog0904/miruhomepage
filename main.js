const express = require('express')
const app = express();
const fs = require('fs');
const url = require('url')
const qs = require('querystring'); 
const template = require('./lib/template.js');
const path = require('path')
const sanitizeHtml = require('sanitize-html');
const bodyParser = require('body-parser')
const compression = require('compression')
const session = require('express-session');
const FileStore = require('session-file-store')(session);
// const helmet = require('helmet')

const indexRouter = require('./routes/index.js');
const workRouter = require('./routes/work.js');
const aboutRouter = require('./routes/about.js')
const studioRouter = require('./routes/studio.js')

const { request } = require('http');

// app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended:false}));
app.use(compression());

// app.use(helmet());

// app.engine('html', requre('ejs').renderFile);
// app.set('view engine', 'html')

app.use(session({
  secret:'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}));

app.get('*', function(request,response,next){
  fs.readdir('./public/artwork/', function(err, filelist){
    request.list = filelist;    
    next();
  })
})

app.get('*', function(request,response,next){
  fs.readdir('./public/about/', function(err, aboutlist){
    request.aboutlist = aboutlist;
    next();
  })
})

app.get('*', function(request,response,next){
  fs.readdir('./public/studio/', function(err, stulist){
    request.studiolist = stulist;
    next();
  })
})


app.use('/', indexRouter);
app.use('/work', workRouter);
app.use('/about', aboutRouter)
app.use('/studio', studioRouter);


app.listen(3000);