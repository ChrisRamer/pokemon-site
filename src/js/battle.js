import FrontEndFunctions from './frontEndFunctions';

export default class Battle {
	constructor(playerPokemon, opposingPokemon) {
		this.playerPokemon = playerPokemon;
		this.opposingPokemon = opposingPokemon;
		this.frontEnd = new FrontEndFunctions();
		this.startBattle();
	}

	async startBattle() {
		this.setupPokemon();
		this.changeTurns(true);
	}

	setupPokemon() {
		this.playerPokemon["currentStats"] = JSON.parse(JSON.stringify(this.playerPokemon["maxStats"]));
		this.opposingPokemon["currentStats"] = JSON.parse(JSON.stringify(this.opposingPokemon["maxStats"]));
	}

	playerTurn() {
		this.isPlayerTurn = true;
		this.frontEnd.showBattleOptions();
	}

	selectPlayerMove(move) {
		const moveResult = this.handleMove(this.playerPokemon, this.opposingPokemon, move);
		this.changeTurns();
		return moveResult;
	}

	aiTurn() {
		this.isPlayerTurn = false;
		this.frontEnd.hideBattleOptions();

		const randMove = this.opposingPokemon.moves[Math.floor(Math.random() * (this.opposingPokemon.moves.length - 1))];
		this.handleMove(this.opposingPokemon, this.playerPokemon, randMove);

		this.changeTurns();
	}

	async changeTurns() {
		if (this.isPokemonDead(this.playerPokemon) || this.isPokemonDead(this.opposingPokemon)) {
			this.finishBattle();
			return;
		}

		const trash = await this.waitForMilliseconds(2500);

		if (!this.isPlayerTurn) {
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
		// TODO: Return some sorta turn result (eg. if it resulted in faint, damage done, etc.) to do the below UI stuff in hybrid class

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
		return (pokemon.currentStats.hp <= 0);
	}

	handleFaint(victim) {
		// TODO: this
	}

	finishBattle(playerWon) {
		// TODO: this
		console.log("Battle ended");
	}

	waitForMilliseconds(time) {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve("resolved");
			}, time);
		});
	}
}