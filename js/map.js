'use strict';

// variables
var mapBlock = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var mainForm = document.querySelector('.notice__form');
var allFieldsets = document.querySelectorAll('fieldset');
var ESC_BUTTON = 27;


// render all map pins
var renderAllPins = function () {
  var CollectionOfPins = [];
  for (var i = 0; i < window.data.announcementsCollection.length; i++) {
    CollectionOfPins[i] = window.constants.fragment.appendChild(window.pin.getMapPin(window.data.announcementsCollection[i], i));
  }
  window.constants.similarPinElement.appendChild(window.constants.fragment);
};

// render all map announcements
var renderAnnouncements = function (id) {
  var CollectionOfA = [];
  for (var i = 0; i < window.data.announcementsCollection.length; i++) {
    CollectionOfA[i] = window.constants.fragment.appendChild(window.card.createAnnouncement(window.data.announcementsCollection[id], id));
  }
  mapBlock.appendChild(window.constants.fragment);
};

// section with pins and map
// Activate map
var activateMap = function () {
  mapBlock.classList.remove('map--faded');
  mainForm.classList.remove('notice__form--disabled');

  allFieldsets.forEach(function (item) {
    item.removeAttribute('disabled');
  });

  renderAllPins();
};

// change pin
mainPin.addEventListener('mouseup', activateMap);

var closePopup = function () {
  var mapCard = document.querySelector('.popup');
  mapBlock.removeChild(mapCard);
};

var closePopupByClick = function () {
  document.querySelector('.popup').classList.add('hidden');
  setPinActive();

};

var closePopupByButton = function () {
  var closePopupButton = mapBlock.querySelector('.popup__close');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_BUTTON) {
      closePopupByClick();
    }
  };

  document.addEventListener('keydown', onPopupEscPress);
  closePopupButton.addEventListener('click', closePopupByClick);
};

var openPopup = function () {
  document.querySelector('.popup').classList.remove('hidden');

  closePopupByButton();
};

var setPinActive = function (node) {
  var selectedPin = document.querySelector('.map__pin--active');

  if (selectedPin) {
    selectedPin.classList.remove('map__pin--active');
    closePopup();
  }

  selectedPin = node;
  selectedPin.classList.add('map__pin--active');
  openPopup();
};


// show popup
var showPopup = function (evt) {
  var target = evt.target;

  while (target !== mapBlock) {
    if (target.classList.contains('map__pin')) {
      var pinId;
      pinId = target.id.replace('pin-', '');
      renderAnnouncements(pinId);
      setPinActive(target);
      openPopup();
      return;
    }
    target = target.parentNode;
  }
};

mapBlock.addEventListener('click', showPopup);
