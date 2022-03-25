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
		this.frontEnd.updateTurnSummary(`What are you going to do? Are you gonna stare at this ${this.opposingPokemon.name} forever?`);
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
		// End switching turns if battle finished
		if (this.battleFinished) {
			return;
		}

		const trash = await this.waitForMilliseconds(3000);

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
		this.frontEnd.hideBattleOptions();

		this.turnResult = {
			summary: 'This is a turn summary! Woah!',
			damage: this.calculateDamage(attacker, victim, move),
			didFaint: false
		};

		this.turnResult.summary = `${attacker.name} used ${move.name}! It did ${this.turnResult.damage} damage! Wowie!`;
		victim.currentStats.hp -= this.turnResult.damage;
		this.turnResult.didFaint = this.isPokemonDead(victim);

		console.log(this.turnResult.summary);
		this.frontEnd.updateTurnSummary(this.turnResult.summary);

		if (this.isPlayerTurn) {
			this.frontEnd.damageToEnemyHealthBar(this.turnResult.damage);
		} else {
			this.frontEnd.damageToPlayerHealthBar(this.turnResult.damage);
		}

		// If victim HP is 0, faint
		if (this.turnResult.didFaint) {
			this.handleFaint(victim);
		}

		return this.turnResult;
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

	async handleFaint(victim) {
		this.battleFinished = true;
		let result = this.isPokemonDead(this.playerPokemon) ? false : true;

		const trash = await this.waitForMilliseconds(3000);

		this.frontEnd.updateTurnSummary(`${victim.name} fainted!`);

		this.finishBattle(result);
	}

	async finishBattle(playerWon) {
		console.log("Battle ended");

		const trash = await this.waitForMilliseconds(3000);

		if (playerWon) {
			this.frontEnd.updateTurnSummary(`You won ¥${this.getRandomWinnings()}! Holy shit!!!!!!!!!`);
		} else  {
			this.frontEnd.updateTurnSummary(`You lost ¥${this.getRandomWinnings()}! You f*cking loser`);
		}
	}

	getRandomWinnings() {
		return Math.floor(Math.random() * (999999) + 1);
	}

	waitForMilliseconds(time) {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve("resolved");
			}, time);
		});
	}
}