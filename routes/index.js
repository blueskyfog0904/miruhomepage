const express = require('express')
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser')
var path = require('path')
var qs = require('querystring'); 
var sanitizeHtml = require('sanitize-html');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const multer = require('multer')


const { imgList } = require('../lib/template.js');
const template = require('../lib/template.js');
const { format } = require('path');

// storage
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb)=>{
    console.log(file.filename);
    console.log(req.body);
    console.log(req.body.id);
    console.log(req.body.prj_code);
    let id = req.body.id;
    let prj_code = req.body.prj_code;

    var dir= path.join(__dirname, `../public/slideimg/`)

    cb(null, dir);
  },
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: fileStorageEngine

})

router.use(bodyParser.urlencoded({extended:false}));
router.use(session({
  secret:'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}));





router.post('/slideshow/delete_process', function(request, response){
    var imgname = request.body.imgname;    
    fs.unlink(path.join(__dirname, `../public/slideimg/${imgname}`), function(err){
      response.redirect('/slideshow')
    })
})

router.post('/slideshow/upload_process', upload.single('imgfile'), function(request,response){
  response.redirect('/slideshow')
})

router.get('/slideshow/upload', function(request, response){
  var body=
  `
  <h1> Upload slide image! </h1>
  <form action="/slideshow/upload_process" method="post" enctype="multipart/form-data">
    <input type="file" name="imgfile" accept="image/*" required/><br>
    <input type="submit" value="upload">
  </form>
  `;
  var uploadPage = template.basicPage(body);
  response.send(uploadPage);

})




router.get('/contact', function(request,response){
  if(request.session.user){
    var body=
    `
    <main class="main">
      <div id="contact">
      <div id="contactleft">
        <pre>
pleaes contact me this number.
thank you!
blah
blah
blah
        </pre>
        </div>
        <div id="contactright">
          <label for="Name">Name:</label>
          <input class="contactform" type="text" placeholder="Full Name" required/><br>
          
          <label for="Email">Email:</label>
          <input class="contactform" type="email" placeholder="Email" required/><br>
          
          <label for="Message">Message:</label>
          <textarea class="contactform" placeholder="Message" rows="10" required></textarea><br>
          <button class="contactform" style="margin-left:110px" >send</button>
        </div>
      </div>
    <br><br><br><br>
    </main>
      
    `;
    var list=template.list(request.list);    
    var studiolist = template.studiolist(request.studiolist);    
    var html = template.htmlLogin(list, studiolist, body);
    response.send(html);

  } else{
    var body=
    `
    <main class="main">
      <div id="contact">
      <div id="contactleft">
        <pre>
pleaes contact me this number.
thank you!
blah
blah
blah
        </pre>
        </div>
        <div id="contactright">
          <label for="Name">Name:</label>
          <input class="contactform" type="text" placeholder="Full Name" required/><br>
          
          <label for="Email">Email:</label>
          <input class="contactform" type="email" placeholder="Email" required/><br>
          
          <label for="Message">Message:</label>
          <textarea class="contactform" placeholder="Message" rows="10" required></textarea><br>
          <button class="contactform" style="margin-left:110px" >send</button>
        </div>
      </div>
    <br><br><br><br>
    </main>
      
    `;
    var list=template.list(request.list);    
    var studiolist = template.studiolist(request.studiolist);    
    var html = template.html(list, studiolist, body);
    response.send(html);

  }
})





router.get('/slideshow', function(request,response){
  if(request.session.user){
    fs.readdir(path.join(__dirname, `../public/slideimg/`), function(err, imglist){      
      var slideimgList = template.slideimgList(imglist)      
      var body=
      `
        <main class="main">
        <a class="work_description" href="/slideshow/upload">upload</a>        

        <br><br><br>

        <div class="wrap">
          ${slideimgList}             
        </div>
        </main>
      `;
      var list=template.list(request.list);    
    var studiolist = template.studiolist(request.studiolist);    
    var html = template.htmlLogin(list, studiolist, body);
    response.send(html);


    })
  }
})

router.get('/logout', function(request,response){
  request.session.destroy(function(){
    request.session;
  })
  response.redirect('/')
})

router.get('/public/artwork/:pageId/pages/:pageName', function(request, response){
  var id = path.parse(request.params.pageId).base;
  var name = path.parse(request.params.pageName).base;
  response.sendFile(path.join(__dirname, `../public/artwork/${id}/pages/${name}`))
})

router.get('/public/studio/:pageId/project/:pageId2/pages/:pageName', function(request, response){
  var id1 = path.parse(request.params.pageId).base;
  var id2 = path.parse(request.params.pageId2).base;
  var name = path.parse(request.params.pageName).base;
  response.sendFile(path.join(__dirname, `../public/studio/${id1}/project/${id2}/pages/${name}`))
})


router.get('/work', function(request,response){
  if(request.session.user){
    var body =
    `
    <main class="main">
    <br><br><br><br><br>
      <form action='/work_mkdir' method='post' class='form_work_mkdir'>
        Create Directory <br><input type="text" name="mkdir" placeholder="Input Directory Name">
        <= ex) 001_foldername<br>
        Project Description <br><textarea name="mkdirDescription" placeholder="Input Description" cols="150" rows="10"></textarea><br>        
        <input type="submit" value="create">
      </form>
    </main>
    <br><br><br><br><br>
    `;
    var list=template.list(request.list);    
    var studiolist = template.studiolist(request.studiolist);    
    var html = template.htmlLogin(list, studiolist, body);
    response.send(html);


  }
})



router.get('/studio', function(request, response){
  if(request.session.user){
    var body=
    `
    <main class="main">
    <br><br><br><br><br>
      <form action='/studio_mkdir' method='post' class='form_work_mkdir'>
        Create Directory <br><input type="text" name="mkdir" placeholder="Input Directory Name">
        <= ex) 001_foldername<br>
        Project Description <br><textarea name="mkdirDescription" placeholder="Input Description" cols="150" rows="10"></textarea><br>        
        <input type="submit" value="create">
      </form>
    </main>
    <br><br><br><br><br>
    `;
    var list=template.list(request.list);    
    var studiolist = template.studiolist(request.studiolist);    
    var html = template.htmlLogin(list, studiolist, body);
    response.send(html);

  }
})

router.post('/studio/delete_processone', function(request,response){
  var id = request.body.id;
  fs.rmdir(path.join(__dirname, `../public/studio/${id}`), {recursive:true}, function(err){
    response.redirect('/')
  })
})

router.post('/studio/update_processone', function(request,response){
  var id = request.body.id;
  var des = request.body.updateDescription;

  fs.writeFile(path.join(__dirname, `../public/studio/${id}/description/${id}`), des, 'utf8', function(err){
    body =
        `
        Success to update ${id} description!<br>
        <a href='/'>To Mainpage</a>
        
        `;          
        var updatestudio = template.basicPage(body)        
        response.send(updatestudio)
  })

})

router.post('/studio_mkdir', function(request, response){  
  var dir = request.body.mkdir;  
  var des = request.body.mkdirDescription;
    var body =''
    fs.mkdirSync(path.join(__dirname, `../public/studio/${dir}`))
    fs.mkdirSync(path.join(__dirname, `../public/studio/${dir}/repre_img`))
    fs.mkdirSync(path.join(__dirname, `../public/studio/${dir}/description`))
    fs.mkdirSync(path.join(__dirname, `../public/studio/${dir}/project/`))
    fs.writeFile(path.join(__dirname, `../public/studio/${dir}/description/${dir}`), des, 'utf8', function(err){
      body =
        `
        Success to create ${dir} Folder!<br>
        <a href='/'>To Mainpage</a>
        
        `;          
        var mkdirPage = template.basicPage(body)        
        response.send(mkdirPage)
    })
    })   


router.post('/work_mkdir', function(request, response){  
  var dir = request.body.mkdir;  
  var des = request.body.mkdirDescription;
    var body =''
    fs.mkdirSync(path.join(__dirname, `../public/artwork/${dir}`))
    fs.mkdirSync(path.join(__dirname, `../public/artwork/${dir}/images`))
    fs.mkdirSync(path.join(__dirname, `../public/artwork/${dir}/pages`))
    fs.mkdirSync(path.join(__dirname, `../public/artwork/${dir}/description`))
    fs.writeFile(path.join(__dirname, `../public/artwork/${dir}/description/${dir}`), des, 'utf8', function(err){
      body =
        `
        Success to create ${dir} Folder!<br>
        <a href='/'>To Mainpage</a>
        
        `;          
        var mkdirPage = template.basicPage(body)        
        response.send(mkdirPage)
    })
    })    

    




router.get('/', function(request, response){
  if(request.session.user){
  fs.readdir('./public/slideimg', function(err, imglist){
    console.log(imglist)
    var imageList = template.imgList(imglist)
  body=
  `
  <main class="main">
      <div id="imgSlide">        
        ${imageList}        
      </div>      
      
    </main>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <a href="/slideshow" style="display:block; margin-left:200px">update slide show</a>
  `;
    var list=template.list(request.list);    
    var studiolist = template.studiolist(request.studiolist);    
    var html = template.htmlLogin(list, studiolist, body);
    response.send(html);

  })
} else{
  fs.readdir('./public/slideimg', function(err, imglist){
    console.log(imglist)
    var imageList = template.imgList(imglist)
  body=
  `
  <main class="main">
      <div id="imgSlide">        
        ${imageList}
      </div>
        
    </main>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
  `;
  var list=template.list(request.list);    
    var studiolist = template.studiolist(request.studiolist);    
    var html = template.html(list, studiolist, body);
    response.send(html);

})
}
})


router.get('/login', function(request, response){
  response.sendFile(path.join(__dirname, '../public/login.html'))
})
router.post('/login_process', function(request, response){
  var id = 'miru'
  var pw = 'miru1231'
  
  var inputId = request.body.id;
  var inputPw = request.body.pw;

  if (id === inputId && pw ===inputPw){
    var body=
    `    
      <h1>Login Success</h1>
      ${id}님 환영합니다!
      <br><br>      
      <a href='/'>To Mainpage</a>
    `;
    request.session.user={
      id: inputId,
      pw: inputPw,
      authorized: true
    }

    var loginProcessPage = template.basicPage(body);
  }else{
    var body=
    `
      <h1>Login Fail</h1>
      <a href='/'>To Mainpage</a>
    `;
    var loginProcessPage = template.basicPage(body)
    
  }
  response.send(loginProcessPage)

})

module.exports = router;