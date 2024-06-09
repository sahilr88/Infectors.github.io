'use strict';

var menuState = {
  create: function() {
    game.sound.stopAll();
    game.add.image(0, 0, 'title');
    var licenseImage = game.add.image(game.world.centerX, 425, 'creativecommons');
    licenseImage.scale.setTo(0.8, 0.8);
    licenseImage.anchor.set(0.5);

    if (matchMedia("(pointer: coarse)").matches)
      bitmapTextCentered(350, uiFonts.TITLE, 'Tap to start', 28);
    else
      bitmapTextCentered(350, uiFonts.TITLE, 'Press ENTER to start', 28);

    var licenseLabel = game.add.text(80, 450, 
      // 'Created by Wil Alvarez. Music by David Senabre.\nLicensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International.', 
      {font: '12px Arial', fill: '#fff', align: 'center'});
    licenseLabel.x = Math.round(licenseLabel.x);

    var storage = new Storage();

    this.currentLevel = parseInt(storage.read('level.current'));
    if (this.enableLevelSelection()) {
      this.level = this.currentLevel;
      this.selectLabel = game.add.bitmapText(190, 280, uiFonts.TITLE, 'Select level', 30);
      this.arrowLeft = game.add.sprite(375, 290, 'arrowleft');
      this.arrowRight = game.add.sprite(455, 290, 'arrowright');
      this.levelLabel = game.add.bitmapText(408, 285, uiFonts.TITLE, '00', 30);

      var moveLeft = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
      var moveRight = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
      moveLeft.onDown.add(this.decreaseLevel, this);
      moveRight.onDown.add(this.increaseLevel, this);
    }

    this.createButtons();  // *** Highlighted change: Call to create buttons with labels ***

    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.addOnce(this.start, this);
    this.bgmSound = game.add.audio('main');
    this.bgmSound.play();
  },

  // *** Highlighted change: Create buttons with labels ***
  createButtons: function() {
    // Start Button
    this.startButton = game.add.button(50, 420, 'startButton', this.start, this);
    this.startButton.anchor.set(0.5);
    this.startButtonLabel = game.add.text(this.startButton.x, this.startButton.y + 40, 'Start', {font: '20px Arial', fill: '#fff'});
    this.startButtonLabel.anchor.set(0.5);

    // Instructions Button
    this.instructionsButton = game.add.button(320, 422, 'instructionsButton', this.showInstructions, this);
    this.instructionsButton.anchor.set(0.5);
    this.instructionsButtonLabel = game.add.text(this.instructionsButton.x, this.instructionsButton.y + 40, 'Instructions', {font: '20px Arial', fill: '#fff'});
    this.instructionsButtonLabel.anchor.set(0.5);

    // Sound On/Off Button
    this.soundButton = game.add.button(595, 420, 'soundButton', this.toggleSound, this);
    this.soundButton.anchor.set(0.5);
    this.soundButtonLabel = game.add.text(this.soundButton.x, this.soundButton.y + 40, 'Sound', {font: '20px Arial', fill: '#fff'});
    this.soundButtonLabel.anchor.set(0.5);
  },



  showInstructions: function() {
    this.showPopup('How to Play the Game', '1. Use the arrow keys to move your character.\n2. Collect coins to increase your score.\n3. Avoid obstacles to stay alive.\n4. Reach the finish line to complete the level.');
  },

  // *** Highlighted change: Add a popup function ***
  showPopup: function(title, message) {
    var popup = game.add.group();

    // Background for the popup
    var background = game.add.graphics(0, 0);
    background.beginFill(0x000000, 0.8);
    background.drawRect(0, 0, game.world.width, game.world.height);
    background.endFill();
    popup.add(background);

    // Box for the popup content
    var box = game.add.graphics(game.world.centerX - 150, game.world.centerY - 100);
    box.beginFill(0xffffff, 1);
    box.lineStyle(2, 0x000000, 1);
    box.drawRect(0, 0, 300, 200);
    box.endFill();
    popup.add(box);

    // Title of the popup
    var titleLabel = game.add.text(game.world.centerX, game.world.centerY - 80, title, { font: '24px Arial', fill: '#000' });
    titleLabel.anchor.set(0.5);
    popup.add(titleLabel);

    // Message of the popup
    var messageLabel = game.add.text(game.world.centerX, game.world.centerY, message, { font: '15px Arial', fill: '#000', wordWrap: true, wordWrapWidth: 280 });
    messageLabel.anchor.set(0.5);
    popup.add(messageLabel);

    // Close button for the popup
    var closeButton = game.add.text(game.world.centerX, game.world.centerY + 80, 'Close', { font: '20px Arial', fill: '#000' });
    closeButton.anchor.set(0.5);
    closeButton.inputEnabled = true;
    closeButton.events.onInputDown.add(function() {
      popup.destroy();
    });
    popup.add(closeButton);
  },




  // showInstructions: function() {
  //   alert('Instructions: Use arrow keys to move, space to jump.');
  // },

  toggleSound: function() {
    if (this.bgmSound.isPlaying) {
      this.bgmSound.stop();
    } else {
      this.bgmSound.play();
    }
  },

  handleTap: function(pointer) {
    if (pointer.x > 200 && pointer.x < 400 && pointer.y > 350 && pointer.y < 400) {
      this.start();
    }

    if (this.enableLevelSelection() && pointer.x > 375 && pointer.x < 425 && pointer.y > 290 && pointer.y < 340) {
      this.decreaseLevel();
    }

    if (this.enableLevelSelection() && pointer.x > 455 && pointer.x < 505 && pointer.y > 290 && pointer.y < 340) {
      this.increaseLevel();
    }
  },

  enableLevelSelection: function() {
    return this.currentLevel !== null && this.currentLevel > 1;
  },

  decreaseLevel: function() {
    this.level -= 1;
    if (this.level < 1) this.level = 1;
  },

  increaseLevel: function() {
    this.level += 1;
    if (this.level > this.currentLevel) this.level = this.currentLevel;
  },

  start: function() {
    if (this.enableLevelSelection()) {
      game.global.level = this.level;
      game.state.start('play');
    } else {
      game.state.start('intro');
    }
  },

  update: function() {
    if (this.enableLevelSelection()) {
      var level = this.level.toString();
      this.levelLabel.setText(level);
      if (this.level === this.currentLevel) {
        this.arrowLeft.revive();
        this.arrowRight.kill();
      } else if (this.level === 1) {
        this.arrowLeft.kill();
        this.arrowRight.revive();
      } else {
        this.arrowLeft.revive();
        this.arrowRight.revive();
      }
    }
  }
};
