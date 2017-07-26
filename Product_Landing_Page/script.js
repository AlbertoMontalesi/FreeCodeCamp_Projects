$(document).ready(function () {

  //fullpage scroll
  $('#fullpage').fullpage({
    
    anchors: ['landing-page', 'features', 'how_it_works', 'pricing'],
    scrollOverflowReset: true
  });

 




    //materialize navbar
    $(".button-collapse").sideNav();
});