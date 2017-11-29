'use strict';

// Создать массив [],состоящий из 8 сгенерированных объектов {}
var avatarsArr = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];

var titlesArr = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var typesArr = [
  'flat',
  'house',
  'bungalo'
];

var checkArr = [
  '12:00',
  '13:00',
  '14:00'
];

var featuresArr = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];


// Нужно сгенерировать один объект с заданными свойствами
// var numberOfAnnouncements = 8;

// получение рандомного значения свойства
var getRandomElement = function (massive) {
  var element = massive[Math.floor(Math.random() * massive.length)];
  return element;
};

var getRandomIndex = function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// получение рандомного объекта из свойств
var getRandomAnnouncement = function () {
  var announcement = {
    author: {
      avatar: ''
    },

    offer: {
      title: '',
      address: '',
      price: '',
      type: '',
      rooms: '',
      guests: '',
      checkin: '',
      checkout: '',
      features: '',
      description: '',
      photos: []
    },

    location: {
      x: '',
      y: ''
    }
  };

  announcement.author.avatar = getRandomElement(avatarsArr);

  announcement.offer.title = getRandomElement(titlesArr);
  announcement.offer.address = 'location.x, location.y';
  announcement.offer.price = getRandomIndex(1000, 1000000);
  announcement.offer.type = getRandomElement(typesArr);
  announcement.offer.rooms = getRandomIndex(1, 5);
  announcement.offer.guests = getRandomIndex(1, 20);
  announcement.offer.checkin = getRandomElement(checkArr);
  announcement.offer.checkout = getRandomElement(checkArr);
  announcement.offer.features = getRandomElement(featuresArr);
  announcement.offer.description = '';
  announcement.offer.photos = [];

  announcement.location.x = getRandomIndex(300, 900);
  announcement.location.y = getRandomIndex(100, 500);

  return announcement;
};

// получение массива из рандомных объектов
/* var getAnnouncements = function (number) {
  var allAnnouncements = [];

  for (var i = 0; i < number; i++) {
    allAnnouncements[i] = getRandomAnnouncement();
  }
  return allAnnouncements;
};

 var offersMassive = getAnnouncements(numberOfAnnouncements);*/
