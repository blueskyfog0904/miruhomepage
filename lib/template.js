const fs = require('fs');
var path = require('path')

module.exports = {
  html: function(list, studiolist, body){
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>MIRU KIM</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
      <link rel="stylesheet" href="/stylesheets/main.css">      
      <link  rel="stylesheet"  href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"/>
      <script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js"></script>
      <script src="https://kit.fontawesome.com/a0003427fc.js" crossorigin="anonymous"></script>
      
    </head>
    <style>
      

    </style>
    <body>    
        <header class="header">
          <a href="/"><h1 class="title">MIRU KIM</h1></a>
          <nav id="navbar" href="#">
            <div class="dropdown">
              <div class="dropbtn" width:20%;><a href="">WORK</a></div>
              <div class="dropdown-content">
                ${list}                
              </div>
            </div>
            <div class="dropdown">
              <div class="dropbtn"><a href="">STUDIO</a></div>
              <div class="dropdown-content" style="text-align:center; width:20%;">
                ${studiolist}         

              </div>
            </div>  
              <div class="dropdown">
                <div class="dropbtn"><a href="">ABOUT</a></div>
                <div class="dropdown-content" style="text-align:center; width:20%;">
                  <a href="/about/biography">STATEMENT</a>
                  <a href="/about/cv">CV</a>              
  
                </div>
              </div>  
              <div style="text-align:center; width:20%;"><a href="/contact">CONTACT</a>              
              </div>
              <a href="https://www.naver.com"><i class="fa-brands fa-instagram fa-lg"></i></a>
              
            </ul>
          </nav>
          <br><br>
        </header>
        ${body}


      
        <!-- Footer -->
        
    <footer class="text-center text-lg-start bg-white text-muted" >        
        <div style="background-color: #dcdcdc;">      
        <br>
        <a href="#" ><div class="top">↑ TOP </div><BR></a>
        <br>    
        <!-- Right -->
      </section>
      <section class="" >
        <div class="container text-center text-md-start mt-5" >
          <!-- Grid row -->
          <div class="row mt-3">
            <!-- Grid column -->
            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <!-- Content -->
              
            </div>
            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4" >
              <!-- Links -->
              <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
                <i class="fas fa-envelope me-3 text-secondary"></i>
                mirumirunamoo@gmail.com
              </p>


            </div>
            <!-- Grid column -->
          </div>
          <!-- Grid row -->
          <a href="/login"><img src="/admin.png" width="5px;"></a>
          

        </div>
      </section>
      <!-- Section: Links  -->

      <!-- Copyright -->

      <!-- Copyright -->
    </div>
    </footer>
    <!-- Footer -->     

        
      
        <script type="text/javascript" src="/js/main.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script> 
        <script src="./node_modules/lightbox2/src/js/lightbox.js"></script>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>        
      
    </body>


    </html>

    <script>
      $('#imgSlide > div:gt(0)').hide();

      setInterval(function(){
        $('#imgSlide > div:first')
            .fadeOut(1000)
            .next()
            .fadeIn(1000)
            .end()
            .appendTo('#imgSlide');
      },4000);
    </script>
    
    `;
  }, pageimgListLogin:function(filelist, pagelist, id){
    var list = '';
    var i = 0;
    while(i < filelist.length){
      list = list + `<article><a href="/public/artwork/${id}/pages/${pagelist[i]}"><img class='imggrid' src="/artwork/${id}/images/${filelist[i]}"></a></article>
      <form action="/work/deletePage_process" method="post" style="display:inline">
        <input type="hidden" name="id" value="${id}">
        <input type="hidden" name="pagename" value="${pagelist[i]}">
        <input type="hidden" name="imgname" value="${filelist[i]}">
        <input type="submit" value="delete">
      </form>
      `
      i = i+1;
    }
    return list;

  }, studioPageimgListLogin:function(filelist,pagelist,id1,id2){
    var list = '';
    var i = 0;
    while(i < filelist.length){
      list = list + `<article><a href="/public/studio/${id1}/project/${id2}/pages/${pagelist[i]}"><img class='imggrid' src="/studio/${id1}/project/${id2}/images/${filelist[i]}"></a></article>
      <form action="/studio/deletePage_process" method="post" style="display:inline">
        <input type="hidden" name="id1" value="${id1}">
        <input type="hidden" name="id2" value="${id2}">
        <input type="hidden" name="pagename" value="${pagelist[i]}">
        <input type="hidden" name="imgname" value="${filelist[i]}">
        <input type="submit" value="delete">
      </form>
      `
      i = i+1;
    }
    return list
  }, studioPageimgList:function(filelist,pagelist,id1,id2){
    var list = '';
    var i = 0;
    while(i < filelist.length){
      list = list + `<article><a href="/public/studio/${id1}/project/${id2}/pages/${pagelist[i]}"><img class='imggrid' src="/studio/${id1}/project/${id2}/images/${filelist[i]}"></a></article>
      `
      i = i+1;
    }
    return list
  }, slideimgList:function(imglist){
    var list =  '';
    var i = 0;
    while( i < imglist.length){
      list = list + `<article><img class='imggrid' src="/slideimg/${imglist[i]}"></article>
      <form action="/slideshow/delete_process" method="post" style="display:inline">
        <input type="hidden" name="imgname" value="${imglist[i]}">
        <input type="submit" value="delete">
      </form>
      `
      i = i+1;
    }
    return list;
  }, pageimgList:function(filelist, pagelist, id){
    var list = '';
    var i = 0;
    while(i < filelist.length){
      list = list + `<article><a href="/public/artwork/${id}/pages/${pagelist[i]}"><img class='imggrid' src="/artwork/${id}/images/${filelist[i]}"></a></article>      
      `
      i = i+1;
    }
    return list;
  }, list:function(filelist){
    var list = '';
    var i = (filelist.length-1);
    while(i >= 0){
      var reFilelist = filelist[i].split('_')[1];
      list = list + `<a href="/work/${filelist[i]}">${reFilelist}</a>`;
      i = i-1;
    }    
    return list

  }, studiolist:function(studiolist){
    var list = '';
    var i = (studiolist.length-1);        
    while(i >= 0){
      var reFilelist = studiolist[i].split('_')[1];
      list = list + `<a href="/studio/${studiolist[i]}">${reFilelist}</a>`;
      i = i-1;
    }    
    return list
  }, studioprojectlist:function(id, projectlist, imglist){
    var list='';
    var i = 0;   
    while(i < projectlist.length){
      var shortdes = fs.readFileSync(path.join(__dirname, `../public/studio/${id}/project/${projectlist[i]}/description/${projectlist[i]}_shortdes`), {encoding:'utf8', flag:'r'})
      console.log(i)
      console.log(list);
        list= list + `
                <div class="studiomain">
                  <div class="studioimg">
                  <a href="/studio/${id}/project/${projectlist[i]}" ><img class="repreimg" src="/studio/${id}/repre_img/${imglist[i]}"></a>
                  </div>
                  <a href="/studio/${id}/project/${projectlist[i]}" ><div class="studiodes">
                    <pre>
${shortdes}
                    </pre>                    
                 </a></div>
                </div>
                `;
                i = i+1;
    }
    return list;

  }, imgList:function(imgList){
    // 이미지슬라이드쪽
    var list = '';
    var i = 0;
    while(i < imgList.length){
      list = list + `<div><img id="imgSlide${i+1}" class="slide1" src="/slideimg/${imgList[i]}" style="width:720px; height:480px;"></div>\n`;
      i = i+1;
    }    
    return list;
  }, imgListinPage:function(id, imgList){
    var list = '';
    var i = 0;
    while(i < imgList.length){
      list = list + `<div><img id="imgSlide${i+1}" class="slide1" src="/artwork/${id}/images/${imgList[i]}" style="width:600px; height:400px;"></div>\n`;
      i = i+1;
    }
    return list;
  }, studioImgListinPage:function(id1,id2,imgList){
    var list = '';
    var i = 0;
    while(i < imgList.length){
      list = list + `<div><img id="imgSlide${i+1}" class="slide1" src="/studio/${id1}/project/${id2}/images/${imgList[i]}" style="width:600px; height:400px;"></div>\n`;
      i = i+1;
    }
    return list;
  }, basicPage:function(body){
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>      
    </head>
    <body>
      ${body}
    </body>
    </html>
    `;
  }, htmlLogin: function(list, studiolist, body){
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>MIRU KIM</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
      <link rel="stylesheet" href="/stylesheets/main.css">      
      <link  rel="stylesheet"  href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"/>
      <script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js"></script>
      <script src="https://kit.fontawesome.com/a0003427fc.js" crossorigin="anonymous"></script>
      
    </head>
    <style>
      

    </style>
    <body>    
        <header class="header">
          <a href="/"><h1 class="title">MIRU KIM</h1></a>
          <nav id="navbar" href="#">
            <div class="dropdown">
              <div class="dropbtn" width:20%;><a href="/work">WORK</a></div>
              <div class="dropdown-content">
                ${list}                
              </div>
            </div>
            <div class="dropdown">
              <div class="dropbtn"><a href="/studio">STUDIO</a></div>
              <div class="dropdown-content" style="text-align:center; width:20%;">
                ${studiolist}        

              </div>
            </div>  
              <div class="dropdown">
                <div class="dropbtn"><a href="">ABOUT</a></div>
                <div class="dropdown-content" style="text-align:center; width:20%;">
                  <a href="/about/biography">STATEMENT</a>
                  <a href="/about/cv">CV</a>              
  
                </div>
              </div>  
              <div style="text-align:center; width:20%;"><a href="/contact">CONTACT</a>              
              </div>
              <a href="https://www.naver.com"><i class="fa-brands fa-instagram fa-lg"></i></a>
              
            </ul>
          </nav>
          <br><br>
        </header>
        ${body}


      
        <!-- Footer -->
        
    <footer class="text-center text-lg-start bg-white text-muted" >        
        <div style="background-color: #dcdcdc;">      
        <br>
        <a href="#" ><div class="top">↑ TOP </div><BR></a>
        <br>    
        <!-- Right -->
      </section>
      <section class="" >
        <div class="container text-center text-md-start mt-5" >
          <!-- Grid row -->
          <div class="row mt-3">
            <!-- Grid column -->
            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <!-- Content -->
              
            </div>
            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4" >
              <!-- Links -->
              <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
                <i class="fas fa-envelope me-3 text-secondary"></i>
                mirumirunamoo@gmail.com
              </p>


            </div>
            <!-- Grid column -->
          </div>
          <!-- Grid row -->
          <a href="/login"><img src="/admin.png" width="5px;"></a>
          <a href="/logout">Logout</a>
        </div>
      </section>
      <!-- Section: Links  -->

      <!-- Copyright -->

      <!-- Copyright -->
    </div>
    </footer>
    <!-- Footer -->   

        
      
        <script type="text/javascript" src="/js/main.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script> 
        <script src="./node_modules/lightbox2/src/js/lightbox.js"></script>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>        
      
    </body>


    </html>

    <script>
      $('#imgSlide > div:gt(0)').hide();

      setInterval(function(){
        $('#imgSlide > div:first')
            .fadeOut(1000)
            .next()
            .fadeIn(1000)
            .end()
            .appendTo('#imgSlide');
      },4000);
    </script>
    
    `;
  }, page:function(imgAdd, pageTitle, pageDescription, before){
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script> 
      <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
      <link rel="stylesheet" href="/stylesheets/main.css">
      <script>
        function back(){
          history.back();
        }
      </script>

    </head>
    <body>
      <div class="container">
      <button onclick="back()" type="button" class="btn-close" aria-label="Close"></button>
      <br><br>
        <div class="image">      
          <img class="imgsingle" src="${imgAdd}">
        </div>    
          <br><br>
          
          <h5 style="display:block">${pageTitle}</h5>
          <pre style="display:block">
${pageDescription}
          </pre>
        </div>

      </div>
      </div>
      
    </body>
    </html>

    `;
  }
}