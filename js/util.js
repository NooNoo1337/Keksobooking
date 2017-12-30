'use strict';

(function () {
  var getErrorMessage = function (message) {
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
    mapBlock: document.querySelector('.map'),
    popup: '.map__card',
    mainPin: document.querySelector('.map__pin--main'),
    pinParameters: {
      pinWidth: 40,
      pinHeight: 40,
      indentX: 40 / 2,
      indentY: 40,
      getErrorMessage: getErrorMessage
    },
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

}());
