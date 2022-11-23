const express = require('express')
const router = express.Router();
const fs = require('fs');
var path = require('path')
var qs = require('querystring'); 
var sanitizeHtml = require('sanitize-html');

const template = require('../lib/template.js');

router.get('/update/:pageId', function(request, response){
  if(request.session.user){
    var title = request.params.pageId;
    fs.readFile(path.join(__dirname, `../public/artwork/${title}/description`), 'utf8', function(err, description){

    })
    
    var body=
    `
      <form action="/work/update_process" method="post">
        <textarea name="description" placeholder="revise description"></textarea><br>
        <input type="submit" value="update">
      </form>
    `
  }
})

router.get('/:pageId', function(request,response,next){

  if(request.session.user){
    var id = path.parse(request.params.pageId).base;    
    fs.readFile(path.join(__dirname, `../public/artwork/${id}/description/${id}`), 'utf8', function(err, description){
      if(err){
        next(err);
      }else{
        var body=
          `
          <main class="main">
          <a href='/work/update/${id}'>update</a>
          <pre class=work_description>
${description}
          </pre>

          <div class="wrap">

            <article><a href="/artwork/1_project1/pages/page_flower.html"><img class='imggrid' src="/artwork/1_project1/images/alan.webp"></a></article>
            <article><a href="/artwork/1_project1/pages/page_flower.html"><img class='imggrid' src="/artwork/1_project1/images/alan.webp"></a></article>
            <article><a href="/artwork/1_project1/pages/page_flower.html"><img class='imggrid' src="/artwork/1_project1/images/alan.webp"></a></article>
            <article><a href="/artwork/1_project1/pages/page_flower.html"><img class='imggrid' src="/artwork/1_project1/images/alan.webp"></a></article>
            <article><a href="/artwork/1_project1/pages/page_flower.html"><img class='imggrid' src="/artwork/1_project1/images/alan.webp"></a></article>
            <article><a href="/artwork/1_project1/pages/page_flower.html"><img class='imggrid' src="/artwork/1_project1/images/alan.webp"></a></article>
            <article><a href="/artwork/1_project1/pages/page_flower.html"><img class='imggrid' src="/artwork/1_project1/images/alan.webp"></a></article>
            <article><a href="/artwork/1_project1/pages/page_flower.html"><img class='imggrid' src="/artwork/1_project1/images/alan.webp"></a></article>
            <article><a href="/artwork/1_project1/pages/page_flower.html"><img class='imggrid' src="/artwork/1_project1/images/alan.webp"></a></article>
            <article><a href="/artwork/1_project1/pages/page_flower.html"><img class='imggrid' src="/artwork/1_project1/images/alan.webp"></a></article>
            <article><a href="/artwork/1_project1/pages/page_flower.html"><img class='imggrid' src="/artwork/1_project1/images/alan.webp"></a></article>
            <article><a href="/artwork/1_project1/pages/page_flower.html"><img class='imggrid' src="/artwork/1_project1/images/alan.webp"></a></article>
          </div>
        </main>
          `;
  var list = template.list(request.list);
  var html = template.htmlLogin(list, body)
  response.send(html)
      }
    })
  } else{
  var id = path.parse(request.params.pageId).base; 
  var body=
  `
  <main class="main">
  <div class="theme_name">Theme name</div>      
  <div class="theme_place">Theme place</div>
  <pre class="theme_des">Theme description</pre>
  <div class="wrap">
    <article><a href="/artwork/1_project1/pages/page_flower.html"><img class='imggrid' src="/artwork/1_project1/images/alan.webp"></a></article>
    <article><a href="/artwork/1_project1/pages/page_flower.html"><img class='imggrid' src="/artwork/1_project1/images/alan.webp"></a></article>
    <article><a href="/artwork/1_project1/pages/page_flower.html"><img class='imggrid' src="/artwork/1_project1/images/alan.webp"></a></article>
    <article><a href="/artwork/1_project1/pages/page_flower.html"><img class='imggrid' src="/artwork/1_project1/images/alan.webp"></a></article>
    <article><a href="/artwork/1_project1/pages/page_flower.html"><img class='imggrid' src="/artwork/1_project1/images/alan.webp"></a></article>
    <article><a href="/artwork/1_project1/pages/page_flower.html"><img class='imggrid' src="/artwork/1_project1/images/alan.webp"></a></article>
    <article><a href="/artwork/1_project1/pages/page_flower.html"><img class='imggrid' src="/artwork/1_project1/images/alan.webp"></a></article>
    <article><a href="/artwork/1_project1/pages/page_flower.html"><img class='imggrid' src="/artwork/1_project1/images/alan.webp"></a></article>
    <article><a href="/artwork/1_project1/pages/page_flower.html"><img class='imggrid' src="/artwork/1_project1/images/alan.webp"></a></article>
    <article><a href="/artwork/1_project1/pages/page_flower.html"><img class='imggrid' src="/artwork/1_project1/images/alan.webp"></a></article>
    <article><a href="/artwork/1_project1/pages/page_flower.html"><img class='imggrid' src="/artwork/1_project1/images/alan.webp"></a></article>
    <article><a href="/artwork/1_project1/pages/page_flower.html"><img class='imggrid' src="/artwork/1_project1/images/alan.webp"></a></article>
  </div>
</main>
  `;
  var list = template.list(request.list);
  var html = template.html(list, body)
  response.send(html)
}
})





module.exports = router;