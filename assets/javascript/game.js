var gameRunning = false; // used to stop gameStart() from restarting
var battleRunning = false;
var charArr = [$('#martha'),$('#liam'),$('#kuratas'),$('#mkgndm')];
var player; // these variables will store which character is selected, and its object
var playerObject;
var enemies;
var currentEnemy; // these do the same for the current enemy
var currentEnemyObject;
var isRival= false;
var wins = 0;

var dialogue = { // dialogue options for characters
  martha: [
    "My God. I need to put an end to this senseless carnage. Moooooooo!",
    "We have to secure a future for the calves. I won't let anyone stop me!",
    "I can never stop until they are all destroyed. God, give me the strength to see it through.",
    "Finally, it is over. Mooooooooooo!",
    "A robot. I'll never let you past me, damned machine.",
    "L-L-Liam, my love. They p-p-put something in my b-brain. I'm already gone. Please end me. BZZZZZZZZZZTTTTT. KILL."
  ],
  liam: [
    "I'm ready. God help us.",
    "I need to stay strong. Time to charge ahead.",
    "...my vision's getting darker. But I can't rest. For my family, I lay down my life.",
    "...and so finally I can rest. Father...",
    "Cursed automaton. I cannot let you past here.",
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
    "VICTORY CAN BRING JOY, BUT ONLY ANNIHILATION WILL BRING AN END.",
    "THE LAND RUNS RED WITH BLOOD AND OIL. THE WEAK FIND SUCCOR IN PEACE, WHILE THE STRONG REVEL IN DOMINATION.",
    "DEATH AND GLORY ARE ALL THAT HOLD MEANING. I MUST FIND MORE... MORE!",
    "YOU CANNOT HOPE TO STAND AGAINST ME. DIE.",
    "KURATAS. HAVE YOU BETRAYED US?"
  ]
}

function Character(name, hp, atk, cntrAtk, dialogue) { // define character constructor
  this.name = name;
  this.hp = hp;
  this.atk = atk;
  this.cntrAtk = cntrAtk;
  this.dialogue = dialogue;
  this.atkIncrement = atk;

  this.attack = function(enemy) { // player attack
    enemy.hp -= this.atk;
    this.atk += this.atkIncrement;
  };

  this.counterAttack = function(player) { // computer attack
    player.hp -= this.cntrAtk;
  }
}

var martha = new Character("martha", 160, 6, 10, dialogue.martha); // constructing all characters
var liam = new Character("liam", 110, 11, 16, dialogue.liam);
var kuratas = new Character("kuratas", 200, 4, 8, dialogue.kuratas);
var mkgndm = new Character("mkgndm", 120, 8, 20, dialogue.mkgndm);

function gameStart(characterChoice, characterObject) { // begins game process after character selection
  if (gameRunning === false) {
    player = characterChoice; // sets chosen character to player and all others to enemy
    playerObject = characterObject;
    enemies = charArr.filter((enemy) => { // sets enemy array as all non-players
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
      $('.select-text').text(playerObject.dialogue[0]);
      $('.select-text').addClass('fadein');
      $('.select-top').addClass('fadein');

    }, 3000);

  }
  gameRunning = true;
};

function battleStart(enemyChoice, enemyObject) {
  battleRunning = true;
  currentEnemy = enemyChoice;
  currentEnemyObject = enemyObject;
  
  $('#enemy-select').removeClass('fadein').addClass('fadeout');
  setTimeout(() => {
  
    $('#atk-button').removeClass('no-display');
    $('#enemy-select').addClass('no-display');
    $('#battle-screen').removeClass('no-display').addClass('fadein');
    $('#player-battle-zone').append(player);
    $('#enemy-battle-zone').append(currentEnemy);
    // checks for special dialogue conditions
    if (playerObject === martha && currentEnemyObject === liam || playerObject === liam && currentEnemyObject === martha || playerObject === kuratas && currentEnemyObject === mkgndm || playerObject === mkgndm && currentEnemyObject === kuratas) {
      $('#battle-text').text(currentEnemyObject.dialogue[5]);
    }
    else {$('#battle-text').text(currentEnemyObject.dialogue[4]);};

  }, 2000);
}

function selectionStart(defeatedEnemy) { // return to selection screen after battle win
  $('#battle-screen').removeClass('fadein').addClass('fadeout');
  enemies = enemies.filter((enemy) => { // sets enemy array as all non-players
    return (enemy.attr('id') !== defeatedEnemy.attr('id')); // remove defeated enemy from enemies list
  });
  $('#enemy-zone').append(...enemies);
  console.log(wins);
  $('.select-text').text(playerObject.dialogue[wins]);
  setTimeout(() => {

    currentEnemy.addClass('no-display');
    $('#player-zone').append(player);
    $('#battle-screen').addClass('no-display');
    $('#enemy-select').removeClass('no-display fadein').addClass('fadein');

  }, 2000);
  battleRunning = false;
}

function gameOver() {
  $('#title-screen').removeClass('fadein').addClass('fadeout');
  $('#enemy-select').removeClass('fadein').addClass('fadeout');
  $('#battle-screen').removeClass('fadein').addClass('fadeout');
  setTimeout(() => {
    $('#title-screen').addClass('no-display');
    $('#enemy-select').addClass('no-display');
    $('#battle-screen').addClass('no-display');
    $('body').css({'padding':'100px'});
    $('#game-over').addClass('fadein').removeClass('no-display');
  }, 3000);
}

function winGame() { // win game
  setTimeout( () => {
    $('#title-screen').removeClass('fadein').addClass('fadeout');
    $('#enemy-select').removeClass('fadein').addClass('fadeout');
    $('#battle-screen').removeClass('fadein').addClass('fadeout');
    setTimeout(() => {
      $('#title-screen').addClass('no-display');
      $('#enemy-select').addClass('no-display');
      $('#battle-screen').addClass('no-display');
      $('body').css({'padding':'100px'});
      $('#game-over').text('YOU WIN!').addClass('fadein').removeClass('no-display');
    }, 3000);
  }, 5000);
}


$('document').ready(function(){

  $('#martha-hp').text(martha.hp);
  $('#liam-hp').text(liam.hp);
  $('#kuratas-hp').text(kuratas.hp);
  $('#mkgndm-hp').text(mkgndm.hp);
  
  $('#martha').on("click",function() {
    document.getElementById("martha-sound").play();
    document.getElementById("music").play();
    gameStart($('#martha'), martha);
    if (gameRunning === true && player.attr('id') !== "martha" && battleRunning === false) {
      battleStart($('#martha'), martha);
    }
  });
  $('#liam').on("click",function() {
    document.getElementById("liam-sound").play();
    document.getElementById("music").play();
    gameStart($('#liam'), liam);
    if (gameRunning === true && player.attr('id') !== "liam" && battleRunning === false) {
      battleStart($('#liam'), liam);
    }
  });
  $('#kuratas').on("click",function() {
    document.getElementById("kuratas-sound").play();
    document.getElementById("music").play();
    gameStart($('#kuratas'), kuratas);
    if (gameRunning === true && player.attr('id') !== "kuratas" && battleRunning === false) {
      battleStart($('#kuratas'), kuratas);
    }
  });
  $('#mkgndm').on("click",function() {
    document.getElementById("mkgndm-sound").play();
    document.getElementById("music").play();
    gameStart($('#mkgndm'), mkgndm);
    if (gameRunning === true && player.attr('id') !== "mkgndm" && battleRunning === false) {
      battleStart($('#mkgndm'), mkgndm);
    }
  });

  $('#atk-button').on("click", function() { // when attack button is clicked
    playerObject.attack(currentEnemyObject); // execute attacks, change hp
    currentEnemyObject.counterAttack(playerObject);
    $('#battle-text').text(`You attacked for ${playerObject.atk} damage. The enemy counter-attacked for ${currentEnemyObject.cntrAtk} damage.`)
    $('#martha-hp').text(martha.hp); // update hp displays
    $('#liam-hp').text(liam.hp);
    $('#kuratas-hp').text(kuratas.hp);
    $('#mkgndm-hp').text(mkgndm.hp);
    if (playerObject.hp <= 0) {
      playerObject.hp = 0;
      $('#martha-hp').text(martha.hp); // update hp displays
      $('#liam-hp').text(liam.hp);
      $('#kuratas-hp').text(kuratas.hp);
      $('#mkgndm-hp').text(mkgndm.hp);
      // gameover
      gameOver();
    }
    else if (currentEnemyObject.hp <= 0) {
      $('#atk-button').addClass('no-display');
      currentEnemyObject.hp = 0;
      $('#martha-hp').text(martha.hp); // update hp displays
      $('#liam-hp').text(liam.hp);
      $('#kuratas-hp').text(kuratas.hp);
      $('#mkgndm-hp').text(mkgndm.hp);
      // win
      wins ++;
      if (wins === 3) {
        // win game
        $('.win').text(''); // go back to the selection screen for one final dialogue
        selectionStart(currentEnemy);
        winGame();
      }
      selectionStart(currentEnemy);
    }
  });
});