// var index = 0;
// window.onload=function(){
//   slideShow();
// }
// function slideShow(){
//   var i;
//   var x = document.getElementsByClassName("slide1");
//   for(i=0; i<x.length; i++){
//     x[i].style.display="none";    
//   }
//   index++;
//   if(index>x.length){
//     index=1;
//   }
//   x[index-1].style.display="block";
//   x[index-1].style.opacity=1;
//   x[index-1].style.transition=1;
//   setTimeout(slideShow, 4000);
// }

// const { $container } = require("lightbox2");


$('#imgSlide > div:gt(0)').hide();

setInterval(function(){
  $('#imgSlide > div:first')
      .fadeOut(1000)
      .next()
      .fadeIn(1000)
      .end()
      .appendTo('#imgSlide');
},3000);



