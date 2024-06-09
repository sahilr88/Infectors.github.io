'use strict';

var bootState = {
  init: function() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.refresh();
  },

  preload: function() {
    game.load.image('progressbar', 'assets/images/progressbar.png');
    game.load.bitmapFont('engeexpa', 'assets/fonts/engeexpa.png', 'assets/fonts/engeexpa.fnt');
  },

  create: function() {
    game.stage.backgroundColor = '#000';
    game.state.start('load');
  }
};


document.getElementById('fullscreen-btn').addEventListener('click', function() {
  let elem = document.documentElement;

  if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
      if (elem.requestFullscreen) {
          elem.requestFullscreen().catch(err => {
              alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
          });
      } else if (elem.mozRequestFullScreen) { // Firefox
          elem.mozRequestFullScreen().catch(err => {
              alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
          });
      } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
          elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT).catch(err => {
              alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
          });
      } else if (elem.msRequestFullscreen) { // IE/Edge
          elem.msRequestFullscreen().catch(err => {
              alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
          });
      }
  } else {
      if (document.exitFullscreen) {
          document.exitFullscreen().catch(err => {
              alert(`Error attempting to exit full-screen mode: ${err.message} (${err.name})`);
          });
      } else if (document.mozCancelFullScreen) { // Firefox
          document.mozCancelFullScreen().catch(err => {
              alert(`Error attempting to exit full-screen mode: ${err.message} (${err.name})`);
          });
      } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
          document.webkitExitFullscreen().catch(err => {
              alert(`Error attempting to exit full-screen mode: ${err.message} (${err.name})`);
          });
      } else if (document.msExitFullscreen) { // IE/Edge
          document.msExitFullscreen().catch(err => {
              alert(`Error attempting to exit full-screen mode: ${err.message} (${err.name})`);
          });
      }
  }
});
