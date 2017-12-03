'use strict';

// Создать массив [],состоящий из 8 сгенерированных объектов {}
var avatars = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];

var titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var types = [
  'flat',
  'house',
  'bungalo'
];

var checkes = [
  '12:00',
  '13:00',
  '14:00'
];

var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];


// Нужно сгенерировать один объект с заданными свойствами
var numberOfAnnouncements = 8;

// получение рандомного значения свойства
var getRandomElement = function (massive) {
  var element = massive[Math.floor(Math.random() * massive.length)];
  return element;
};

var getRandomFromInterval = function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};


// получение рандомного объекта из свойств
var getRandomAnnouncement = function () {
  var x = getRandomFromInterval(300, 900);
  var y = getRandomFromInterval(100, 500);

  var announcement = {
    author: {
      avatar: getRandomElement(avatars)
    },

    offer: {
      title: getRandomElement(titles),
      address: 'location.x, location.y',
      price: getRandomFromInterval(1000, 1000000),
      type: getRandomElement(types),
      rooms: getRandomFromInterval(1, 5),
      guests: getRandomFromInterval(1, 20),
      checkin: getRandomElement(checkes),
      checkout: getRandomElement(checkes),
      features: getRandomElement(features),
      description: '',
      photos: []
    },

    location: {
      x: x,
      y: y
    }
  };

  return announcement;
};

// получение массива из рандомных объектов
var getAnnouncements = function (number) {
  var allAnnouncements = [];

  for (var i = 0; i < number; i++) {
    allAnnouncements[i] = getRandomAnnouncement();
  }
  return allAnnouncements;
};

var announcementsMassive = getAnnouncements(numberOfAnnouncements);

// Показ окна карты
var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');

// Отрисовка элементов
var similarListElement = document.querySelector('.map__pins');
var similarAnnouncementTemplate = document.querySelector('.similar-announcement-template').content;

var renderWizard = function (announcement) {
  var announcementElement = similarAnnouncementTemplate.cloneNode(true);
  var typesOfProperty = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  announcementElement.querySelector('.map__pin').style.left = announcement.location.x + 'px';
  announcementElement.querySelector('.map__pin').style.top = announcement.location.y + 'px';
  announcementElement.querySelector('.map__pin--avatar').src = avatars[i];

  announcementElement.querySelector('h3').textContent = announcement.offer.title;
  /* announcementElement.querySelector('small').textContent = announcement.offer.address;*/
  announcementElement.querySelector('.popup__price').innerHTML = announcement.offer.price + ' &#x20bd;/ночь';
  announcementElement.querySelector('h4').textContent = typesOfProperty[announcement.offer.type];
  announcementElement.querySelector('.rooms').textContent = announcement.offer.rooms + ' комнат для ' + announcement.offer.guests + ' гостей';
  announcementElement.querySelector('.checkes').textContent = 'Заезд после ' + announcement.offer.checkin + ', выезд до ' + announcement.offer.checkout;
  announcementElement.querySelector('.popup__features').innerHTML = '';
  announcementElement.querySelector('.description').textContent = announcement.offer.description;
  announcementElement.querySelector('.popup__avatar').src = announcement.author.avatar;
  announcementElement.querySelector('.popup__features').innerHTML =
    '<li class="feature feature--wifi"></li>' +
    '<li class="feature feature--dishwasher"></li>' +
    '<li class="feature feature--parking"></li>' +
    '<li class="feature feature--washer"></li>' +
    '<li class="feature feature--elevator"></li>' +
    '<li class="feature feature--conditioner"></li>';

  return announcementElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < announcementsMassive.length; i++) {
  fragment.appendChild(renderWizard(announcementsMassive[i]));
}
similarListElement.appendChild(fragment);
