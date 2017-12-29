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


  window.pin = {
    renderAllPins: renderAllPins
  };

})();
