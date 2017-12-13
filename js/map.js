'use strict';

// Показ окна карты
var mapBlock = document.querySelector('.map');
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

var numberOfAnnouncements = 8;

// получение рандомного значения свойства
var getRandomElement = function (array) {
  var element = array[Math.floor(Math.random() * array.length)];
  return element;
};

// получение рандомного значения из интервала
var getRandomFromInterval = function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// получение рандомного длины массива характеристик
var getRandomFeaturesLength = function () {
  var randomFeaturesLength = Math.ceil(Math.random() * featuresArr.length);
  return randomFeaturesLength;
};

// получение фич
var getFeatures = function () {
  var features = featuresArr.slice();
  function compareRandom() {
    return Math.random() - 0.5;
  }
  features.sort(compareRandom);
  features.length = getRandomFeaturesLength();
  return features;
};


// получение рандомного объекта из свойств
var getRandomAnnouncement = function () {
  var x = getRandomFromInterval(setOfIntervals.x.min, setOfIntervals.x.max);
  var y = getRandomFromInterval(setOfIntervals.y.min, setOfIntervals.y.max);


  var announcement = {
    author: {
      avatar: getRandomElement(avatars)
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

// получение массива из рандомных объектов
var getAnnouncements = function (number) {
  var allAnnouncements = [];

  for (var i = 0; i < number; i++) {
    allAnnouncements[i] = getRandomAnnouncement();
  }
  return allAnnouncements;
};

var announcementsMassive = getAnnouncements(numberOfAnnouncements);

// Отрисовка пинов
var renderMapPin = function (announcement, number) {
  var mapPinElement = similarPinTemplate.cloneNode(true);

  mapPinElement.style.top = announcement.location.y + 'px';
  mapPinElement.style.left = announcement.location.x + 'px';
  mapPinElement.querySelector('.map__pin--avatar').src = announcement.author.avatar;
  mapPinElement.id = 'pin-' + number;

  return mapPinElement;
};

var fragment = document.createDocumentFragment();

var pins = [];

var createAllPins = function (array) {
  for (var i = 0; i < announcementsMassive.length; i++) {
    array[i] = fragment.appendChild(renderMapPin(announcementsMassive[i], i));
  }
  similarPinElement.appendChild(fragment);
};

// очистка features в шаблоне
var listOfFeatures = similarAnnouncementTemplate.querySelector('.popup__features');
while (listOfFeatures.firstChild) {
  listOfFeatures.removeChild(listOfFeatures.firstChild);
}

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

var createPopup = function (number) {
  fragment.appendChild(renderAnnouncement(announcementsMassive[number], number));
  mapBlock.appendChild(fragment);
};


// работа с главным пином и мапой
// Активация карты
var activateMap = function () {
  mapBlock.classList.remove('map--faded');
  mainForm.classList.remove('notice__form--disabled');

  allFieldsets.forEach(function (item) {
    item.removeAttribute('disabled');
  });

  createAllPins(pins);
};

mainPin.addEventListener('mouseup', activateMap);


// Смена пина
var changePinColor = function (node) {
  if (selectedPin) {
    selectedPin.classList.remove('map__pin--active');
  }
  selectedPin = node;
  selectedPin.classList.add('map__pin--active');
};


var showPopup = function () {
  var mapCard = document.querySelector('.popup');
  var closePopupButton = mapBlock.querySelector('.popup__close');
  mapCard.classList.remove('hidden');

  var closePopup = function () {
    mapBlock.removeChild(mapCard);
    selectedPin.classList.remove('map__pin--active');
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_BUTTON) {
      var closeByEnt = (closePopupButton === document.activeElement) ? 0 : closePopup();
    }
    return closeByEnt;
  };

  document.addEventListener('keydown', onPopupEscPress);
  closePopupButton.addEventListener('click', closePopup);
};

// Открытие попапа
var openPopup = function (evt) {
  var target = evt.target;
  var pinId;
  while (target !== 'button') {
    if (target.className === 'map__pin') {
      pinId = target.id.replace('pin-', '');
      createPopup(pinId);
      changePinColor(target);
      showPopup();
      return;
    }
    target = target.parentNode;
  }
};

similarPinElement.addEventListener('click', openPopup);

