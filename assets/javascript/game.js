var gameRunning = false;

function Character(name, hp, atk, cntrAtk) {
  this.name = name;
  this.hp = hp;
  this.atk = atk;
  this.cntrAtk = cntrAtk;

  this.attack = function(enemy) {
    enemy.hp -= this.atk;
  };

  this.counterAttack = function(player) {
    player.hp -= this.cntrAtk;
  }
}

var martha = new Character("martha", 140, 5, 5);
var liam = new Character("liam", 100, 8, 8);
var kuratas = new Character("kuratas", 200, 4, 4);
var mkgndm = new Character("mkgndm", 120, 10, 10);

gameStart = function(characterChoice) {
  if (gameRunning === false) {
    var player = characterChoice;
    $('.title').addClass("fadeout");
    $('.char-prompt').addClass("fadeout");
    $('.img-thumbnail').addClass("fadeout");
    $('.img-thumbnail').removeClass("img-hover");
    setTimeout(() => {

      $('.title').css("display", "none");
      $('.char-prompt').css("display", "none");
      $('body').css({"display":"flex", "align-items":"center", "justify-content":"center"});
      player.addClass('fadein');
      player.insertAfter('<p>My god. I need to finish this.</p>');

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