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

  announcementElement.querySelector('.map__pin').style.left = announcement.location.x + 'px';
  announcementElement.querySelector('.map__pin').style.top = announcement.location.y + 'px';
  announcementElement.querySelector('.map__pin--avatar').src = announcement.author.avatar;

  return announcementElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < announcementsMassive.length; i++) {
  fragment.appendChild(renderWizard(announcementsMassive[i]));
}
similarListElement.appendChild(fragment);

//
/* var similarListElement1 = document.querySelector('.map');
var similarWizardTemplate1 = document.querySelector('.map__card').content;

var render = function (announcement) {
  var wizardElement = similarWizardTemplate1.cloneNode(true);

  announcementElement.querySelector('h3').textContent = announcement.offer.title;
  announcementElement.querySelector('small').textContent = announcement.offer.address;
  announcementElement.querySelector('.popup__price').textContent = announcement.offer.price + '&#x20bd;/ночь';
  announcementElement.querySelector('h4').textContent = announcement.offer.rooms + ' комнаты для ' + announcement.offer.guests + ' гостей';
  wizardElement.querySelector('.popup__price').textContent = 'Заезд после ' + announcement.offer.checkin + ', выезд до' + announcement.offer.checkout;
  wizardElement.querySelector('.popup__price').textContent = announcement.offer.price + '&#x20bd;/ночь';

  similarListElement1.insertAdjacentHTML('beforeend', '<h1>Привет!</h1>');

};*/


