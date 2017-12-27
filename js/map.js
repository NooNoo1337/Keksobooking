'use strict';

// variables
var mainPin = document.querySelector('.map__pin--main');
var allFieldsets = document.querySelectorAll('fieldset');

// render all map pins
var renderAllPins = function () {
  var CollectionOfPins = [];
  for (var i = 0; i < window.data.announcementsCollection.length; i++) {
    CollectionOfPins[i] = window.constants.fragment.appendChild(window.pin.getMapPin(window.data.announcementsCollection[i], i));
  }
  window.constants.similarPinElement.appendChild(window.constants.fragment);
};


// activate map
var activateMap = function () {
  window.constants.mapBlock.classList.remove('map--faded');
  window.constants.mainForm.classList.remove('notice__form--disabled');

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
  if (evt.keyCode === window.constants.ENTER_BUTTON) {
    activateMap();
  }
});


window.constants.mapBlock.addEventListener('click', window.showPopup);

window.constants.mapBlock.addEventListener('keydown', function (evt) {
  if (evt.keyCode === window.constants.ENTER_BUTTON) {
    window.showPopup(evt);
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
    window.constants.mapBlock.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  window.constants.mapBlock.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};
