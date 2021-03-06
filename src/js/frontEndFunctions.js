import $ from 'jquery';

export default class FrontEndFunctions {
  playerSetHealthBar(playerHp) {
    const playerHpBar = $("#inner-hp-bar-2");
    //below pokemonTotalHp value will be replaced by pokemon hp total
    const pokemonTotalHp = playerHp;
    //jquery solution to setting the data attribute of the playerHpBar element
    playerHpBar.attr('data-value', pokemonTotalHp);
    playerHpBar.attr('data-total', pokemonTotalHp);
  }

  damageToPlayerHealthBar(damagePlayer) {
    const playerHpBar = $("#inner-hp-bar-2");
    const bar = playerHpBar.find("#hp-player-container");
    const hit = playerHpBar.find("#player-bar-visual");
    const damageFromEnemy = damagePlayer; // damage numbers
    const totalBarHp = playerHpBar.data('total');
    const value = playerHpBar.data("value");
    const hpDamage = damageFromEnemy;
    const newHpValue = value - hpDamage;
    const barWidth = (newHpValue / totalBarHp) * 100;
    const hitBarWidth = (hpDamage / value) * 100;
    hit.css('width', barWidth + "%"); //remaining bar width
    playerHpBar.data('value', newHpValue);
    bar.css('hit', hitBarWidth + "%");
  }

  enemySetHealthBar(enemyHp) {
    const enemyHpBar = $("#inner-hp-bar-1");
    //below pokemonTotalHp value
    const enemyTotalHp = enemyHp;
    enemyHpBar.attr('data-value', enemyTotalHp);
    enemyHpBar.attr('data-total', enemyTotalHp);
  }

  damageToEnemyHealthBar(damageEnemy) {
    const enemyHpBar = $("#inner-hp-bar-1");
    const bar = enemyHpBar.find("#hp-enemy-container");
    const hit = enemyHpBar.find("#enemy-bar-visual");
    const damageFromPlayer = damageEnemy;
    const totalBarHp = enemyHpBar.data('total');
    const value = enemyHpBar.data("value");
    const hpDamage = damageFromPlayer;
    const newHpValue = value - hpDamage;
    const barWidth = (newHpValue / totalBarHp) * 100;
    const hitBarWidth = (hpDamage / value) * 100;
    hit.css('width', barWidth + "%"); //remaining bar width
    enemyHpBar.data('value', newHpValue);
    bar.css('hit', hitBarWidth + "%");
  }

  resetPlayerHpBar() {
    const playerHpBar = $("#inner-hp-bar-2");
    const bar = playerHpBar.find("#hp-player-container");
    const hit = playerHpBar.find("#player-bar-visual");
    playerHpBar.data('value', playerHpBar.data('total'));
    hit.css({ 'width': '100%' });
    bar.css('width', '100%');
  }

  resetEnemyHpBar() {
    const enemyHpBar = $("#inner-hp-bar-1");
    const bar = enemyHpBar.find("#hp-enemy-container");
    const hit = enemyHpBar.find("#enemy-bar-visual");
    enemyHpBar.data('value', enemyHpBar.data('total'));
    hit.css({ 'width': '100%' });
    bar.css('width', '100%');
  }

  initializeBoard(playerPokemon, enemyPokemon) {
    const enemySprite = (enemyPokemon.spriteFront === null) ? enemyPokemon.spriteBack : enemyPokemon.spriteFront;
    const playerSprite = (playerPokemon.spriteBack === null) ? playerPokemon.spriteFront : playerPokemon.spriteBack;
    $("#sprite-1").children("img").eq(0).attr("src", enemySprite);
    $("#sprite-2").children("img").eq(0).attr("src", playerSprite);
    $("#enemy-name-change").text(enemyPokemon.name);
    $("#player-name-change").text(playerPokemon.name);
    $("#api-move-1").text(playerPokemon.moves[0].name);
    $("#api-move-1").attr("title", playerPokemon.moves[0].flavorText);
    $("#api-move-2").text(playerPokemon.moves[1].name);
    $("#api-move-2").attr("title", playerPokemon.moves[1].flavorText);
    $("#api-move-3").text(playerPokemon.moves[2].name);
    $("#api-move-3").attr("title", playerPokemon.moves[2].flavorText);
    $("#api-move-4").text(playerPokemon.moves[3].name);
    $("#api-move-4").attr("title", playerPokemon.moves[3].flavorText);
  }

  updateTurnSummary(newMessage) {
    $("#battle-text-control").text(newMessage);
  }

	showMoveOptions() {
		$("#move-options").css("visibility", "visible");
	}

	hideMoveOptions() {
		$("#move-options").css("visibility", "hidden");
	}

  showBattleOptions() {
    $("#battle-option-box").css("visibility", "visible");
  }

  hideBattleOptions() {
    $("#battle-option-box").css("visibility", "hidden");
  }

  volumeControllerShow() {
    $("#volume").css('visibility', 'hidden');
    $("#volume-mute").css('visibility', 'visible');
    $("#volume-low").css('visibility', 'visible');
    $("#volume-medium").css('visibility', 'visible');
    $("#volume-high").css('visibility', 'visible');
  }

  volumeControllerHide() {
    $("#volume").css('visibility', 'visible');
    $("#volume-mute").css('visibility', 'hidden');
    $("#volume-low").css('visibility', 'hidden');
    $("#volume-medium").css('visibility', 'hidden');
    $("#volume-high").css('visibility', 'hidden');
  }

  startShow() {
    $('#main-start').show();
  }

  startHide() {
    $('#main-start').hide();
  }

  battleShow() {
    $('#main-battle').show();
  }

  battleHide() {
    $('#main-battle').hide();
  }

  loadHide() {
    $('#main-load').hide();
  }

  loadShow() {
    $('#main-load').show();
  }

	fadeFaintedPokemon(player) {
		if (player) {
			$("#sprite-2").children("img").eq(0).fadeOut(3000);
		} else {
			$("#sprite-1").children("img").eq(0).fadeOut(3000);
		}
	}

	fadeInPokemon() {
		$("#sprite-1").children("img").eq(0).fadeIn();
		$("#sprite-2").children("img").eq(0).fadeIn();
	}

}