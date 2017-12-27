'use strict';

(function () {
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

  var checkEscButton = function (evt) {
    if (evt.keyCode === ESC_BUTTON) {
      closeCurrentAnnouncement(evt);
    }
  };

  var closeCurrentAnnouncement = function (evt) {
    closePopup();
    deactivatePin();
    document.removeEventListener('keydown', checkEscButton);
    evt.stopPropagation();
  };

  // show popup
  window.showPopup = function (evt) {
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
})();
