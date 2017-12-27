'use strict';

// variables
var mapBlock = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var mainForm = document.querySelector('.notice__form');
var allFieldsets = document.querySelectorAll('fieldset');
var ESC_BUTTON = 27;
var ENTER_BUTTON = 13;

// render all map pins
var renderAllPins = function () {
  var CollectionOfPins = [];
  for (var i = 0; i < window.data.announcementsCollection.length; i++) {
    CollectionOfPins[i] = window.constants.fragment.appendChild(window.pin.getMapPin(window.data.announcementsCollection[i], i));
  }
  window.constants.similarPinElement.appendChild(window.constants.fragment);
};


// render all map announcement
var createPopup = function (number) {
  window.constants.fragment.appendChild(window.card.createAnnouncement(window.data.announcementsCollection[number]));
  mapBlock.appendChild(window.constants.fragment);
  document.querySelector('.popup').classList.remove('hidden');

  // создание события закрытия окна информации по клику и по нажатию на Enter
  var closePopupButton = mapBlock.querySelector('.popup__close');
  closePopupButton.addEventListener('click', closeCurrentAnnouncement);
  closePopupButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_BUTTON) {
      closeCurrentAnnouncement(evt);
    }
  });
};


// activate map
var activateMap = function () {
  mapBlock.classList.remove('map--faded');
  mainForm.classList.remove('notice__form--disabled');

  allFieldsets.forEach(function (item) {
    item.removeAttribute('disabled');
  });

  var defaultCoordinates = {
    x: mainPin.offsetLeft,
    y: mainPin.offsetTop
  };

  window.constants.PIN_COORDINATES = defaultCoordinates;
  window.form.getFormAddress(defaultCoordinates);

  mainPin.removeEventListener('mouseup', activateMap);
  mainPin.addEventListener('mousedown', dragPinMain);

  renderAllPins(window.data.announcementsCollection);
};


mainPin.addEventListener('click', activateMap);

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_BUTTON) {
    activateMap();
  }
});


var checkEscButton = function (evt) {
  if (evt.keyCode === ESC_BUTTON) {
    closeCurrentAnnouncement(evt);
  }
};

var deactivatePin = function () {
  var selectedPin = document.querySelector('.map__pin--active');

  if (selectedPin) {
    selectedPin.classList.remove('map__pin--active');
  }
};


var closePopup = function () {
  var mapCard = document.querySelector('.map__card');

  if (mapCard) {
    mapBlock.removeChild(mapCard);
  }
};


var closeCurrentAnnouncement = function (evt) {
  closePopup();
  deactivatePin();
  document.removeEventListener('keydown', checkEscButton);
  evt.stopPropagation();
};

// show popup
var showPopup = function (evt) {
  var target = evt.target;
  document.addEventListener('keydown', checkEscButton);
  while (target !== mapBlock) {
    if (target.className === 'map__pin') {
      closePopup();
      deactivatePin();
      target.classList.add('map__pin--active');
      var pinId;
      pinId = target.id.replace('pin-', '');
      createPopup(pinId, evt);
      return;
    }
    target = target.parentNode;
  }
};

mapBlock.addEventListener('click', showPopup);

mapBlock.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_BUTTON) {
    showPopup(evt);
  }
});

var dragPinMain = function (evt) {
  evt.preventDefault();


  var startCoordinates = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvent) {
    moveEvent.preventDefault();

    var shift = {
      x: startCoordinates.x - moveEvent.clientX,
      y: startCoordinates.y - moveEvent.clientY
    };

    startCoordinates = {
      x: moveEvent.clientX,
      y: moveEvent.clientY
    };

    if (mainPin.offsetTop - shift.y < window.constants.MIN_PIN_COORDINATE) {
      mainPin.style.top = window.constants.MIN_PIN_COORDINATE + 'px';
    } else if (mainPin.offsetTop - shift.y > window.constants.MAX_PIN_COORDINATE) {
      mainPin.style.top = window.constants.MAX_PIN_COORDINATE + 'px';
    }

    mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
    mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvent) {
    upEvent.preventDefault();
    mapBlock.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  mapBlock.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};
