'use strict';

(function () {

  var featuresArr = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

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

  var formHandler = function (message) {
    var formPopup = document.createElement('div');
    formPopup.classList.add('form-popup');
    formPopup.textContent = message;
    document.body.insertAdjacentElement('afterbegin', formPopup);
    var formButton = document.createElement('button');
    formButton.classList.add('form-popup__button');
    var closePopup = function () {
      document.body.removeChild(formPopup);
    };
    formButton.addEventListener('click', closePopup);
    formPopup.appendChild(formButton);
  };

  window.util = {
    getRandomElement: getRandomElement,
    getRandomFromInterval: getRandomFromInterval,
    getFeatures: getFeatures,
    formHandler: formHandler,
    debounce: function (debouncedFunction) {
      var lastTimeout;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        debouncedFunction();
      }, 1000);
    }
  };
})();
