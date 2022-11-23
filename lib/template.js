module.exports = {
  html: function(list, body){
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
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
          <a href="/"><h1 class="title">MIRU</h1></a>
          <nav id="navbar" href="#">
            <div class="dropdown">
              <div class="dropbtn" width:25%;><a href="">WORK</a></div>
              <div class="dropdown-content">
                ${list}                
              </div>
            </div>
              <div style="text-align:center; width:25%;"><a href="/biography">BIOGRAPHY</a></div>
              <div style="text-align:center; width:25%;"><a href="/studio">STUDIO</a></div>
              <div style="text-align:center; width:25%;"><a href="/contact">CONTACT</a></div>
            </ul>
          </nav>
          <br><br>
        </header>
        ${body}


      
        <!-- Footer -->
        
    <footer class="text-center text-lg-start bg-white text-muted" >
      <!-- Section: Social media -->
      <!-- <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom" > -->   
        
        <div style="background-color: #dcdcdc;">      
        <br>
        <a href="#" ><div class="top">↑ TOP </div><BR></a>
        <br>    
        <!-- Right -->
      </section>
      <!-- Section: Social media -->

      <!-- Section: Links  -->
      <section class="" >
        <div class="container text-center text-md-start mt-5" >
          <!-- Grid row -->
          <div class="row mt-3">
            <!-- Grid column -->
            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <!-- Content -->
              <h6 class="text-uppercase fw-bold mb-4">
                <a href=""><i class="fa-brands fa-instagram fa-5x"></i></a>
              </h6>
              <p>
                instagram add : abcd@naver.com
              </p>
            </div>
            <!-- Grid column -->

            <!-- Grid column -->
            
            <!-- Grid column -->
            
            <!-- Grid column -->

            <!-- Grid column -->
            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <!-- Links -->
              <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
              <p><i class="fas fa-home me-3 text-secondary"></i> New York, NY 10012, US</p>
              <p>
                <i class="fas fa-envelope me-3 text-secondary"></i>
                info@example.com
              </p>
              <p><i class="fas fa-phone me-3 text-secondary"></i> + 01 234 567 88</p>
              <p><i class="fas fa-print me-3 text-secondary"></i> + 01 234 567 89</p>
            </div>
            <!-- Grid column -->
          </div>
          <!-- Grid row -->
          <a href="/login">Admin</a>
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
  }, list:function(filelist){
    var list = '';
    var i = 0;
    while(i < filelist.length){
      list = list + `<a href="/work/${filelist[i]}">${filelist[i]}</a>`;
      i = i+1;      
    }    
    return list

  }, imgList:function(imgList){
    var list = '';
    var i = 0;
    while(i < imgList.length){
      list = list + `<div><img id="imgSlide${i+1}" class="slide1" src="/artwork/1_project1/images/${imgList[i]}"></div>\n`;
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
  }, htmlLogin: function(list, body){
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
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
          <a href="/"><h1 class="title">MIRU</h1></a>
          <nav id="navbar" href="#">
            <div class="dropdown">
              <div class="dropbtn" width:25%;><a href="/work">WORK</a></div>
              <div class="dropdown-content">
                ${list}                
              </div>
            </div>
              <div style="text-align:center; width:25%;"><a href="/biography">BIOGRAPHY</a></div>
              <div style="text-align:center; width:25%;"><a href="/studio">STUDIO</a></div>
              <div style="text-align:center; width:25%;"><a href="/contact">CONTACT</a></div>
            </ul>
          </nav>
          <br><br>
        </header>
        ${body}


      
        <!-- Footer -->
        
    <footer class="text-center text-lg-start bg-white text-muted" >
      <!-- Section: Social media -->
      <!-- <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom" > -->   
        
        <div style="background-color: #dcdcdc;">      
        <br>
        <a href="#" ><div class="top">↑ TOP </div><BR></a>
        <br>    
        <!-- Right -->
      </section>
      <!-- Section: Social media -->

      <!-- Section: Links  -->
      <section class="" >
        <div class="container text-center text-md-start mt-5" >
          <!-- Grid row -->
          <div class="row mt-3">
            <!-- Grid column -->
            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <!-- Content -->
              <h6 class="text-uppercase fw-bold mb-4">
                <a href=""><i class="fa-brands fa-instagram fa-5x"></i></a>
              </h6>
              <p>
                instagram add : abcd@naver.com
              </p>
            </div>
            <!-- Grid column -->

            <!-- Grid column -->
            
            <!-- Grid column -->
            
            <!-- Grid column -->

            <!-- Grid column -->
            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <!-- Links -->
              <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
              <p><i class="fas fa-home me-3 text-secondary"></i> New York, NY 10012, US</p>
              <p>
                <i class="fas fa-envelope me-3 text-secondary"></i>
                info@example.com
              </p>
              <p><i class="fas fa-phone me-3 text-secondary"></i> + 01 234 567 88</p>
              <p><i class="fas fa-print me-3 text-secondary"></i> + 01 234 567 89</p>
            </div>
            <!-- Grid column -->
          </div>
          <!-- Grid row -->
          <a href="/login">Admin</a><br>
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
  }


}