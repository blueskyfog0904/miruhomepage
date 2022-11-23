const express = require('express')
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser')
var path = require('path')
var qs = require('querystring'); 
var sanitizeHtml = require('sanitize-html');
const session = require('express-session');
const FileStore = require('session-file-store')(session);


const { imgList } = require('../lib/template.js');
const template = require('../lib/template.js');
const { format } = require('path');



router.use(bodyParser.urlencoded({extended:false}));
router.use(session({
  secret:'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}));

router.get('/logout', function(request,response){
  request.session.destroy(function(){
    request.session;
  })
  response.redirect('/')
})

router.get('/work', function(request,response){
  if(request.session.user){
    var form =
    `
    <main class="main">
    <br><br><br><br><br>
      <form action='/work_mkdir' method='post' class='form_work_mkdir'>
        Create Directory <br><input type="text" name="mkdir" placeholder="Input Directory Name"><br>
        Project Description <br><textarea name="mkdirDescription" placeholder="Input Description" cols="150" rows="10"></textarea><br>        
        <input type="submit" value="create">
      </form>
    </main>
    <br><br><br><br><br>
    `;
    var list = template.list(request.list);
    var html = template.htmlLogin(list, form);
    response.send(html);

  }
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
  fs.readdir('./public/artwork/1_project1/images', function(err, imglist){
    console.log(imglist)
    var imageList = template.imgList(imglist)
    
  body=
  `
  <main class="main">
      <div id="imgSlide">        
        ${imageList}
      </div>
        
    </main>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
  `;
  var list = template.list(request.list)  
  var html = template.htmlLogin(list, body);
  response.send(html);
  })
} else{
  fs.readdir('./public/artwork/1_project1/images', function(err, imglist){
    console.log(imglist)
    var imageList = template.imgList(imglist)
  body=
  `
  <main class="main">
      <div id="imgSlide">        
        ${imageList}
      </div>
        
    </main>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
  `;
  var list = template.list(request.list)  
  var html = template.html(list, body);          
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


router.get('/biography', function(request, response){  
  if(request.session.user){    
    fs.readFile(path.join(__dirname, '../public/menu/biography/content/explain'), 'utf8', function(err, explain){
      var biographyExplain = explain;    
        fs.readFile(path.join(__dirname, '../public/menu/biography/content/history'), 'utf8', function(err, history){
          
          var biographyHistory = history;
          var body =          
          `          
          <main class="main">
          <form action='/biography_process' method='post' class='form_biography'>
            Biography Title<br><textarea name="explain" cols="150" rows="10">${biographyExplain}</textarea><br>
            Biography Content<br><textarea name="history" cols="150" rows="10">${biographyHistory}</textarea><br>
            <input type="submit" value="update"></input>
          </form>
          <br><br>
              <div class="biography">
                <h5 class="subtitle">Biography</h5>
                <br><br><br><br><br>
                <pre>
${biographyExplain}
                </pre>
                <br><br>
                <hr>
                <br><br>
                <pre>
${biographyHistory}
        
                </pre>
                
                
              </div>
                
              </div>
            </main>
          `;
          var list = template.list(request.list)  
          var html = template.htmlLogin(list, body);    
          response.send(html);          
        })
    })
    }else{
      fs.readFile(path.join(__dirname, '../public/menu/biography/content/explain'), 'utf8', function(err, explain){
        var biographyExplain = explain;    
          fs.readFile(path.join(__dirname, '../public/menu/biography/content/history'), 'utf8', function(err, history){
            var biographyHistory = history;
            var body =
            `
            <main class="main">
                <div class="biography">
                  <h5 class="subtitle">Biography</h5>
                  <br><br><br><br><br>
                  <pre>
${biographyExplain}
                  </pre>
                  <br><br><br><br><br>
                  <hr>
                  <br><br><br><br><br>
                  <pre>
${biographyHistory}
          
                  </pre>
                  
                  
                </div>
                  
                </div>
              </main>
            `;
            var list = template.list(request.list)  
            var html = template.html(list, body);          
            response.send(html);
    })   
  })
}
})

router.post('/biography_process', function(request, response){
  var biographyExplain= request.body.explain;
  var biographyHistory = request.body.history;
  fs.writeFile(path.join(__dirname, '../public/menu/biography/content/explain'), biographyExplain, 'utf8', function(err){
    fs.writeFile(path.join(__dirname, '../public/menu/biography/content/history'), biographyHistory, 'utf8', function(err){
      response.redirect("/biography")
    })
  })

})

router.get('/contact', function(request, response){
  body=
  `
  <main class="main">
      <div class="contact">
        <div class="contact1">
          <h4>AUTRALIA</h4><br>
          <p>ReadingRoom</p>
          <p>186 High Street</p>
          <p>VIC3070</p>
          <p>Austrailia</p>
          <p>areadububgroom.com</p>
        </div>
        <div class="contact1">
          <h4>AUTRALIA</h4><br>
          <p>ReadingRoom</p>
          <p>186 High Street</p>
          <p>VIC3070</p>
          <p>Austrailia</p>
          <p>areadububgroom.com</p>
        </div>
        <div class="contact1">
          <h4>AUTRALIA</h4><br>
          <p>ReadingRoom</p>
          <p>186 High Street</p>
          <p>VIC3070</p>
          <p>Austrailia</p>
          <p>areadububgroom.com</p>
        </div>
        
      </div>
    </main>
  `;

  var list = template.list(request.list)  
  var html = template.html(list, body);          
  response.send(html);
})


module.exports = router;