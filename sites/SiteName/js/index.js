(function(){
  'use strict';

  var hamburgerButton = document.querySelector('.js-navigation__hamburger');
  var navigationMenu = document.querySelector('.js-menu');

  hamburgerButton.addEventListener('click', toggle);

  function toggle() {
    if(navigationMenu.classList.contains('menu_opened')) {
      navigationMenu.classList.replace('menu_opened', 'menu_closed');
      hamburgerButton.innerHTML = '<i class="fas fa-bars"></i>';
    } else {
      navigationMenu.classList.replace('menu_closed', 'menu_opened');
      hamburgerButton.innerHTML = '<i class="fas fa-times"></i>';
    }
  }

})();