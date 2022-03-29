import Battle from "./Battle";
import FrontEnd from './frontEndFunctions';

export default class BattleUILogic {
	constructor(playerPokemon, opposingPokemon, sounds) {
		this.battle = new Battle(playerPokemon, opposingPokemon);
		this.frontEnd = new FrontEnd();
		this.turnDelay = 3000;
		this.audio = sounds;

		this.startBattle();
	}

	// Sets up start battle UI
	startBattle() {
		this.frontEnd.hideBattleOptions();
		this.frontEnd.initializeBoard(this.battle.playerPokemon, this.battle.opposingPokemon);
		this.frontEnd.updateTurnSummary(`${this.battle.playerPokemon.name} encountered a wild ${this.battle.opposingPokemon.name}!`);
		this.frontEnd.playerSetHealthBar(this.battle.playerPokemon.maxStats.hp);
		this.frontEnd.enemySetHealthBar(this.battle.opposingPokemon.maxStats.hp);
		this.frontEnd.resetEnemyHpBar();
		this.frontEnd.resetPlayerHpBar();
		this.frontEnd.showBattleOptions();
		this.frontEnd.hideMoveOptions();
		this.frontEnd.fadeInPokemon();
	}

	// Switch to player's turn
	async startPlayerTurn() {
		if (!this.battle.battleFinished) {
			await this.waitForMilliseconds(this.turnDelay);
			this.frontEnd.showBattleOptions();
			this.frontEnd.updateTurnSummary(`What are you going to do? Are you gonna stare at this ${this.battle.opposingPokemon.name} forever?`);
		}
	}

	// Switch to AI's turn
	async startAITurn() {
		if (!this.battle.battleFinished) {
			await this.waitForMilliseconds(this.turnDelay);
			const turnResult = this.battle.handleAiTurn();
			this.frontEnd.damageToPlayerHealthBar(turnResult.damage);
			this.frontEnd.updateTurnSummary(turnResult.summary);
			this.audio.battleRandomSound();

			if (turnResult.didFaint) {
				return this.handleFaint(this.battle.playerPokemon);
			}

			this.startPlayerTurn();
		}
	}

	// Handles a move selection during player's turn, then starts AI's turn
	handlePlayerMoveSelection(move) {
		this.frontEnd.hideMoveOptions();
		const turnResult = this.battle.handleMove(this.battle.playerPokemon, this.battle.opposingPokemon, move);
		this.frontEnd.damageToEnemyHealthBar(turnResult.damage);
		this.frontEnd.updateTurnSummary(turnResult.summary);
		this.audio.battleRandomSound();

		if (turnResult.didFaint) {
			return this.handleFaint(this.battle.opposingPokemon);
		}

		this.startAITurn();
	}

	// Handles when pokemon faints & ends battle
	async handleFaint(victim) {
		this.frontEnd.fadeFaintedPokemon(victim.owner == "player");
		await this.waitForMilliseconds(this.turnDelay);
		this.frontEnd.updateTurnSummary(this.battle.handleFaint(victim));

		await this.waitForMilliseconds(this.turnDelay);
		this.frontEnd.updateTurnSummary(this.battle.finishBattle(victim));

		await this.waitForMilliseconds(this.turnDelay);
		this.frontEnd.battleHide();
		this.frontEnd.startShow();
		this.audio.stopMainSongs();
		this.audio.startSongIntro();
	}

	// Waits for time specified
	waitForMilliseconds(time) {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve("resolved");
			}, time);
		});
	}
}