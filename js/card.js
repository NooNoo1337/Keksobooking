'use strict';

(function () {
  var ESC_BUTTON = 27;
  var ENTER_BUTTON = 13;

  var typesOfProperty = {
    flat: 'квартира',
    house: 'дом',
    bungalo: 'бунгало'
  };

  var i = 0;
  var cardTemplate = document.querySelector('template').content.querySelector('article.map__card');

  var onPopupClick = function (evt) {
    var map = window.util.mapBlock;
    var closeButton = evt.target;
    var mapPinActive = document.querySelector('.map__pin--active');
    var currentPopup = map.querySelector(window.util.popup);
    if (closeButton.classList.contains('popup__close') && currentPopup) {
      mapPinActive.classList.remove('map__pin--active');
      currentPopup.classList.add('hidden');
    }
  };

  var onPopupEscClose = function (evt) {
    var map = window.util.mapBlock;
    var activeElement = evt.target;
    var mapCardActive = map.querySelector(window.util.popup);
    if (evt.keyCode === ESC_BUTTON && mapCardActive) {
      activeElement.classList.remove('map__pin--active');
      map.removeChild(mapCardActive);
      document.querySelector('.map__pins').removeEventListener('keydown', onPopupEscClose);
    }
  };

  var onPopupEnterPress = function (evt) {
    var activeElement = document.querySelector('.popup__close');
    var mapPinActive = document.querySelector('.map__pin--active');
    if (activeElement === evt.target) {
      if (evt.keyCode === ENTER_BUTTON) {
        mapPinActive.classList.remove('map__pin--active');
      }
    }
  };

  // create announcement
  window.createAnnouncement = function (announcement) {
    var announcementElement = cardTemplate.cloneNode(true);
    var announcementFeatures = announcementElement.querySelector('.popup__features');
    var closeButton = announcementElement.querySelector('.popup__close');

    while (announcementElement.querySelector('.popup__features').hasChildNodes()) {
      announcementFeatures.removeChild(announcementFeatures.lastChild);
    }
    for (i = 0; i < announcement.offer.features.length; i++) {
      var li = document.createElement('li');
      var liClass = 'feature--' + announcement.offer.features[i];
      li.classList.add('feature', liClass);
      announcementFeatures.appendChild(li);
    }

    var getRoomsAndGuests = function () {
      var roomsDict = {
        'default': 'комнаты',
        '1': 'комната',
        '5': 'комнат'
      };
      var guestsNumber = announcement.offer.guests === 1 ? 'гостя' : 'гостей';
      var roomsNumber = roomsDict[announcement.offer.rooms] || roomsDict.default;
      return announcement.offer.rooms + ' ' + roomsNumber + ' для ' + announcement.offer.guests + ' ' + guestsNumber;
    };

    announcementElement.querySelector('.map__card--title').textContent = announcement.offer.title;
    announcementElement.querySelector('.map__card--address').textContent = announcement.offer.address;
    announcementElement.querySelector('.popup__price').textContent = announcement.offer.price + ' ₽/ночь';
    announcementElement.querySelector('.map__card--type').textContent = typesOfProperty[announcement.offer.type];
    announcementElement.querySelector('.map__card--rooms').textContent = getRoomsAndGuests();
    announcementElement.querySelector('.map__card--time').textContent = 'Заезд после ' + announcement.offer.checkin + ', ' + 'выезд до ' + announcement.offer.checkout;
    announcementElement.querySelector('.map__card--description').textContent = announcement.offer.description;
    announcementElement.querySelector('.popup__avatar').src = announcement.author.avatar;

    closeButton.addEventListener('click', onPopupClick);
    closeButton.addEventListener('keydown', onPopupEnterPress);
    document.addEventListener('keydown', onPopupEscClose);

    return announcementElement;
  };
})();
