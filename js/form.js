'use strict';

(function () {
  var roomsNumber = window.constants.mainform.querySelector('#room_number');
  var guestsCount = window.constants.mainform.querySelector('#capacity');
  var illuminationOfError = '0 0 4px 2px red';
  var i = 0;

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

  var OPTIONS = {
    100: [NO_GUESTS],
    1: [ONE_GUEST],
    2: [ONE_GUEST, TWO_GUESTS],
    3: [ONE_GUEST, TWO_GUESTS, THREE_GUESTS]
  };

  var maxPrice = '1000000';

  var typesOfAccommodation = ['bungalo', 'flat', 'house', 'palace'];

  var minPrice = [
    0,
    1000,
    5000,
    10000
  ];

  var timeOfCheck = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var lengthOfTitle = {
    MIN_LENGTH: 30,
    MAX_LENGTH: 100
  };


  var succesMessage = function () {
    var formPopup = document.createElement('div');
    formPopup.classList.add('form-popup');
    formPopup.textContent = 'Форма успешно отправлена!';
    document.body.insertAdjacentElement('afterbegin', formPopup);
    var formButton = document.createElement('button');
    formButton.classList.add('form-popup__button');
    var closePopup = function () {
      document.body.removeChild(formPopup);
    };
    formButton.addEventListener('click', closePopup);
    formPopup.appendChild(formButton);
  };

  var onSuccess = function () {
    window.constants.mainform.reset();
    succesMessage();
  };


  var synchronizeValues = function (element, value) {
    element.value = value;
  };

  var synchronizeMinValue = function (element, value) {
    element.min = value;
  };

  // synchronize checkin field with checkout field
  window.constants.timeIn.addEventListener('change', function () {
    window.synchronizeFields(window.constants.timeIn, window.constants.timeOut, timeOfCheck, timeOfCheck, synchronizeValues);
  });

  window.constants.timeOut.addEventListener('change', function () {
    window.synchronizeFields(window.constants.timeOut, window.constants.timeIn, timeOfCheck, timeOfCheck, synchronizeValues);
  });

  // synchronize type of accommodation field with it price
  window.constants.typeInput.addEventListener('change', function () {
    window.synchronizeFields(window.constants.typeInput, window.constants.priceInput, typesOfAccommodation, minPrice, synchronizeMinValue);
  });

  var getOptions = function (guests) {
    for (i = 0; i < guests.length; i++) {
      var option = document.createElement('option');
      option.value = guests[i].value;
      option.innerHTML = guests[i].text;
      guestsCount.appendChild(option);
    }
  };

  roomsNumber.addEventListener('change', function () {
    var roomsCountValue = roomsNumber.value;
    guestsCount.value = (roomsCountValue === '100') ? '0' : roomsCountValue;

    while (guestsCount.firstChild) {
      guestsCount.removeChild(guestsCount.firstChild);
    }

    getOptions(OPTIONS[roomsCountValue]);
  });

  window.constants.priceInput.addEventListener('invalid', function () {
    window.constants.priceInput.setCustomValidity('');
    window.constants.priceInput.style.boxShadow = 'none';
    if (window.constants.priceInput.validity.valueMissing) {
      window.constants.priceInput.style.boxShadow = illuminationOfError;
      window.constants.priceInput.setCustomValidity('Введите цену');
    }
    if (window.constants.priceInput.validity.rangeUnderflow) {
      window.constants.priceInput.style.boxShadow = illuminationOfError;
      window.constants.priceInput.setCustomValidity('Не может стоить меньше ' + window.constants.priceInput.min);
    }
    if (window.constants.priceInput.validity.rangeOverflow) {
      window.constants.priceInput.style.boxShadow = illuminationOfError;
      window.constants.priceInput.setCustomValidity('Не может превышать ' + maxPrice);
    }
  });

  window.constants.titleInput.addEventListener('invalid', function () {
    window.constants.titleInput.setCustomValidity('');
    window.constants.titleInput.style.boxShadow = 'none';
    if (window.constants.titleInput.validity.tooShort) {
      window.constants.titleInput.style.boxShadow = illuminationOfError;
      window.constants.titleInput.setCustomValidity('Заголовок должен содержать не менее ' + lengthOfTitle.MIN_LENGTH + ' символов');
    }
    if (window.constants.titleInput.validity.tooLong) {
      window.constants.titleInput.style.boxShadow = illuminationOfError;
      window.constants.titleInput.setCustomValidity('Длина заголовка не должна превышать ' + lengthOfTitle.MAX_LENGTH + ' символов');
    }
    if (window.constants.titleInput.validity.valueMissing) {
      window.constants.titleInput.style.boxShadow = illuminationOfError;
      window.constants.titleInput.setCustomValidity('Это поле обязательно для заполнения');
    }
  });

  window.constants.mainform.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(window.constants.mainform), onSuccess, window.util.getErrorMessage);
  });
})();
