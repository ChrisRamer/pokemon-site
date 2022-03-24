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
		const damageFromEnemy = damagePlayer // damage numbers
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
		const damageFromPlayer = damageEnemy
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

	initializeBoard(playerPokemon, enemyPokemon) {
		const enemySprite = (enemyPokemon.spriteFront === null) ? enemyPokemon.spriteFront : enemyPokemon.spriteBack;
		const playerSprite = (playerPokemon.spriteBack === null) ? playerPokemon.spriteBack : playerPokemon.spriteFront;
		$("#sprite-1").children("img").eq(0).attr("src", enemySprite);
		$("#sprite-2").children("img").eq(0).attr("src", playerSprite);
		$("#enemy-name-change").text(enemyPokemon.name);
		$("#player-name-change").text(playerPokemon.name);
		$("#api-move-1").text(playerPokemon.moves[0].name);
		$("#api-move-2").text(playerPokemon.moves[1].name);
		$("#api-move-3").text(playerPokemon.moves[2].name);
		$("#api-move-4").text(playerPokemon.moves[3].name);
	}

	updateTurnSummary(newMessage) {
		$("#battle-text-control").text(newMessage);
	}

	showBattleOptions() {
		$("#battle-option-box").css("visibility", "visible");
		$("#move-options").css("visibility", "visible");
	}

	hideBattleOptions() {
		$("#battle-option-box").css("visibility", "hidden");
		$("#move-options").css("visibility", "hidden");
	}
}