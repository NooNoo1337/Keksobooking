'use strict';

// variables
var mapBlock = document.querySelector('.map');
var numberOfAnnouncements = 8;
var similarPinElement = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var similarAnnouncementTemplate = document.querySelector('template').content.querySelector('.map__card');
var mainPin = document.querySelector('.map__pin--main');
var mainForm = document.querySelector('.notice__form');
var allFieldsets = document.querySelectorAll('fieldset');
var selectedPin;
var ESC_BUTTON = 27;

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

var typesOfProperty = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var checkes = [
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


// get random value of property
var getRandomElement = function (collection) {
  var element = collection[Math.floor(Math.random() * collection.length)];
  return element;
};

//  get random value from interval
var getRandomFromInterval = function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// get random value of length of the collection of characteristics
var getRandomFeaturesLength = function () {
  var randomFeaturesLength = Math.ceil(Math.random() * featuresArr.length);
  return randomFeaturesLength;
};

// get random value of features
var getFeatures = function () {
  var features = featuresArr.slice();
  function compareRandom() {
    return Math.random() - 0.5;
  }
  features.sort(compareRandom);
  features.length = getRandomFeaturesLength();
  return features;
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
  var x = getRandomFromInterval(setOfIntervals.x.min, setOfIntervals.x.max);
  var y = getRandomFromInterval(setOfIntervals.y.min, setOfIntervals.y.max);

  var announcement = {
    author: {
      avatar: getAvatar(number)
    },

    offer: {
      title: getRandomElement(titles),
      address: x + ', ' + y,
      price: getRandomFromInterval(setOfIntervals.price.min, setOfIntervals.price.max),
      type: getRandomElement(types),
      rooms: getRandomFromInterval(setOfIntervals.rooms.min, setOfIntervals.rooms.max),
      guests: getRandomFromInterval(setOfIntervals.guests.min, setOfIntervals.guests.max),
      checkin: getRandomElement(checkes),
      checkout: getRandomElement(checkes),
      features: getFeatures(),
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

var announcementsMassive = getAnnouncements(numberOfAnnouncements);

// render map pin
var getMapPin = function (announcement, number) {
  var mapPinElement = similarPinTemplate.cloneNode(true);

  mapPinElement.style.top = announcement.location.y + 'px';
  mapPinElement.style.left = announcement.location.x + 'px';
  mapPinElement.querySelector('.map__pin--avatar').src = announcement.author.avatar;
  mapPinElement.id = 'pin-' + number;

  return mapPinElement;
};

var fragment = document.createDocumentFragment();

// render all map pins
var renderAllPins = function () {
  var CollectionOfPins = [];
  for (var i = 0; i < announcementsMassive.length; i++) {
    CollectionOfPins[i] = fragment.appendChild(getMapPin(announcementsMassive[i], i));
  }
  similarPinElement.appendChild(fragment);
};


var clearListOfFeatures = function () {
  var listOfFeatures = similarAnnouncementTemplate.querySelector('.popup__features');
  while (listOfFeatures.firstChild) {
    listOfFeatures.removeChild(listOfFeatures.firstChild);
  }
};

var renderAnnouncement = function (announcement) {
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
    fragment.appendChild(item);
    announcementElement.querySelector('.popup__features').appendChild(fragment);
  }

  return announcementElement;

};

// section with pins and map
// Activate map
var activateMap = function () {
  mapBlock.classList.remove('map--faded');
  mainForm.classList.remove('notice__form--disabled');

  allFieldsets.forEach(function (item) {
    item.removeAttribute('disabled');
  });

  renderAllPins();
};

// change pin
mainPin.addEventListener('mouseup', activateMap);

var closePopup = function () {
  var mapCard = document.querySelector('.popup');
  mapBlock.removeChild(mapCard);
  selectedPin.classList.remove('map__pin--active');
};

var closePopupByClick = function () {
  document.querySelector('.popup').classList.add('hidden');
};

var openPopup = function () {
  var closePopupButton = mapBlock.querySelector('.popup__close');
  document.querySelector('.popup').classList.remove('hidden');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_BUTTON) {
      var closeByEnt = (closePopupButton === document.activeElement) ? 0 : closePopupByClick();
    }
    return closeByEnt;
  };

  document.addEventListener('keydown', onPopupEscPress);
  closePopupButton.addEventListener('click', closePopupByClick);
};

var changePinColor = function (node) {
  if (selectedPin) {
    closePopup();
    selectedPin.classList.remove('map__pin--active');
  }
  selectedPin = node;
  selectedPin.classList.add('map__pin--active');
  openPopup();
};


// show popup
var showPopup = function (evt) {
  var target = evt.target;
  var pinId;
  while (target !== 'button') {
    if (target.className === 'map__pin') {
      pinId = target.id.replace('pin-', '');
      clearListOfFeatures();
      fragment.appendChild(renderAnnouncement(announcementsMassive[pinId], pinId));
      mapBlock.appendChild(fragment);
      changePinColor(target);
      openPopup();
      return;
    }
    target = target.parentNode;
  }
};

similarPinElement.addEventListener('click', showPopup);
