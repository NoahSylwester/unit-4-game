var gameRunning = false; // used to stop gameStart() from restarting
var charArr = [$('#martha'),$('#liam'),$('#kuratas'),$('#mkgndm')];

function Character(name, hp, atk, cntrAtk) { // define character constructor
  this.name = name;
  this.hp = hp;
  this.atk = atk;
  this.cntrAtk = cntrAtk;

  this.attack = function(enemy) { // player attack
    enemy.hp -= this.atk;
  };

  this.counterAttack = function(player) { // computer attack
    player.hp -= this.cntrAtk;
  }
}

var martha = new Character("martha", 140, 5, 5); // constructing all characters
var liam = new Character("liam", 100, 8, 8);
var kuratas = new Character("kuratas", 200, 4, 4);
var mkgndm = new Character("mkgndm", 120, 10, 10);

gameStart = function(characterChoice) { // begins game process after character selection
  if (gameRunning === false) {
    var player = characterChoice; // sets chosen character to player and all others to enemy
    var enemies = charArr.filter((enemy) => { // sets enemy array as all non-players
      return (enemy.attr('id') !== player.attr('id'));
    });
  
    $('.title').addClass("fadeout"); // fades title screen elements out
    $('.char-prompt').addClass("fadeout");
    $('.character').addClass("fadeout");
    $('.character').removeClass("img-hover"); // removes hover from characters
    setTimeout(() => { // wait to remove elements so that they are completely transparent before any position changes

      $('.title').css("display", "none");
      $('.char-prompt').css("display", "none");
      $('body').css({"display":"flex", "align-items":"center", "justify-content":"center"});
      $('.character').addClass('no-display');
      player.removeClass('no-display'); // display and fade in player character
      player.addClass('fadein');
      $('.fighter-holder').append($('<div>').addClass('col-xs-4'));
      $('.fighter-holder').append($('<div>').addClass('col-xs-5').append(enemies[0]));
      enemies.forEach((enemy) => { // display and fade in enemy characters for selection
        enemy.css({"background-color":"#252525", "color":"#bd1c00"});
        enemy.removeClass('no-display');
        enemy.addClass('fadein'); 
       });

    }, 3000);

  }
  gameRunning = true;
}


$('document').ready(function(){

  
  $('#martha').on("click",function() {
    document.getElementById("martha-sound").play();
    document.getElementById("music").play();
    gameStart($('#martha'));
  });
  $('#liam').on("click",function() {
    document.getElementById("liam-sound").play();
    document.getElementById("music").play();
    gameStart($('#liam'));
  });
  $('#kuratas').on("click",function() {
    document.getElementById("kuratas-sound").play();
    document.getElementById("music").play();
    gameStart($('#kuratas'));
  });
  $('#mkgndm').on("click",function() {
    document.getElementById("mkgndm-sound").play();
    document.getElementById("music").play();
    gameStart($('#mkgndm'));
  });

});