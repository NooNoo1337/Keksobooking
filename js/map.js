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

var announcementsCollection = getAnnouncements(numberOfAnnouncements);

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
  for (var i = 0; i < announcementsCollection.length; i++) {
    CollectionOfPins[i] = fragment.appendChild(getMapPin(announcementsCollection[i], i));
  }
  similarPinElement.appendChild(fragment);
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
    fragment.appendChild(item);
    announcementElement.querySelector('.popup__features').appendChild(fragment);
  }

  return announcementElement;

};

// render all map announcements
var renderAnnouncements = function (id) {
  var CollectionOfA = [];
  for (var i = 0; i < announcementsCollection.length; i++) {
    CollectionOfA[i] = fragment.appendChild(createAnnouncement(announcementsCollection[id], id));
  }
  mapBlock.appendChild(fragment);
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
};

var closePopupByClick = function () {
  document.querySelector('.popup').classList.add('hidden');
  setPinActive();

};

var closePopupByButton = function () {
  var closePopupButton = mapBlock.querySelector('.popup__close');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_BUTTON) {
      closePopupByClick();
    }
  };

  document.addEventListener('keydown', onPopupEscPress);
  closePopupButton.addEventListener('click', closePopupByClick);
};

var openPopup = function () {
  document.querySelector('.popup').classList.remove('hidden');

  closePopupByButton();
};

var setPinActive = function (node) {
  var selectedPin = document.querySelector('.map__pin--active');

  if (selectedPin) {
    selectedPin.classList.remove('map__pin--active');
    closePopup();
  }

  selectedPin = node;
  selectedPin.classList.add('map__pin--active');
  openPopup();
};


// show popup
var showPopup = function (evt) {
  var target = evt.target;

  while (target !== mapBlock) {
    if (target.classList.contains('map__pin')) {
      var pinId;
      pinId = target.id.replace('pin-', '');
      renderAnnouncements(pinId);
      setPinActive(target);
      openPopup();
      return;
    }
    target = target.parentNode;
  }
};

mapBlock.addEventListener('click', showPopup);

// validation of form
var titleInput = document.getElementById('title');
var priceInput = document.getElementById('price');
var timeIn = document.getElementById('timein');
var timeOut = document.getElementById('timeout');
var typeOfAccommodation = document.getElementById('type');
var roomNumber = mainForm.querySelector('#room_number');
var capacity = mainForm.querySelector('#capacity');

var illuminationOfError = '0 0 4px 2px red';

var constraints = {
  tooShort: 'Имя должно состоять минимум из 30 символов',
  tooLong: 'Имя не должно превышать 100 символов',
  valueMissing: 'Обязательное поле для заполнения',
  rangeUnderflow: 'Минимальное значение этого поля не должно быть меньше 0',
  rangeOverflow: 'Максимальное значение  1 000 000',
  typeMismatch: 'Это поле предназначено для числовых значений'
};

var minPrice = {
  flat: 1000,
  bungalo: 0,
  house: 5000,
  palace: 10000
};

var NO_GUESTS = {
  value: 0,
  text: 'не для гостей'
};

var ONE_GUEST = {
  value: 1,
  text: 'для 1 гостя'
};

var TWO_GUESTS = {
  value: 2,
  text: 'для 2 гостей'
};

var THREE_GUESTS = {
  value: 3,
  text: 'для 3 гостей'
};


var roomCapacity = {
  1: [ONE_GUEST],
  2: [ONE_GUEST, TWO_GUESTS],
  3: [ONE_GUEST, TWO_GUESTS, THREE_GUESTS],
  100: [NO_GUESTS]
};

// очистка capacity
var clearCapacity = function () {
  while (capacity.firstChild) {
    capacity.removeChild(capacity.firstChild);
  }
};

var renderCapacity = function (roomsCount) {
  for (var i = 0; i < roomsCount.length; i++) {
    var capacityItem = document.createElement('option');
    capacityItem.value = roomsCount[i].value;
    capacityItem.innerHTML = roomsCount[i].text;
    capacity.appendChild(capacityItem);
  }
};

roomNumber.addEventListener('change', function () {
  var roomsCountValue = roomNumber.value;
  capacity.value = (roomsCountValue === '100') ? '0' : roomsCountValue;

  clearCapacity();

  renderCapacity(roomCapacity[roomsCountValue]);
});


// change time option
document.querySelector('.time__form').onchange = function (evt) {
  timeIn.value = evt.target.value;
  timeOut.value = evt.target.value;
};

// change min price of accommodation
typeOfAccommodation.onchange = function () {
  var price = minPrice[this.value];
  priceInput.setAttribute('min', price);
};


var checkTitleValidity = function () {
  if (titleInput.validity.tooShort) {
    titleInput.style.boxShadow = illuminationOfError;
    return titleInput.setCustomValidity(constraints.tooShort);
  }

  if (titleInput.validity.tooLong) {
    titleInput.style.boxShadow = illuminationOfError;
    return titleInput.setCustomValidity(constraints.tooLong);
  }

  if (titleInput.validity.valueMissing) {
    titleInput.style.boxShadow = illuminationOfError;
    return titleInput.setCustomValidity(constraints.valueMissing);
  }

  titleInput.style.boxShadow = 'none';
  return titleInput.setCustomValidity('');
};

var checkPriceValidity = function () {
  if (priceInput.validity.rangeUnderflow) {
    priceInput.style.boxShadow = illuminationOfError;
    return priceInput.setCustomValidity(constraints.rangeUnderflow);
  }

  if (priceInput.validity.rangeOverflow) {
    priceInput.style.boxShadow = illuminationOfError;
    return priceInput.setCustomValidity(constraints.rangeOverflow);
  }

  if (priceInput.validity.valueMissing) {
    priceInput.style.boxShadow = illuminationOfError;
    return priceInput.setCustomValidity(constraints.valueMissing);
  }

  if (priceInput.validity.typeMismatch) {
    priceInput.style.boxShadow = illuminationOfError;
    return priceInput.setCustomValidity(constraints.typeMismatch);
  }

  priceInput.style.boxShadow = 'none';
  return priceInput.setCustomValidity('');
};

titleInput.addEventListener('invalid', checkTitleValidity, false);
priceInput.addEventListener('invalid', checkPriceValidity, false);
