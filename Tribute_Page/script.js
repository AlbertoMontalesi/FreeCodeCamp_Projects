document.onreadystatechange = () => {
  if (document.readyState === 'complete') {

    function initElement() {
      const infoButton = document.getElementById("info");
      console.log(infoButton);
      infoButton.onclick = toggleInfoMenu;
    };

    function toggleInfoMenu() {
      var infoList = document.getElementsByTagName('ul')[0];
      if(infoList.getAttribute('id') == 'invisible'){
        infoList.removeAttribute('id','invisible');
      } else {
        infoList.setAttribute('id','invisible');
      }
    }


    initElement();
  } // end doc ready
};