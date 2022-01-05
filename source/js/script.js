'use strict';


// Главное меню

const mainNavButton = document.querySelector('.main-nav__menu-button');
const mainNavElement = document.querySelector('.main-nav');
const MAIN_NAV_CSS_CLASSES = ['main-nav--opened', 'main-nav--closed'];

const menuStarter = (
  button,
  menuElement,
  cssClassesArray,
) => {
  button.addEventListener('click', () => {
    for (const cssClass of cssClassesArray) {
      menuElement.classList.toggle(cssClass);
    }
  });
};

mainNavElement.classList.add('main-nav--closed');
mainNavElement.classList.remove('main-nav--no-js');
menuStarter(mainNavButton, mainNavElement, MAIN_NAV_CSS_CLASSES);


// Pop-up

const POPUP_SHOW_CSS_CLASS = 'popup--show';

const showPopup = (popupElement, popupCloseButton) => {

  const closePopup = () => {
    popupCloseButton.removeEventListener('click', closeButtonHandler);
    document.removeEventListener('keydown', escKeydownHandler);
    popupElement.classList.remove(POPUP_SHOW_CSS_CLASS);
  };

  const escKeydownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      closePopup();
    }
  };

  const closeButtonHandler = (evt) => {
    evt.preventDefault();
    closePopup();
  };

  popupElement.classList.add(POPUP_SHOW_CSS_CLASS);
  popupCloseButton.addEventListener('click', closeButtonHandler);
  document.addEventListener('keydown', escKeydownHandler);
};


// Форма конкурса

const contestFormElement = document.querySelector('.contest__form');
const contestFormSuccesPopupElement = document.querySelector('.popup--succes');
const contestFormSuccesPopupCloseButton = document.querySelector('.popup--succes .popup__submit');
const contestFormFailurePopupElement = document.querySelector('.popup--failure');
const contestFormFailurePopupCloseButton = document.querySelector('.popup--failure .popup__submit');
const INPUT_WARNING_CSS_CLASS = 'form__warning';


const formStarter = (
  formElement,
  inputWarningCssClass,
  succesPopupElement,
  succesPopupCloseButton,
  failurePopupElement,
  failurePopupCloseButton,
) => {
  const formRequiredElements = formElement.querySelectorAll('[required]');

  for (const element of formRequiredElements) {
    element.removeAttribute('required');
  }

  const formSubmitHandler = (evt) => {
    let missingRequired = false;

    for (let i = formRequiredElements.length - 1; i >= 0; i--) {
      formRequiredElements[i].classList.remove(inputWarningCssClass);

      if (!formRequiredElements[i].value) {
        missingRequired = true;
        formRequiredElements[i].classList.add(inputWarningCssClass);
        formRequiredElements[i].scrollIntoView();
      }
    }

    if (missingRequired) {
      evt.preventDefault();
      showPopup(failurePopupElement, failurePopupCloseButton);
    } else {
      evt.preventDefault();
      showPopup(succesPopupElement, succesPopupCloseButton);
      formElement.reset();
    }
  };

  formElement.addEventListener('submit', formSubmitHandler);
};

if (contestFormElement && contestFormSuccesPopupElement && contestFormFailurePopupElement) {
  formStarter(
    contestFormElement,
    INPUT_WARNING_CSS_CLASS,
    contestFormSuccesPopupElement,
    contestFormSuccesPopupCloseButton,
    contestFormFailurePopupElement,
    contestFormFailurePopupCloseButton,
  );
}


// фотоальбом

const album = document.querySelector('.album');
const picturePopupElement = document.querySelector('.popup--photo');
const LIKES_BUTTON_CSS_CLASS = 'likes__button--liked';

if (album && picturePopupElement) {
  const picturePopupImage = picturePopupElement.querySelector('.popup__full-picture');
  const picturePopupDownloadLink = picturePopupElement.querySelector('.popup__download--file');
  const picturePopupCloseButton = picturePopupElement.querySelector('.popup__download--cancel');

  const likesClickHandler = (button, counter, cssClass) => {
    if (button.classList.contains(cssClass)) {
      counter.textContent--;
    } else {
      counter.textContent++;
    }
    button.classList.toggle(cssClass);
    document.activeElement.blur();
  };

  const thumbnailClickHandler = (photo) => {
    const photoUrl = photo.href;
    picturePopupImage.src = photoUrl;
    picturePopupDownloadLink.href = photoUrl;
    showPopup(picturePopupElement, picturePopupCloseButton);
  };

  album.addEventListener('click', (evt) => {
    const albumItem = evt.target.closest('.album__item');
    const albumItemPhotoLink = evt.target.closest('.album__photo-link');
    const albumItemLikesButton = evt.target.closest('.likes__button');
    const albumLikesCounter = albumItem.querySelector('.likes__count');

    if (albumItemPhotoLink) {
      evt.preventDefault();
      thumbnailClickHandler(albumItemPhotoLink);
      return;
    }

    if (albumItemLikesButton && albumLikesCounter) {
      evt.preventDefault();
      likesClickHandler(albumItemLikesButton, albumLikesCounter, LIKES_BUTTON_CSS_CLASS);
      return;
    }
  });
}


// фоторедактор

const photoEditor = document.querySelector('.photo-editor__interface');

if (photoEditor) {
  const photoEditorImage = photoEditor.querySelector('.photo-editor__image');
  const photoEditorOverlay = photoEditor.querySelector('.photo-editor__image-overlay');
  const photoEditorControls = photoEditor.querySelector('.photo-editor__controls');
  const photoEditorTools = photoEditor.querySelectorAll('.photo-editor__tool');
  const photoEditorRanges = photoEditor.querySelectorAll('.photo-editor__range');
  const cropControl = photoEditor.querySelector('.photo-editor__range--crop input');
  const fillControl = photoEditor.querySelector('.photo-editor__range--fill input');
  const contrastControl = photoEditor.querySelector('.photo-editor__range--contrast input');
  const photoEditorReset = photoEditor.querySelector('.photo-editor__button--reset');

  photoEditorControls.addEventListener('click', (evt) => {
    const currentToolButton = evt.target.closest('.photo-editor__tool');
    if (!currentToolButton) {
      return;
    }
    evt.preventDefault();

    for (const editorTool of photoEditorTools) {
      editorTool.classList.remove('photo-editor__tool--current');
    }
    currentToolButton.classList.add('photo-editor__tool--current');

    for (const editorRange of photoEditorRanges) {
      if (editorRange.dataset.tool === currentToolButton.dataset.tool) {
        editorRange.classList.add('photo-editor__range--current');
      } else {
        editorRange.classList.remove('photo-editor__range--current');
      }
    }
    document.activeElement.blur();
  });

  const cropInputHandler = () => {
    photoEditorImage.style.transform = `scale(${1 + 0.04 * cropControl.value})`;
  }

  const fillInputHandler = () => {
    photoEditorOverlay.style.opacity = (0.01 * fillControl.value);
  }

  const contrastInputHandler = () => {
    photoEditorImage.style.filter = `contrast(${(0.015 * contrastControl.value) + 0.25})`;
  }

  const photoEditorResetHandler = () => {
    cropControl.value = 0;
    cropInputHandler();
    fillControl.value = 0;
    fillInputHandler();
    contrastControl.value = 50;
    contrastInputHandler();
  }

  cropControl.addEventListener('input', cropInputHandler);
  fillControl.addEventListener('input', fillInputHandler);
  contrastControl.addEventListener('input', contrastInputHandler);
  photoEditorReset.addEventListener('click', photoEditorResetHandler);
}


// слайдер

const initSlider = ({
    targetCssClass,
    workScreenWidthMax = Infinity,
    swipeThreshold = 0.3,
    transitionDuration = 0.7
  }) => {
  const target = document.querySelector(`.${targetCssClass}`);
  if (!target) {
    return;
  };
  const sliderWrapper = target.querySelector('.slider__wrapper');
  const sliderList = target.querySelector('.slider__list');
  const slides = target.querySelectorAll('.slider__item');
  const arrows = target.querySelectorAll('.slider__button');
  const prev = arrows[0];
  const next = arrows[1];
  const markers = target.querySelectorAll('.slider__markers-item');
  let slideIndex = 0;
  let posInit = 0;
  let posX1 = 0;
  let posX2 = 0;
  let posY1 = 0;
  let posY2 = 0;
  let positionShift = 0;
  let isSwipe = false;
  let isScroll = false;
  let allowSwipe = true;
  let transition = true;
  let toNextTransform = 0;
  let toPrevTransform = 0;
  const transformValueRegExp = /([-0-9.]+(?=px))/;

  let slideWidth;
  let posThreshold;
  let lastTrf;
  const updateWidthData = () => {
    slideWidth = slides[0].offsetWidth;
    posThreshold = slideWidth * swipeThreshold;
    lastTrf = (slides.length - 1) * slideWidth;
  }

  const isNotWorkingScreenWidth = () => {
    return document.documentElement.clientWidth > workScreenWidthMax;
  }

  const updateSliderMarkers = (newIndex = 0) => {
    for (const markerItem of markers) {
      markerItem.classList.remove('slider__markers-item--current');
    }
    markers[newIndex].classList.add('slider__markers-item--current');
  }
  updateSliderMarkers();

  const getEvent = (evt) => {
    if (evt.type.search('touch') !== -1) {
      return evt.touches[0];
    } else {
      return evt;
    }
  };

  const slide = () => {
    updateWidthData();
    updateSliderMarkers(slideIndex);
    if (transition) {
      sliderList.style.transition = `transform ${transitionDuration}s ease-out`;
    }
    sliderList.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;

    prev.classList.toggle('slider__button--disabled', slideIndex === 0);
    prev.toggleAttribute('disabled', slideIndex === 0);
    next.classList.toggle('slider__button--disabled', slideIndex === (slides.length - 1));
    next.toggleAttribute('disabled', slideIndex === (slides.length - 1));
  };

  const swipeStart = (evt) => {
    updateWidthData();
    if (isNotWorkingScreenWidth()) {
      return;
    }
    let userEvt = getEvent(evt);

    if (allowSwipe) {
      transition = true;
      toNextTransform = (slideIndex + 1) * -slideWidth;
      toPrevTransform = (slideIndex - 1) * -slideWidth;

      posInit = posX1 = userEvt.clientX;
      posY1 = userEvt.clientY;

      sliderList.style.transition = '';

      document.addEventListener('touchmove', swipeAction);
      document.addEventListener('touchend', swipeEnd);
      document.addEventListener('mousemove', swipeAction);
      document.addEventListener('mouseup', swipeEnd);

      sliderWrapper.classList.remove('grab');
      sliderWrapper.classList.add('grabbing');
    }
  };

  const swipeAction = (evt) => {
    let userEvt = getEvent(evt);
    let transform = +(sliderList.style.transform.match(transformValueRegExp)[0]);

    posX2 = posX1 - userEvt.clientX;
    posX1 = userEvt.clientX;
    posY2 = posY1 - userEvt.clientY;
    posY1 = userEvt.clientY;

    if (!isSwipe && !isScroll) {
      let posY = Math.abs(posY2);
      if (posY > 11 || posX2 === 0) {
        isScroll = true;
        allowSwipe = false;
      } else {
        isSwipe = true;
      }
    }

    if (isSwipe) {
      if ((slideIndex === 0 && posX1 > posInit)) {
        setTransform(transform, 0);
        return;
      } else if (slideIndex === (slides.length - 1) && posX1 < posInit) {
        setTransform(transform, lastTrf);
        return;
      } else {
        allowSwipe = true;
      }

      if (posInit > posX1 && transform < toNextTransform || posInit < posX1 && transform > toPrevTransform) {
        reachEdge();
        return;
      }

      sliderList.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
    }
  };

  const swipeEnd = () => {
    updateWidthData();
    positionShift = Math.abs(posInit - posX1);
    isScroll = false;
    isSwipe = false;
    document.removeEventListener('touchmove', swipeAction);
    document.removeEventListener('mousemove', swipeAction);
    document.removeEventListener('touchend', swipeEnd);
    document.removeEventListener('mouseup', swipeEnd);
    sliderWrapper.classList.add('grab');
    sliderWrapper.classList.remove('grabbing');

    if (allowSwipe) {
      if (positionShift > posThreshold) {
        if (posX1 > posInit) {
          slideIndex--;
        } else if (posX1 < posInit) {
          slideIndex++;
        }
      }

      if (posX1 !== posInit) {
        allowSwipe = false;
        slide();
      } else {
        allowSwipe = true;
      }

    } else {
      allowSwipe = true;
    }
  };

  const setTransform = (transform, compareTransform) => {
    if (transform >= compareTransform) {
      sliderList.style.transform = `translate3d(${compareTransform}px, 0px, 0px)`;
    }
    allowSwipe = false;
  };

  const reachEdge = () => {
    transition = false;
    swipeEnd();
    allowSwipe = true;
  };

  const onArrowsClick = (evt) => {
    const clickedButton = evt.target.closest('button');
    if (clickedButton.classList.contains('slider__button-next')) {
      slideIndex++;
    } else if (clickedButton.classList.contains('slider__button-prev')) {
      slideIndex--;
    } else {
      return;
    }
    slide();
  }

  sliderList.style.transform = 'translate3d(0px, 0px, 0px)';
  sliderWrapper.classList.add('grab');

  sliderList.addEventListener('transitionend', () => allowSwipe = true);
  sliderWrapper.addEventListener('touchstart', swipeStart);
  sliderWrapper.addEventListener('mousedown', swipeStart);
  prev.addEventListener('click', onArrowsClick);
  next.addEventListener('click', onArrowsClick);

  window.addEventListener('resize', () => {
    if (isNotWorkingScreenWidth()) {
      slideIndex = 0;
      slide();
    }
  });
}

initSlider({
  targetCssClass: 'reviews__wrapper',
  swipeThreshold: 0.2,
  transitionDuration: 0.5,
});

initSlider({
  targetCssClass: 'price__slider',
  workScreenWidthMax: 659,
  swipeThreshold: 0.2,
  transitionDuration: 0.1,
});
