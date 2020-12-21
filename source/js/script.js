var navMain = document.querySelector('.main-nav');
  var menuToggle = document.querySelector('.main-nav__menu-button');

  navMain.classList.add('main-nav--closed');
  navMain.classList.remove('main-nav--no-js');

  menuToggle.addEventListener('click', function() {
    if (navMain.classList.contains('main-nav--closed')) {
      navMain.classList.remove('main-nav--closed');
      navMain.classList.add('main-nav--opened');
    } else {
      navMain.classList.add('main-nav--closed');
      navMain.classList.remove('main-nav--opened');
    }
  });
