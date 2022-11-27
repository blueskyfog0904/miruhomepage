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

router.get('/biography', function(request, response){  
  if(request.session.user){    
    fs.readFile(path.join(__dirname, '../public/about/biography/content/explain'), 'utf8', function(err, explain){
      var biographyExplain = explain;    
        fs.readFile(path.join(__dirname, '../public/about/biography/content/history'), 'utf8', function(err, history){
          
          var biographyHistory = history;
          var body =          
          `          
          <main class="main">
          <form action='/about/biography_process' method='post' class='form_biography'>
            Statement Left<br><textarea name="explain" cols="150" rows="10">${biographyExplain}</textarea><br>
            Statement Right<br><textarea name="history" cols="150" rows="10">${biographyHistory}</textarea><br>
            <input type="submit" value="update"></input>
          </form>
          <br><br>
          <div class="biography">
                  <h5 class="subtitle">Statement</h5>
                  <br><br><br><br><br>
                  <div id="aboutPre">
                  <pre id="aboutPre1">
${biographyExplain}
                  </pre>
                  <pre id="aboutPre2">
${biographyHistory}
          
                  </pre>
                  </div>
                  

                  </div>
                </div>
              </main>
          `;
          var list=template.list(request.list);    
          var studiolist = template.studiolist(request.studiolist);    
          var html = template.htmlLogin(list, studiolist, body);
          response.send(html);          
        })
    })
    }else{
      fs.readFile(path.join(__dirname, '../public/about/biography/content/explain'), 'utf8', function(err, explain){
        var biographyExplain = explain;    
          fs.readFile(path.join(__dirname, '../public/about/biography/content/history'), 'utf8', function(err, history){
            var biographyHistory = history;
            var body =
            `
            <main class="main">
                <div class="biography">
                  <h5 class="subtitle">Statement</h5>
                  <br><br><br><br><br>
                  <div id="aboutPre">
                  <pre id="aboutPre1">
${biographyExplain}
                  </pre>
                  <pre id="aboutPre2">
${biographyHistory}
          
                  </pre>
                  </div>
                  

                  </div>
                </div>
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

router.post('/biography_process', function(request, response){
  var biographyExplain= request.body.explain;
  var biographyHistory = request.body.history;
  fs.writeFile(path.join(__dirname, '../public/about/biography/content/explain'), biographyExplain, 'utf8', function(err){
    fs.writeFile(path.join(__dirname, '../public/about/biography/content/history'), biographyHistory, 'utf8', function(err){
      response.redirect("/about/biography")
    })
  })

})

router.get('/cv', function(request, response){  
  if(request.session.user){    
    fs.readFile(path.join(__dirname, '../public/about/cv/content/explain'), 'utf8', function(err, explain){
      var biographyExplain = explain;    
        fs.readFile(path.join(__dirname, '../public/about/cv/content/history'), 'utf8', function(err, history){
          
          var biographyHistory = history;
          var body =          
          `          
          <main class="main">
          <form action='/about/cv_process' method='post' class='form_biography'>
            Biography Left<br><textarea name="explain" cols="150" rows="10">${biographyExplain}</textarea><br>
            Biography Right<br><textarea name="history" cols="150" rows="10">${biographyHistory}</textarea><br>
            <input type="submit" value="update"></input>
          </form>
          <br><br>
          <div class="biography">
                  <h5 class="subtitle">Biography</h5>
                  <br><br><br><br><br>
                  <div id="aboutPre">
                  <pre id="aboutPre1">
${biographyExplain}
                  </pre>
                  <pre id="aboutPre2">
${biographyHistory}
          
                  </pre>
                  </div>
                  

                  </div>
                </div>
              </main>
          `;
          var list=template.list(request.list);    
          var studiolist = template.studiolist(request.studiolist);    
          var html = template.htmlLogin(list, studiolist, body);
          response.send(html);       
        })
    })
    }else{
      fs.readFile(path.join(__dirname, '../public/about/cv/content/explain'), 'utf8', function(err, explain){
        var biographyExplain = explain;    
          fs.readFile(path.join(__dirname, '../public/about/cv/content/history'), 'utf8', function(err, history){
            var biographyHistory = history;
            var body =
            `
            <main class="main">
                <div class="biography">
                  <h5 class="subtitle">Biography</h5>
                  <br><br><br><br><br>
                  <div id="aboutPre">
                  <pre id="aboutPre1">
${biographyExplain}
                  </pre>
                  <pre id="aboutPre2">
${biographyHistory}
          
                  </pre>
                  </div>
                  

                  </div>
                </div>
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

router.post('/cv_process', function(request, response){
  var biographyExplain= request.body.explain;
  var biographyHistory = request.body.history;
  fs.writeFile(path.join(__dirname, '../public/about/cv/content/explain'), biographyExplain, 'utf8', function(err){
    fs.writeFile(path.join(__dirname, '../public/about/cv/content/history'), biographyHistory, 'utf8', function(err){
      response.redirect("/about/cv")
    })
  })

})




module.exports = router;