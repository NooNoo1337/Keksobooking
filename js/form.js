'use strict';

(function () {
  // validation of form
  var mainForm = document.querySelector('.notice__form');
  var titleInput = document.getElementById('title');
  var priceInput = document.getElementById('price');
  var timeIn = document.getElementById('timein');
  var timeOut = document.getElementById('timeout');
  var typeOfAccommodation = document.getElementById('type');
  var roomNumber = mainForm.querySelector('#room_number');
  var capacity = mainForm.querySelector('#capacity');
  var formAddress = mainForm.querySelector('#address');
  var MAIN_PIN_WIDTH = 31;
  var MAIN_PIN_HEIGHT = 82;

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

  var getFormAddress = function (coordinates) {
    var pinX = coordinates.x + MAIN_PIN_WIDTH;
    var pinY = coordinates.y + MAIN_PIN_HEIGHT;
    formAddress.value = pinX + ', ' + pinY;
  };

  window.form = {
    getFormAddress: getFormAddress
  };
})();
