// Главное меню
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


// Форма конкурса
var contestForm = document.querySelector('.contest__form');
var contestFormSuccesPopup = document.querySelector('.popup--succes');
var contestFormFailurePopup = document.querySelector('.popup--failure');

if (contestForm && contestFormSuccesPopup && contestFormFailurePopup) {
  var contestFormRequiredElements = contestForm.querySelectorAll('[required]');

  for (i = 0; i < contestFormRequiredElements.length; i++) {
    contestFormRequiredElements[i].removeAttribute('required');
  }

  contestForm.addEventListener('submit', function (evt) {
    var missingRequired = false;
    for (i = contestFormRequiredElements.length - 1; i >= 0; i--) {
      console.log(i);
      contestFormRequiredElements[i].classList.remove('form__warning');
      if (!contestFormRequiredElements[i].value) {
        missingRequired = true;
        contestFormRequiredElements[i].classList.add('form__warning');
        contestFormRequiredElements[i].scrollIntoView();
      }
    }
    if (missingRequired) {
      evt.preventDefault();
      contestFormFailurePopup.classList.add('popup--show');
    } else {
      contestFormSuccesPopup.classList.add('popup--show');
      }
  });

  var succesPopupClose = contestFormSuccesPopup.querySelector('.popup__submit');
  succesPopupClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    contestFormSuccesPopup.classList.remove('popup--show');
  });

  var failurePopupClose = contestFormFailurePopup.querySelector('.popup__submit');
  failurePopupClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    contestFormFailurePopup.classList.remove('popup--show');
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (contestFormSuccesPopup.classList.contains('popup--show') || contestFormFailurePopup.classList.contains('popup--show')) {
        contestFormSuccesPopup.classList.remove('popup--show');
        contestFormFailurePopup.classList.remove('popup--show');
      }
    }
  });
}
