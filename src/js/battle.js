export default class Battle {
	constructor(playerPokemon, opposingPokemon) {
		this.playerPokemon = playerPokemon;
		this.opposingPokemon = opposingPokemon;
		this.battleFinished = false;
		this.startBattle();
	}

	async startBattle() {
		this.playerPokemon["currentStats"] = JSON.parse(JSON.stringify(this.playerPokemon["maxStats"]));
		this.opposingPokemon["currentStats"] = JSON.parse(JSON.stringify(this.opposingPokemon["maxStats"]));
		this.playerPokemon.owner = "player";
		this.opposingPokemon.owner = "opponent";
	}

	handleAiTurn() {
		const randMove = this.opposingPokemon.moves[Math.floor(Math.random() * this.opposingPokemon.moves.length)];
		return this.handleMove(this.opposingPokemon, this.playerPokemon, randMove);
	}

	handleMove(attacker, victim, move) {
		let turnResult = {
			summary: 'This is a turn summary! Woah!',
			damage: this.calculateDamage(attacker, victim, move),
			didFaint: false
		};

		turnResult.summary = `${attacker.name} used ${move.name}! It did ${turnResult.damage} damage! Wowie!`;
		victim.currentStats.hp -= turnResult.damage;
		turnResult.didFaint = (victim.currentStats.hp <= 0);

		// If victim HP is 0, faint
		if (turnResult.didFaint) {
			this.handleFaint(victim);
		}

		return turnResult;
	}

	calculateDamage(attacker, victim, move) {
		const power = move.power == null ? 0 : move.power;
		if (power <= 0) return 0;
		const attack = attacker.currentStats.attack;
		const defense = victim.currentStats.defense;
		return Math.floor((((((2 * attacker.level) / 5) + 2) * power * (attack / defense)) / 50) + 2 + (Math.random() * 2));
	}

	handleFaint(victim) {
		this.battleFinished = true;
		return `${victim.name} fainted!`;
	}

	finishBattle(victim) {
		const randomWinnings = Math.floor(Math.random() * (999999) + 1);

		// If player fainted
		if (victim.owner === "opponent") {
			return `You won ¥${randomWinnings}! Holy shit!!!!!!!!!`;
		}
		// If AI fainted
		else {
			return `You lost ¥${randomWinnings}! You f*cking loser`;
		}
	}
}