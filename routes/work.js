const { create } = require('domain');
const express = require('express')
const router = express.Router();
const fs = require('fs');
var path = require('path')
var qs = require('querystring'); 
var sanitizeHtml = require('sanitize-html');
const multer = require('multer')


const template = require('../lib/template.js');
const { pageimgListLogin } = require('../lib/template.js');

// storage
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb)=>{
    console.log(file.filename);
    console.log(req.body);
    console.log(req.body.id);
    console.log(req.body.prj_code);
    let id = req.body.id;
    let prj_code = req.body.prj_code;

    var dir= path.join(__dirname, `../public/artwork/${id}/images/`)

    cb(null, dir);
  },
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: fileStorageEngine

})


router.post('/create_process', upload.single('imgfile'), function(request,response){
  console.log(request.file);
  var id = request.body.id;
  var fileName = request.body.pageName;
  var pageTitle = request.body.pageTitle;
  var pageDescription = request.body.description;
  var imgFileName = request.file.originalname;
  var imgAdd = `/artwork/${id}/images/${imgFileName}`;
  var before = `/work/${id}`
  console.log(id)
  var html = template.page(imgAdd, pageTitle, pageDescription, before)
    fs.writeFile(path.join(__dirname, `../public/artwork/${id}/pages/${fileName}.html`), html, 'utf8', function(err){
      console.log('writefile')
      console.log(html)
      response.redirect(`/work/${id}`)
    })
  })



router.get('/create/:pageId', function(request, response){
  if(request.session.user){
    var id = request.params.pageId;
    var body=
    `
    <h1> Create page for ${id} project! </h1>
    <form action="/work/create_process" method="post" enctype="multipart/form-data">
      <input type="hidden" name="id" value="${id}">
      <input type="text" name="pageName" placeholder="FileName for page">
      <= Same Filename with ImageFilename!! ex) 001_filename<br>
      <input type="text" name="pageTitle" placeholder="Title for page"><br>
      <textarea name="description" cols="150" rows="10" placeholder="description"></textarea><br>      
      <input type="file" name="imgfile" accept="image/*" required/>
      <= Same ImageFilename with Filename!! ex)001_filename
      <br>
      <input type="submit" value="create">
    </form>
    `
    var createPage = template.basicPage(body)
    response.send(createPage);

  }
})



router.get('/update/:pageId', function(request, response){
  if(request.session.user){
    var title = request.params.pageId;
    fs.readFile(path.join(__dirname, `../public/artwork/${title}/description/${title}`), 'utf8', function(err, description){    
    var body=
    `
    <h1> Update Decription for ${title} page </h1>
      <form action="/work/update_process" method="post">
        <input type="hidden" name="id" value=${title}>
        <textarea name="description" placeholder="revise description" cols="150" rows="10">${description}</textarea><br>
        <input type="submit" value="update">
      </form>
    `
    var updatePage = template.basicPage(body);
    response.send(updatePage);
  })
  }
})






router.post('/update_process', function(request,response){
  var id = request.body.id;
  var description = request.body.description;
  fs.writeFile(path.join(__dirname, `../public/artwork/${id}/description/${id}`), description, 'utf8', function(err){
    response.redirect(`/work/${id}`)
  })

})

router.post('/delete_process', function(request, response){
  var id = request.body.id;  
  fs.rmdir(path.join(__dirname, `../public/artwork/${id}`), {recursive: true},function(err){
    response.redirect('/')
  })
})

router.post('/deletePage_process', function(request, response){
  var id = request.body.id;
  var pagename = request.body.pagename;
  var imgname = request.body.imgname;

  fs.unlink(path.join(__dirname, `../public/artwork/${id}/pages/${pagename}`), function(err){
    fs.unlink(path.join(__dirname, `../public/artwork/${id}/images/${imgname}`), function(err){
      response.redirect(`/work/${id}`)
    })
  })

})


router.get('/:pageId', function(request,response,next){
  if(request.session.user){
    var id = path.parse(request.params.pageId).base;    
    fs.readFile(path.join(__dirname, `../public/artwork/${id}/description/${id}`), 'utf8', function(err, description){
      if(err){
        next(err);
      }else{
        fs.readdir(path.join(__dirname, `../public/artwork/${id}/images`), function(err, filelist){
            fs.readdir(path.join(__dirname, `../public/artwork/${id}/pages`), function(err, pagelist){

              var pageimgList = template.pageimgListLogin(filelist, pagelist, id)
              var imageList = template.imgListinPage(id, filelist)
          var body=          
          `
                  <main class="main">                  
                  <a class="work_description" href="/work/create/${id}">create</a>
                  <a class="work_description" href="/work/update/${id}">update</a>
                  
                  <form action="/work/delete_process" method="post" style="display:inline">
                    <input type="hidden" name="id" value="${id}">
                    <input class="delete_project" type="submit" value="delete">
                  </form>
                  <br><br><br>                 
                  <div id="imgSlide">        
                    ${imageList}        
                  </div>
                  <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                  <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                  <br><br><br>
                  <div class="wrap">
                    ${pageimgList}
                    
                  </div><br><br>
                  <pre class=work_description>
${description}
                  </pre>
                </main>
                  `;
                  var list=template.list(request.list);    
                  var studiolist = template.studiolist(request.studiolist);    
                  var html = template.htmlLogin(list, studiolist, body);
                  response.send(html);

            })
        })
      }
    })
  } else{
    var id = path.parse(request.params.pageId).base;    
    fs.readFile(path.join(__dirname, `../public/artwork/${id}/description/${id}`), 'utf8', function(err, description){
      if(err){
        next(err);
      }else{
        fs.readdir(path.join(__dirname, `../public/artwork/${id}/images`), function(err, filelist){
            fs.readdir(path.join(__dirname, `../public/artwork/${id}/pages`), function(err, pagelist){

              var pageimgList = template.pageimgList(filelist, pagelist, id)
              var imageList = template.imgListinPage(id, filelist)
          var body=          
          `
                  <main class="main">


                  <div id="imgSlide">        
                  ${imageList}        
                </div>
                <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                  <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                  <br><br><br>
                <div class="wrap">
                  ${pageimgList}
                  
                </div><br><br>
                <pre class=work_description>
${description}
                </pre>
                </main>
                  `;
                  var list=template.list(request.list);    
                  var studiolist = template.studiolist(request.studiolist);    
                  var html = template.html(list, studiolist, body);
                  response.send(html);

            })
        })
      }
    })
}
})





module.exports = router;