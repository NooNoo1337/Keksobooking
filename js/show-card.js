'use strict';

(function () {
  window.showCard = function (currentAdvert, filtersContainer) {
    var activePopup = document.querySelector(window.util.popup);

    if (activePopup) {
      window.util.mapBlock.removeChild(activePopup);
    }

    activePopup = window.createAnnouncement(currentAdvert);
    window.util.mapBlock.insertBefore(activePopup, filtersContainer);

    return activePopup;
  };
}());
