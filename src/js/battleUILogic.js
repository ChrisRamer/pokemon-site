import Battle from "./Battle";
import FrontEnd from './frontEndFunctions';

export default class BattleUILogic {
	constructor(playerPokemon, opposingPokemon) {
		// Set constant vars
		this.playerPokemon = playerPokemon;
		this.opposingPokemon = opposingPokemon;
		this.battle = new Battle(playerPokemon, opposingPokemon);
		this.frontEnd = new FrontEnd();

		this.startBattle();
	}

	// Sets up start battle UI
	startBattle() {
		this.frontEnd.hideBattleOptions();
		this.frontEnd.initializeBoard(this.playerPokemon, this.opposingPokemon);
		this.frontEnd.updateTurnSummary(`${this.playerPokemon.name} encountered a wild ${this.opposingPokemon.name}!`);
		this.frontEnd.playerSetHealthBar(this.playerPokemon.maxStats.hp);
		this.frontEnd.enemySetHealthBar(this.opposingPokemon.maxStats.hp);
	}

	// Handles a move selection during player's turn
	handlePlayerMoveSelection(move) {
		return this.battle.handleMove(this.playerPokemon, this.opposingPokemon, move);
	}
}