'use strict';

(function () {
  var similarAnnouncementTemplate = document.querySelector('template').content.querySelector('.map__card');

  var typesOfProperty = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var createAnnouncement = function (announcement) {
    var announcementElement = similarAnnouncementTemplate.cloneNode(true);
    announcementElement.querySelector('.popup__title').textContent = announcement.offer.title;
    announcementElement.querySelector('small').textContent = announcement.offer.address;
    announcementElement.querySelector('.popup__price').textContent = announcement.offer.price + ' ₽/ночь';
    announcementElement.querySelector('.popup__type').textContent = typesOfProperty[announcement.offer.type];
    announcementElement.querySelector('.rooms').textContent = announcement.offer.rooms + ' комнат для ' + announcement.offer.guests + ' гостей';
    announcementElement.querySelector('.checks').textContent = 'Заезд после ' + announcement.offer.checkin + ', выезд до ' + announcement.offer.checkout;
    announcementElement.querySelector('.description').textContent = announcement.offer.description;
    announcementElement.querySelector('.popup__avatar').src = announcement.author.avatar;
    for (var j = 0; j < announcement.offer.features.length; j++) {
      var item = document.createElement('li');
      item.className = 'feature';
      item.classList.add('feature--' + announcement.offer.features[j]);
      window.constants.fragment.appendChild(item);
      announcementElement.querySelector('.popup__features').appendChild(window.constants.fragment);
    }

    return announcementElement;

  };

  window.card = {
    createAnnouncement: createAnnouncement
  };
})();
