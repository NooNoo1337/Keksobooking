'use strict';

const COUNT_ADVERTISMENT = 8

function getAvatar(avatarNumber = 0) {
    return `../img/avatars/user0${avatarNumber}.png`;
    
}

function generateAdvertisment(advertismentCount) {
  const advertismentsColletion = [];

  for(let i = 1; i <= advertismentCount; i++) {
    advertismentsColletion.push({
        avatar: getAvatar(i),

    })
  }

  return advertismentsColletion;
}

console.log(generateAdvertisment(COUNT_ADVERTISMENT));