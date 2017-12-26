'use strict';

(function () {
  var numberOfAnnouncements = 8;

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


  var setOfIntervals = {
    x: {
      min: 300,
      max: 900
    },

    y: {
      min: 100,
      max: 500
    },

    price: {
      min: 1000,
      max: 1000000
    },

    rooms: {
      min: 1,
      max: 5
    },

    guests: {
      min: 1,
      max: 20
    }
  };

  // get path to the picture file
  var getAvatarPath = function (userNumber) {
    var avatarPath = 'img/avatars/user';
    avatarPath += (userNumber < 10 ? '0' : '') + userNumber + '.png';
    return avatarPath;
  };

  // get avatar
  var getAvatar = function (number) {
    avatars[number] = getAvatarPath(number + 1);
    return avatars[number];
  };

  // get random object from properties
  var getRandomAnnouncement = function (number) {
    var x = window.util.getRandomFromInterval(setOfIntervals.x.min, setOfIntervals.x.max);
    var y = window.util.getRandomFromInterval(setOfIntervals.y.min, setOfIntervals.y.max);

    var announcement = {
      author: {
        avatar: getAvatar(number)
      },

      offer: {
        title: window.util.getRandomElement(titles),
        address: x + ', ' + y,
        price: window.util.getRandomFromInterval(setOfIntervals.price.min, setOfIntervals.price.max),
        type: window.util.getRandomElement(types),
        rooms: window.util.getRandomFromInterval(setOfIntervals.rooms.min, setOfIntervals.rooms.max),
        guests: window.util.getRandomFromInterval(setOfIntervals.guests.min, setOfIntervals.guests.max),
        checkin: window.util.getRandomElement(checkes),
        checkout: window.util.getRandomElement(checkes),
        features: window.util.getFeatures(),
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

  // get random collection of announcements from random objects
  var getAnnouncements = function (number) {
    var allAnnouncements = [];

    for (var i = 0; i < number; i++) {
      allAnnouncements[i] = getRandomAnnouncement(i);
    }
    return allAnnouncements;
  };

  var announcementsCollection = getAnnouncements(numberOfAnnouncements);

  window.data = {
    announcementsCollection: announcementsCollection
  };

})();
