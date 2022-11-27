const { create } = require('domain');
const express = require('express')
const router = express.Router();
const fs = require('fs');
var path = require('path')
var qs = require('querystring'); 
var sanitizeHtml = require('sanitize-html');
const multer = require('multer')


const template = require('../lib/template.js');
const { pageimgListLogin, imgList } = require('../lib/template.js');

// storage
const fileStorageEngineOne = multer.diskStorage({
  destination: (req, file, cb)=>{
    // console.log(file.filename);
    // console.log(req.body);
    // console.log(req.body.id);
    // console.log(req.body.prj_code);
    let id = req.body.id;
    let prj_code = req.body.prj_code;

    var dir= path.join(__dirname, `../public/studio/${id}/repre_img`)

    cb(null, dir);
  },
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
});

const uploadone = multer({
  storage: fileStorageEngineOne

})

const fileStorageEngineTwo = multer.diskStorage({
  destination: (req, file, cb)=>{
    // console.log(file.filename);
    // console.log(req.body);
    // console.log(req.body.id);
    // console.log(req.body.prj_code);
    let id1 = req.body.id1;
    let id2 = req.body.id2
    let prj_code = req.body.prj_code;

    var dir= path.join(__dirname, `../public/studio/${id1}/project/${id2}/images`)

    cb(null, dir);
  },
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
});

const uploadtwo = multer({
  storage: fileStorageEngineTwo

})

router.post('/create_processtwo', uploadtwo.single('imgfile'), function(request, response){
  console.log(request.file);
  var id1 = request.body.id1;
  var id2 = request.body.id2;
  var fileName = request.body.pageName;
  var pageTitle = request.body.pageTitle;
  var pageDescription = request.body.description;
  var imgFileName = request.file.originalname;
  var imgAdd = `/studio/${id1}/project/${id2}/images/${imgFileName}`;
  var before = `/studio/${id1}/${id2}`  
  var html = template.page(imgAdd, pageTitle, pageDescription, before)
    fs.writeFile(path.join(__dirname, `../public/studio/${id1}/project/${id2}/pages/${fileName}.html`), html, 'utf8', function(err){
      console.log('writefile')
      console.log(html)
      response.redirect(`/studio/${id1}/project/${id2}`)
    })
})

router.get('/create/:pageId/:pageId2', function(request, response){
  if(request.session.user){
    var id1 = request.params.pageId;
    var id2 = request.params.pageId2;
    var body=
    `
    <h1> Create page for ${id2} project in Studio! </h1>
    <form action="/studio/create_processtwo" method="post" enctype="multipart/form-data">
      <input type="hidden" name="id1" value="${id1}">
      <input type="hidden" name="id2" value="${id2}">
      <input type="text" name="pageName" placeholder="FileName for page">
      <= Same Filename with ImageFilename!! ex)001_blahblah<br>
      <input type="text" name="pageTitle" placeholder="Title for page"><br>
      <textarea name="description" cols="150" rows="10" placeholder="description"></textarea><br>      
      <input type="file" name="imgfile" accept="image/*" required/>
      <= Same ImageFilename with Filename!!
      <br>
      <input type="submit" value="create">
    </form>
    `
    var createPage = template.basicPage(body)
    response.send(createPage);

  }
})

router.post('/deletePage_process', function(request, response, next){
  var id1 = request.body.id1;
  var id2 = request.body.id2;
  var pagename = request.body.pagename;
  var imgname = request.body.imgname;

  fs.unlink(path.join(__dirname, `../public/studio/${id1}/project/${id2}/pages/${pagename}`), function(err){
    fs.unlink(path.join(__dirname, `../public/studio/${id1}/project/${id2}/images/${imgname}`), function(err){
      response.redirect(`/studio/${id1}/project/${id2}`)
    })
  })
})


router.post('/delete_process2', function(request, response, next){
  var id1 = request.body.id1;
  var id2 = request.body.id2;
  fs.rmdir(path.join(__dirname, `../public/studio/${id1}/project/${id2}`), {recursive: true},function(err){
    response.redirect(`/studio/${id1}`)
  })
})
router.post('/update_processtwo', function(request, response, next){
  var id1 = request.body.id1;
  var id2 = request.body.id2;
  var description = request.body.description;
  fs.writeFile(path.join(__dirname, `../public/studio/${id1}/project/${id2}/description/${id2}_des`), description, 'utf8', function(err){
    response.redirect(`/studio/${id1}/project/${id2}`)
  })
})

router.get('/update/:pageId/:pageId2', function(request, response, next){
  if(request.session.user){
    var id1 = request.params.pageId;
    var id2 = request.params.pageId2;
    fs.readFile(path.join(__dirname, `../public/studio/${id1}/project/${id2}/description/${id2}_des`), 'utf8', function(err, description){    
    var body=
    `
    <h1> Update Decription for ${id2} project </h1>
      <form action="/studio/update_processtwo" method="post">
        <input type="hidden" name="id1" value=${id1}>
        <input type="hidden" name="id2" value=${id2}>
        <textarea name="description" placeholder="revise description" cols="150" rows="10">${description}</textarea><br>
        <input type="submit" value="update">
      </form>
    `
    var updatePage = template.basicPage(body);
    response.send(updatePage);
  })
  }
})

router.get('/:pageId/project/:pageId2', function(request,response,next){
  if(request.session.user){
    var id1 = path.parse(request.params.pageId).base;    
    var id2 = path.parse(request.params.pageId2).base;
    
    fs.readFile(path.join(__dirname, `../public/studio/${id1}/project/${id2}/description/${id2}_des`), 'utf8', function(err, description){
      if(err){
        next(err);
      }else{
        fs.readdir(path.join(__dirname, `../public/studio/${id1}/project/${id2}/images`), function(err, filelist){
            fs.readdir(path.join(__dirname, `../public/studio/${id1}/project/${id2}/pages`), function(err, pagelist){

              var pageimgList = template.studioPageimgListLogin(filelist, pagelist, id1, id2);
              var imageList = template.studioImgListinPage(id1, id2, filelist)
          var body=          
          `
                  <main class="main">                  
                  <a class="work_description" href="/studio/create/${id1}/${id2}">create</a>
                  <a class="work_description" href="/studio/update/${id1}/${id2}">update</a>
                  
                  <form action="/studio/delete_process2" method="post" style="display:inline">
                    <input type="hidden" name="id1" value="${id1}">
                    <input type="hidden" name="id2" value="${id2}">
                    <input class="delete_project" type="submit" value="delete">
                  </form>
                  <br><br><br>                 
                  <div id="imgSlide">        
                    ${imageList}        
                  </div>
                  <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
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
    var id1 = path.parse(request.params.pageId).base;    
    var id2 = path.parse(request.params.pageId2).base;
    
    fs.readFile(path.join(__dirname, `../public/studio/${id1}/project/${id2}/description/${id2}_des`), 'utf8', function(err, description){
      if(err){
        next(err);
      }else{
        fs.readdir(path.join(__dirname, `../public/studio/${id1}/project/${id2}/images`), function(err, filelist){
            fs.readdir(path.join(__dirname, `../public/studio/${id1}/project/${id2}/pages`), function(err, pagelist){

              var pageimgList = template.studioPageimgList(filelist, pagelist, id1, id2);
              var imageList = template.studioImgListinPage(id1, id2, filelist)
          var body=          
          `
                  <main class="main">                 
                  
                  <br><br><br>                 
                  <div id="imgSlide">        
                    ${imageList}        
                  </div>
                  <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
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

router.get('/:pageId', function(request,response,next){
  if(request.session.user){
    var id = path.parse(request.params.pageId).base;    
    fs.readFile(path.join(__dirname, `../public/studio/${id}/description/${id}`), 'utf8', function(err, description){
      fs.readdir(path.join(__dirname, `../public/studio/${id}/repre_img/`), function(err, imglist){
        fs.readdir(path.join(__dirname, `../public/studio/${id}/project/`), function(err, projectlist){
          
          var procontent = template.studioprojectlist(id, projectlist, imglist)
          var body=
          `
          <main class="main">
            <a class="work_description" href="/studio/create/${id}">create</a>
            <a class="work_description" href="/studio/update/${id}">update</a>
            
            <form action="/studio/delete_processone" method="post" style="display:inline">
              <input type="hidden" name="id" value="${id}">
              <input class="delete_project" type="submit" value="delete">
            </form>
            <br><br><br>   

            <pre class=work_description>
${description}
            </pre>            
            ${procontent}
          </main>
          `;          
          var list=template.list(request.list);    
          var studiolist = template.studiolist(request.studiolist);    
          var html = template.html(list, studiolist, body);
          response.send(html);
        })
      })      
    })
  }else{
    var id = path.parse(request.params.pageId).base;    
    fs.readFile(path.join(__dirname, `../public/studio/${id}/description/${id}`), 'utf8', function(err, description){
      fs.readdir(path.join(__dirname, `../public/studio/${id}/repre_img/`), function(err, imglist){
        fs.readdir(path.join(__dirname, `../public/studio/${id}/project/`), function(err, projectlist){
          
          var procontent = template.studioprojectlist(id, projectlist, imglist)
          var body=
          `
          <main class="main">
            <br><br><br>   

            <pre class=work_description>
${description}
            </pre>            
            ${procontent}
          </main>
          `;          
          var list=template.list(request.list);    
          var studiolist = template.studiolist(request.studiolist);    
          var html = template.html(list, studiolist, body);
          response.send(html);
        })
      })      
    })
  }
})

router.post(`/create_processone`, uploadone.single('imgfile'), function(request,response){
  var id = request.body.id;
  var projectName = request.body.projectName;
  var shortDes = request.body.short_description;
  var des = request.body.description;
  var imgFileName = request.file.originalname;  
  fs.mkdirSync(path.join(__dirname, `../public/studio/${id}/project/${projectName}`))
  fs.mkdirSync(path.join(__dirname, `../public/studio/${id}/project/${projectName}/images`))
  fs.mkdirSync(path.join(__dirname, `../public/studio/${id}/project/${projectName}/description`))
  fs.mkdirSync(path.join(__dirname, `../public/studio/${id}/project/${projectName}/pages`))
  fs.writeFile(path.join(__dirname, `../public/studio/${id}/project/${projectName}/description/${projectName}_shortdes`), shortDes, 'utf8', function(err){
    fs.writeFile(path.join(__dirname, `../public/studio/${id}/project/${projectName}/description/${projectName}_des`), des, 'utf8', function(err){
      body =
        `
        Success to create ${projectName} Folder!<br>
        <a href='/studio/${id}'>Back</a>
        
        `;          
        var mkdirPage = template.basicPage(body)        
        response.send(mkdirPage)
    })
  })
})

router.get('/update/:pageId', function(request, response){
 if(request.session.user){
  var id = request.params.pageId;
  fs.readFile(path.join(__dirname, `../public/studio/${id}/description/${id}`), 'utf8', function(err, description){

    var body=
    `
    <main class="main">
      <br><br><br><br><br>
        <form action='/studio/update_processone' method='post' class='form_work_mkdir'>
        <input type="hidden" name="id" value="${id}">
    Project Description <br><textarea name="updateDescription" placeholder="Input Description" cols="150" rows="10">${description}</textarea><br>        
    <input type="submit" value="update">
    </form>
      </main>
      <br><br><br><br><br>
    `;
    var updatePage = template.basicPage(body);
    response.send(updatePage);

  })  
 }
})

router.get('/create/:pageId', function(request,response){
  if(request.session.user){
    var id = request.params.pageId;
    var body=
    `
    <h1> Create page for ${id} </h1>
    <form action="/studio/create_processone" method="post" enctype="multipart/form-data">
      <input type="hidden" name="id" value="${id}">

      <input type="text" name="projectName" placeholder="ProjectName for page"> <= Same Project Name with ImageFile Name ex)001_koreano1
      <br>            

      <textarea name="short_description" cols="150" rows="10" placeholder="Short_description"></textarea><br>   

      <textarea name="description" cols="150" rows="10" placeholder="description"></textarea><br>   
      
      
      <input type="file" name="imgfile" accept="image/*" required/>
      <= Same ImageFilename with ProjectName(Show representative Image for Project)!!
      <br>
      <input type="submit" value="create">
    </form>


    `
    var createPage = template.basicPage(body);
    response.send(createPage);
  }
})



module.exports = router;