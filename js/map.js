'use strict';

(function () {
  var LocationArea = {
    MIN_Y: 100,
    MAX_Y: 650
  };

  var mapParameters = {
    LEFT: window.util.pinParameters.pinWidth / 2,
    RIGHT: window.util.mapBlock.clientWidth - window.util.pinParameters.pinWidth / 2,
    TOP: LocationArea.MIN_Y,
    BOTTOM: LocationArea.MAX_Y
  };

  var NUMBER_OF_PINS = 5;
  var listOfPins = document.querySelector('.map__pins');
  var pinsCollection = [];

  // get all announcements
  var getAnnouncement = function (collection) {
    var fragment = document.createDocumentFragment();
    collection.forEach(function (item) {
      fragment.appendChild(window.pin.get(item));
    });
    return fragment;
  };

  // get announcements with pins
  var getAnnouncementWithPins = function (collection) {
    pinsCollection = collection;
    var finalPinsCollection = pinsCollection.slice(NUMBER_OF_PINS);
    listOfPins.appendChild(getAnnouncement(finalPinsCollection));
  };

  // delete unnecessary pins
  var deletePins = function (parent) {
    var pinsToRemove = parent.querySelectorAll('.map__pin:not(.map__pin--main)');
    pinsToRemove.forEach(function (currentPin) {
      parent.removeChild(currentPin);
    });
  };

  // render all pins
  var renderAllPins = function () {
    var filteredPins = window.filterPins(pinsCollection);
    var mapCardActive = document.querySelector(window.util.popup);

    deletePins(listOfPins);
    if (mapCardActive) {
      window.util.mapBlock.removeChild(mapCardActive);
    }
    filteredPins.length = Math.min(filteredPins.length, NUMBER_OF_PINS);
    listOfPins.appendChild(getAnnouncement(filteredPins));
  };

  var filters = document.querySelector('.map__filters');

  filters.addEventListener('change', function () {
    window.util.debounce(renderAllPins);
  });


  // activate map
  window.util.mainPin.addEventListener('mouseup', function () {
    var mainForm = document.querySelector('.notice__form--disabled');
    window.util.mapBlock.classList.remove('map--faded');

    if (mainForm) {
      mainForm.classList.remove('notice__form--disabled');
      window.backend.load(getAnnouncementWithPins, window.util.getErrorMessage);
    }

    var allFieldsets = document.querySelectorAll('fieldset');
    allFieldsets.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  });


  // pin movement
  window.util.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentCoords = {
        x: window.util.mainPin.offsetLeft - shift.x,
        y: window.util.mainPin.offsetTop - shift.y
      };

      if (currentCoords.y < mapParameters.TOP) {
        currentCoords.y = mapParameters.TOP;
      }

      if (currentCoords.y > mapParameters.BOTTOM) {
        currentCoords.y = mapParameters.BOTTOM;
      }

      if (currentCoords.x < mapParameters.LEFT) {
        currentCoords.x = mapParameters.LEFT;
      }

      if (currentCoords.x > mapParameters.RIGHT) {
        currentCoords.x = mapParameters.RIGHT;
      }

      window.util.mainPin.style.top = (currentCoords.y) + 'px';
      window.util.mainPin.style.left = (currentCoords.x) + 'px';

      var address = document.querySelector('#address');
      address.value = 'x: ' + currentCoords.x + ' y: ' + currentCoords.y;
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

}());
