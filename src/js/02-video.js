import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframeEl = document.querySelector('#vimeo-player');
const player = new Player(iframeEl);
const STORAGEDATA_KEY = 'videoplayer-current-time';

function currentTime(data) {
  localStorage.setItem(STORAGEDATA_KEY, JSON.stringify(data.seconds));
}

player.on('timeupdate', throttle(currentTime, 1000));

const savedData = localStorage.getItem(STORAGEDATA_KEY) || [];
const seconds = JSON.parse(savedData);

player
  .setCurrentTime(seconds)
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        break;
    }
  });

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});
