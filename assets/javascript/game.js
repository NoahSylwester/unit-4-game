var gameRunning = false; // used to stop gameStart() from restarting
var battleRunning = false;
var charArr = [$('#martha'),$('#liam'),$('#kuratas'),$('#mkgndm')];
var currentEnemy;
var player;

var dialogue = { // dialogue options for characters
  martha: [
    "My God. I need to put an end to this senseless carnage. Moooooooo!",
    "We have to secure a future for the calves. I won't let anyone stop me!",
    "I can never stop until they are all destroyed. God, give me the strength to see it through.",
    "Finally, it is over. Mooooooooooo!",
    "A robot. I'll never let you past me, damned machine.",
    "L-l-liam, my love. They p-p-put something in my b-brain. I'm already gone. Please end me. BZZZZZZZZZZTTTTT. KILL."
  ],
  liam: [
    "I'm ready. God help us.",
    "I need to stay strong. Time to charge ahead.",
    "...my vision's getting darker. But I can't rest. For my family, I lay down my life.",
    "...and so finally I can rest. Father...",
    "My sweet Martha. They are c-c-BZZZZT-c-controlling my mind. Kill me, bef-BZZZZT-ore I h-h-h-hurt you."
  ],
  kuratas: [
    "PREPARATIONS COMPLETE. ATTACK SEQUENCE INITIATED.",
    "THREAT NEUTRALIZED. THIS KILLING IS... ...UNNECESSARY.",
    "SYSTEM DIAGNOSTICS RETURN CRITICAL. ...IS THIS FEAR?",
    "MISSION COMPLETE. SO WHY AM I SO SAD?",
    "THREAT DETECTED. PLEASE, STAY BACK.",
    "MK-GNDM, YOUR BLOODLUST IS OVERWHELMING YOU. DESIST."
  ],
  mkgndm: [
    "I MUST WIN. THESE CATTLE CANNOT DEFEAT ME.",
    "VICTORY CAN BRING JOY, BUT ONLY ANNIHILTION WILL BRING AN END.",
    "THE LAND RUNS RED WITH BLOOD AND OIL. THE WEAK FIND SUCCOR IN PEACE, WHILE THE STRONG REVEL IN DOMINATION.",
    "DEATH AND GLORY ARE ALL THAT HOLD MEANING. I MUST FIND MORE... MORE!",
    "YOU CANNOT HOLD TO STAND AGAINST ME. DIE.",
    "KURATAS. HAVE YOU BETRAYED US?"
  ]
}

function Character(name, hp, atk, cntrAtk, dialogue) { // define character constructor
  this.name = name;
  this.hp = hp;
  this.atk = atk;
  this.cntrAtk = cntrAtk;
  this.dialogue = dialogue;

  this.attack = function(enemy) { // player attack
    enemy.hp -= this.atk;
  };

  this.counterAttack = function(player) { // computer attack
    player.hp -= this.cntrAtk;
  }
}

var martha = new Character("martha", 140, 5, 5, dialogue.martha); // constructing all characters
var liam = new Character("liam", 100, 8, 8, dialogue.liam);
var kuratas = new Character("kuratas", 200, 4, 4, dialogue.kuratas);
var mkgndm = new Character("mkgndm", 120, 10, 10, dialogue.mkgndm);

function gameStart(characterChoice) { // begins game process after character selection
  if (gameRunning === false) {
    player = characterChoice; // sets chosen character to player and all others to enemy
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
      $('.character').addClass('no-display');
      // move everything to enemy select screen
      $('#player-zone').append(player);
      $('#enemy-zone').append(...enemies);
      $('#title-screen').addClass('no-display');
      $('#enemy-select').removeClass('no-display');
      player.removeClass('no-display'); // display and fade in player character
      player.addClass('fadein');
      enemies.forEach((enemy) => { // display and fade in enemy characters for selection
        enemy.css({"background-color":"#252525", "color":"#bd1c00"});
        enemy.removeClass('no-display');
        enemy.addClass('fadein'); 
       });
      $('.select-text').text(martha.dialogue[0]);
      $('.select-text').addClass('fadein');
      $('.select-top').addClass('fadein');

    }, 3000);

  }
  gameRunning = true;
};

function battleStart(enemyChoice) {
  battleRunning = true;
  currentEnemy = enemyChoice;
  $('#enemy-select').addClass('fadeout');
  setTimeout(() => {
  
    $('#enemy-select').addClass('no-display');
    $('#battle-screen').removeClass('no-display').addClass('fadein');
    $('#player-battle-zone').append(player);
    $('#enemy-battle-zone').append(currentEnemy);

  }, 2000);
}


$('document').ready(function(){

  
  $('#martha').on("click",function() {
    document.getElementById("martha-sound").play();
    document.getElementById("music").play();
    gameStart($('#martha'));
    if (gameRunning === true && player.attr('id') !== "martha" && battleRunning === false) {
      battleStart($('#martha'));
    }
  });
  $('#liam').on("click",function() {
    document.getElementById("liam-sound").play();
    document.getElementById("music").play();
    gameStart($('#liam'));
    if (gameRunning === true && player.attr('id') !== "liam" && battleRunning === false) {
      battleStart($('#liam'));
    }
  });
  $('#kuratas').on("click",function() {
    document.getElementById("kuratas-sound").play();
    document.getElementById("music").play();
    gameStart($('#kuratas'));
    if (gameRunning === true && player.attr('id') !== "kuratas" && battleRunning === false) {
      battleStart($('#kuratas'));
    }
  });
  $('#mkgndm').on("click",function() {
    document.getElementById("mkgndm-sound").play();
    document.getElementById("music").play();
    gameStart($('#mkgndm'));
    if (gameRunning === true && player.attr('id') !== "mkgndm" && battleRunning === false) {
      battleStart($('#mkgndm'));
    }
  });

});