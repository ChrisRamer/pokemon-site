import $ from 'jquery';
import FrontEndFunctions from './frontEndFunctions';

export default class Battle {
	constructor(playerPokemon, opposingPokemon) {
		this.playerPokemon = playerPokemon;
		this.opposingPokemon = opposingPokemon;
		this.frontEnd = new FrontEndFunctions();
		this.startBattle();
	}

	startBattle() {
		this.frontEnd.showBattleOptions();
		this.setupPokemon();
		this.playerTurn();
	}

	setupPokemon() {
		this.playerPokemon["currentStats"] = JSON.parse(JSON.stringify(this.playerPokemon["maxStats"]));
		this.opposingPokemon["currentStats"] = JSON.parse(JSON.stringify(this.opposingPokemon["maxStats"]));
	}

	playerTurn() {
		this.isPlayerTurn = true;
		this.frontEnd.showBattleOptions();

		// TODO: Handle button events for moves; these would call handleMove()

		const randMove = this.playerPokemon.moves[Math.floor(Math.random() * (this.playerPokemon.moves.length - 1))];
		this.handleMove(this.playerPokemon, this.opposingPokemon, randMove);

		setTimeout(this.changeTurns, 5000, true);
	}

	aiTurn() {
		this.isPlayerTurn = false;
		this.frontEnd.hideBattleOptions();

		// Select random possible move, call handleMove()

		setTimeout(this.changeTurns, 5000, false);
	}

	changeTurns(isPlayerTurn) {
		if (isPlayerTurn) {
			// If player's current pokemon isn't dead
			if (!this.isPokemonDead, this.playerPokemon) {
				this.playerTurn();
			}

			// TODO: If player's current pokemon is dead and has pokemon left in party, switch pokemon

			// If player's current pokemon is dead and has no pokemon left in party
			else {
				this.finishBattle, false;
			}
		} else {
			// If AI's current pokemon isn't dead
			if (!this.isPokemonDead, this.opposingPokemon) {
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
		const message = `${attacker.name} used ${move.name}! It did ${damage} damage! Wowie!`;
		victim.currentStats.hp -= damage;

		console.log(message);
		this.frontEnd.updateTurnSummary(message);

		if (this.isPlayerTurn) {
			this.frontEnd.damageToEnemyHealthBar(damage);
		} else {
			this.frontEnd.damageToPlayerHealthBar(damage);
		}

		// If victim HP is 0, faint
		if (this.isPokemonDead, victim) {
			this.handleFaint, victim;
		}
	}

	calculateDamage(attacker, victim, move) {
		const power = move.power == null ? 0 : move.power;
		if (power <= 0) return 0;
		const attack = attacker.currentStats.attack;
		const defense = victim.currentStats.defense;
		return Math.floor((((((2 * attacker.level) / 5) + 2) * power * (attack / defense)) / 50) + 2);
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