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


// фотоальбом
var album = document.querySelector('.album');

if (album) {
  var picturePopup = document.querySelector('.popup--photo');
  var popupFullPicture = picturePopup.querySelector('.popup__full-picture');
  var popupDownloadLink = picturePopup.querySelector('.popup__download--file');
  var popupCancel = picturePopup.querySelector('.popup__download--cancel');
  var thumbnails = album.querySelectorAll('.album__photo-link');
  var hearts = album.querySelectorAll('.likes__button');
  var likesNumber = album.querySelectorAll('.likes__count');

  var addThumbnailClickHandler = function (thumbnail, photo) {
    thumbnail.addEventListener('click', function (evt) {
      evt.preventDefault();
      popupFullPicture.src = photo;
      popupDownloadLink.href = photo;
      picturePopup.classList.add('popup--show');
    });
  };

  for (var i = 0; i < thumbnails.length; i++) {
    var photoUrl = thumbnails[i].href;
    addThumbnailClickHandler(thumbnails[i], photoUrl);
    popupCancel.addEventListener('click', function (evt) {
      evt.preventDefault();
      picturePopup.classList.remove('popup--show');
    });
  }

  var addLikesClickHandler = function (likeButton, counter) {
    likeButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (likeButton.classList.contains('likes__button--liked')) {
        counter.textContent--;
      } else {
        counter.textContent++;
      }
      likeButton.classList.toggle('likes__button--liked');
      document.activeElement.blur();
    });
  };

  for (var i = 0; i < hearts.length; i++) {
    addLikesClickHandler(hearts[i], likesNumber[i]);
  }
}


// фоторедактор
var photoEditor = document.querySelector('.photo-editor');

if (photoEditor) {
  var photoEditorTools = photoEditor.querySelectorAll('.photo-editor__tool');
  var photoEditorRanges = photoEditor.querySelectorAll('.photo-editor__range');

  var addPhotoEditorToolsClickHandler = function (button, range) {
    button.addEventListener('click', function (evt) {
      evt.preventDefault();
      for (var i = 0; i < photoEditorTools.length; i++) {
        photoEditorTools[i].classList.remove('photo-editor__tool--current');
        photoEditorRanges[i].classList.remove('photo-editor__range--current');
      }
      button.classList.add('photo-editor__tool--current');
      range.classList.add('photo-editor__range--current');
      document.activeElement.blur();
    });
  };

  for (var i = 0; i < photoEditorTools.length; i++) {
    addPhotoEditorToolsClickHandler(photoEditorTools[i], photoEditorRanges[i]);
  }
}
