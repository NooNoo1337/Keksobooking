'use strict';

(function () {
  // first pair of synchronized fields
  // first form field (time of checkin)
  var timeIn = document.getElementById('timein');

  // collection of values of the first form field (time of checkin)
  var firstTimeField = timeIn.children;

  // second form field (time of checkout)
  var timeOut = document.getElementById('timeout');

  // collection of values of the second form field (time of checkout)
  var secondTimeField = timeOut.children;

  // second pair of synchronized fields
  // first form field (type of accommodation)
  var typeOfAccommodation = document.getElementById('type');

  // collection of values of the first form field (type of accommodation)
  var formTypes = typeOfAccommodation.children;

  // second form field (price for accommodation)
  var priceInput = document.getElementById('price');

  // collection of values of the second form field (price for accommodation)
  var minPrice = [
    '1000',
    '0',
    '5000',
    '10000'
  ];

  var titleInput = document.getElementById('title');
  var roomNumber = window.constants.mainForm.querySelector('#room_number');
  var capacity = window.constants.mainForm.querySelector('#capacity');
  var formAddress = window.constants.mainForm.querySelector('#address');
  var MAIN_PIN_WIDTH = 31;
  var MAIN_PIN_HEIGHT = 82;

  var illuminationOfError = '0 0 4px 2px red';

  var constraints = {
    tooShort: 'Имя должно состоять минимум из 30 символов',
    tooLong: 'Имя не должно превышать 100 символов',
    valueMissing: 'Обязательное поле для заполнения',
    rangeUnderflow: 'Минимальное значение этого поля не должно быть меньше 0',
    rangeOverflow: 'Максимальное значение  этого поля - 1 000 000',
    typeMismatch: 'Это поле предназначено для числовых значений'
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


  var synchronizeElement = function (element, item) {
    element.value = item.value;
  };

  var synchronizeMinPrice = function (element, item) {
    element.min = item;
  };

  var timeInSynchronization = function () {
    window.synchronizeFields(timeOut, firstTimeField, secondTimeField, synchronizeElement);
  };

  timeInSynchronization();

  var timeOutSynchronization = function () {
    window.synchronizeFields(timeIn, secondTimeField, firstTimeField, synchronizeElement);
  };

  var typeSynchronization = function () {
    window.synchronizeFields(priceInput, formTypes, minPrice, synchronizeMinPrice);
  };

  typeSynchronization();

  var synchronizeForm = function () {
    timeInSynchronization();
    timeOutSynchronization();
    typeSynchronization();
  };

  synchronizeForm();

  timeIn.addEventListener('change', timeInSynchronization);
  timeOut.addEventListener('change', timeOutSynchronization);
  typeOfAccommodation.addEventListener('change', typeSynchronization);


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
    formAddress.value = 'x: ' + pinX + ', ' + 'y: ' + pinY;
  };

  var resetForm = function () {
    window.constants.mainForm.reset();
    synchronizeForm();
    window.util.formHandler('Данные успешно отправлены!');
    getFormAddress(window.constants.PIN_COORDINATES);
    window.constants.mainPin.style.left = window.constants.PIN_COORDINATES.x + 'px';
    window.constants.mainPin.style.top = window.constants.PIN_COORDINATES.y + 'px';
  };

  window.constants.mainForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(window.constants.mainForm), resetForm, window.util.formHandler);
  });

  window.form = {
    getFormAddress: getFormAddress
  };
})();
