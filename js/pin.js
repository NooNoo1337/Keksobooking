'use strict';

(function () {
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  var onPinClick = function (evt, object) {
    var activePin = document.querySelector('.map__pin--active');

    if (activePin) {
      window.pin.removeActivePin(activePin);
    }

    evt.currentTarget.classList.add('map__pin--active');
    window.showCard(object);
  };

  // create pin
  window.pin = {
    getMapPin: function (announcement) {
      var mapPinElement = pinTemplate.cloneNode(true);
      var pinAvatar = mapPinElement.querySelector('img');
      mapPinElement.style.left = announcement.location.x - window.util.pinParameters.indentX + 'px';
      mapPinElement.style.top = announcement.location.y - window.util.pinParameters.indentY + 'px';
      pinAvatar.setAttribute('src', announcement.author.avatar);

      mapPinElement.addEventListener('click', function (evt) {
        onPinClick(evt, announcement);
      });

      return mapPinElement;
    },

    removeActivePin: function (activeElement) {
      activeElement.classList.remove('map__pin--active');
    }
  };
})();
