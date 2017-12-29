'use strict';

(function () {
  var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  // render map pin
  var getMapPin = function (announcement, number) {
    var mapPinElement = similarPinTemplate.cloneNode(true);

    mapPinElement.style.top = announcement.location.y + 'px';
    mapPinElement.style.left = announcement.location.x + 'px';
    mapPinElement.querySelector('.map__pin--avatar').src = announcement.author.avatar;
    mapPinElement.id = 'pin-' + number;

    return mapPinElement;
  };

  // render all map pins
 var renderAllPins = function (collection) {
    var CollectionOfPins = [];
    for (var i = 0; i < window.data.announcementsCollection.length; i++) {
      CollectionOfPins[i] = window.constants.fragment.appendChild(getMapPin(collection[i], i));
    }
    window.constants.similarPinElement.appendChild(window.constants.fragment);
  }; 

  var pinsList = document.querySelector('.map__pins');
  var pinsArray = [];
  var numberOfPins = 5;

  var getFragment = function (array) {
    var fragment = document.createDocumentFragment();
    array.forEach(function (item) {
      fragment.appendChild(getMapPin(item));
    });
    return fragment;
  };

  var getFragmentWithPins = function (array) {
    pinsArray = array;
    var finalPinsArray = pinsArray.slice(numberOfPins);
    pinsList.appendChild(getFragment(finalPinsArray));
  };

  var removeAllPins = function (parent) {
    var pinsToRemove = parent.querySelectorAll('.map__pin:not(.map__pin--main)');
    pinsToRemove.forEach(function (currentPin) {
      parent.removeChild(currentPin);
    });
  };

  var renderPinsOnMap = function () {
    var filteredPins = window.filterPins(pinsArray);
    var map = window.util.mapBlock;
    var mapCardActive = document.querySelector('map__card');

    removeAllPins(pinsList);
    if (mapCardActive) {
      map.removeChild(mapCardActive);
    }
    filteredPins.length = Math.min(filteredPins.length, numberOfPins);
    pinsList.appendChild(getFragment(filteredPins));
  };

  var filters = document.querySelector('.map__filters');

  filters.addEventListener('change', function () {
    window.util.debounce(renderPinsOnMap);
  });


  window.pin = {
    /* renderAllPins: renderAllPins, */
    getFragmentWithPins: getFragmentWithPins
  };

})();
