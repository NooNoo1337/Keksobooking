'use strict';

(function () {

  // show card(popup)
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
