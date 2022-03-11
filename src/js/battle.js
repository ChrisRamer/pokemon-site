import $ from 'jquery';

export default class Battle {
	constructor(playerPokemon, opposingPokemon) {
		this.playerPokemon = playerPokemon;
		this.opposingPokemon = opposingPokemon;
		this.startBattle();
	}

	startBattle() {
		// TODO: Hide other menus
		$("battleMenu").show();
		this.setupPokemon();
		this.playerTurn();
	}

	setupPokemon() {
		this.playerPokemon.currentStats = this.playerPokemon.maxStats;
		this.opposingPokemon.currentStats = this.opposingPokemon.maxStats;
	}

	playerTurn() {
		$("playerOptions").show();

		// TODO: Handle button events for moves; these would call handleMove()

		this.changeTurns(true);
	}

	aiTurn() {
		$("playerOptions").hide();

		this.changeTurns(false);
	}

	changeTurns(isPlayerTurn) {
		if (isPlayerTurn) {
			// If player's current pokemon isn't dead
			if (!this.isPokemonDead(this.playerPokemon)) {
				this.playerTurn();
			}

			// TODO: If player's current pokemon is dead and has pokemon left in party, switch pokemon

			// If player's current pokemon is dead and has no pokemon left in party
			else {
				this.finishBattle(false);
			}
		} else {
			// If AI's current pokemon isn't dead
			if (!this.isPokemonDead(this.opposingPokemon)) {
				this.aiTurn();
			}

			// TODO: If AI's current pokemon is dead and has pokemon left in party, switch pokemon

			// If AI's current pokemon is dead and has no pokemon left in party
			else {
				this.finishBattle(true);
			}
		}
	}

	handleMove(attacker, victim, move) {
		const damage = this.calculateDamage(attacker, victim, move);
		victim.currentStats.hp -= damage;

		// TODO: Update victim's HP bar

		// If victim HP is 0, faint
		if (this.isPokemonDead(victim)) {
			this.handleFaint(victim);
		}
	}

	calculateDamage(attacker, victim, move) {
		const power = move.power;
		const attack = attacker.currentStats.attack;
		const defense = victim.currentStats.defense;
		return (((((2 * attacker.level) / 5) + 2) * power * (attack / defense)) / 50) + 2;
	}

	isPokemonDead(pokemon) {
		return pokemon.currentStats.hp <= 0;
	}

	handleFaint(victim) {
		// TODO: this
	}

	finishBattle(playerWon) {
		// TODO: this
	}
}