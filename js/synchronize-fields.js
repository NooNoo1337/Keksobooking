'use strict';

(function () {
  // synchronization function for two fields
  // parameters:
  // secondField - second synchronized form field
  // firstCollection - collection of values of the first form
  // secondCollection - collection of values of the second form

  window.synchronizeFields = function (secondField, firstCollection, secondCollection, callback) {
    for (var i = 0; i < firstCollection.length; i++) {
      if (firstCollection[i].selected) {
        var item = secondCollection[i];
        if (typeof callback === 'function') {
          callback(secondField, item);
        }
      }
    }
  };
})();
