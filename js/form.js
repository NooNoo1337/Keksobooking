'use strict';

(function () {

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

  var form = document.querySelector('.notice__form');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var housePrice = form.querySelector('#price');
  var titleInput = form.querySelector('#title');
  var priceInput = form.querySelector('#type');
  var roomsCount = form.querySelector('#room_number');
  var guestsCount = form.querySelector('#capacity');
  var illuminationOfError = '0 0 4px 2px red';
  var i = 0;

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
    form.reset();
    succesMessage();
  };


  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  timeIn.addEventListener('change', function () {
    window.synchronizeFields(timeIn, timeOut, timeOfCheck, timeOfCheck, syncValues);
  });

  timeOut.addEventListener('change', function () {
    window.synchronizeFields(timeOut, timeIn, timeOfCheck, timeOfCheck, syncValues);
  });

  priceInput.addEventListener('change', function () {
    window.synchronizeFields(priceInput, housePrice, typesOfAccommodation, minPrice, syncValueWithMin);
  });

  var getOptions = function (guests) {
    for (i = 0; i < guests.length; i++) {
      var option = document.createElement('option');
      option.value = guests[i].value;
      option.innerHTML = guests[i].text;
      guestsCount.appendChild(option);
    }
  };

  roomsCount.addEventListener('change', function () {
    var roomsCountValue = roomsCount.value;
    guestsCount.value = (roomsCountValue === '100') ? '0' : roomsCountValue;

    while (guestsCount.firstChild) {
      guestsCount.removeChild(guestsCount.firstChild);
    }

    getOptions(OPTIONS[roomsCountValue]);
  });

  priceInput.addEventListener('invalid', function () {
    priceInput.setCustomValidity('');
    priceInput.style.boxShadow = 'none';
    if (priceInput.validity.valueMissing) {
      priceInput.style.boxShadow = illuminationOfError;
      priceInput.setCustomValidity('Введите цену');
    }
    if (priceInput.validity.rangeUnderflow) {
      priceInput.style.boxShadow = illuminationOfError;
      priceInput.setCustomValidity('Не может стоить меньше ' + priceInput.min);
    }
    if (priceInput.validity.rangeOverflow) {
      priceInput.style.boxShadow = illuminationOfError;
      priceInput.setCustomValidity('Не может превышать ' + maxPrice);
    }
  });

  titleInput.addEventListener('invalid', function () {
    titleInput.setCustomValidity('');
    titleInput.style.boxShadow = 'none';
    if (titleInput.validity.tooShort) {
      titleInput.style.boxShadow = illuminationOfError;
      titleInput.setCustomValidity('Заголовок должен содержать не менее ' + lengthOfTitle.MIN_LENGTH + ' символов');
    }
    if (titleInput.validity.tooLong) {
      titleInput.style.boxShadow = illuminationOfError;
      titleInput.setCustomValidity('Длина заголовка не должна превышать ' + lengthOfTitle.MAX_LENGTH + ' символов');
    }
    if (titleInput.validity.valueMissing) {
      titleInput.style.boxShadow = illuminationOfError;
      titleInput.setCustomValidity('Это поле обязательно для заполнения');
    }
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onSuccess, window.util.getErrorMessage);
  });
})();
