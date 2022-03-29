import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Pokemon from './js/pokemon';
import PokemonService from './js/pokemon-service';
import GameSounds from './js/audio.js';
import BattleUILogic from "./js/battleUILogic";
import FrontEnd from './js/frontEndFunctions';

//API Calls
async function makePokedexCall(region) {
  const response = await PokemonService.getPokedex(region);
  return response;
}
async function makePokemonCall(name) {
  const response = await PokemonService.getPokemon(name);
  return response;
}
async function getMoveData(name) {
  const response = await PokemonService.getMove(name);
  return response;
}

//Random Functions
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * ((max - min) + 1) + min);
}

function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function waitMilliseconds(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("resolved");
    }, time);
  });
}


//Battle Functions
function createBattleObject(playerPokemon, opposingPokemon, sounds) {
  // Create battle object
  currentBattle = new BattleUILogic(playerPokemon, opposingPokemon, sounds);
}


//Pokemon Functions
function pokemonCreate(pokeObject, startingLevel) {
  let pokemonMade = new Pokemon(pokeObject, startingLevel);
  for (let i = 0; i <= 3; i++) { //move to pokemonChangeMove
    pokemonChangeMove(pokemonMade, i);
  }
  pokemonMade.name = capitalizeFirst(pokemonMade.name);
  return pokemonMade;
}

function pokemonChangeMove(pokemonToChange, slot) {
  let randNum = getRandomNumber(0, pokemonToChange.movesPossible.length - 1);
  let moveName = pokemonToChange.movesPossible[randNum];
  pokemonToChange.movesPossible.splice(randNum, 1);
  getMoveData(moveName).then((bigMove) => {
    pokemonToChange.changeMove(bigMove, slot).then((result) => {
      if (result === "fail" && (slot === 0 || slot === 1 || slot === 2 || slot === 3)) {
        pokemonChangeMove(pokemonToChange, slot);
      }
    });
  });
}

//Declare Variables
let currentBattle;
let pokemonList = [];
let playerPokemon = {};
let opposingPokemon = {};
let frontEnd = {};
let sounds = {};

//Initialize variables
makePokedexCall(1).then((response) => {
  response["pokemon_entries"].forEach((pokemon) => {
    const str = pokemon["pokemon_species"].url.slice(-7);
    const array = str.split("/");
    const entryNumber = parseInt(array[1]);
    pokemonList.push(entryNumber);
  });
});


//Document Loaded
$(document).ready(function () {
  frontEnd = new FrontEnd();
  sounds = new GameSounds();
  sounds.setVolume();
  sounds.startSongIntro();
  $("#start-button").on("click", function () {
    frontEnd.startHide();
    frontEnd.loadShow();
    waitMilliseconds(1000).then(() => {
      makePokemonCall(getRandomNumber(1, pokemonList.length)).then((pokemonName) => {
        playerPokemon = pokemonCreate(pokemonName, getRandomNumber(7, 13));
      });
    });
    waitMilliseconds(1000).then(() => {
      makePokemonCall(getRandomNumber(1, pokemonList.length)).then((pokemonName) => {
        opposingPokemon = pokemonCreate(pokemonName, getRandomNumber(7, 13));
      });
    });
    waitMilliseconds(5000).then(() => {
      createBattleObject(playerPokemon, opposingPokemon, sounds);
      frontEnd.loadHide();
      frontEnd.battleShow();
      sounds.stopMainSongs();
      sounds.battleSongIntro();
    });
  });

  $("#volume").on("click", function () {
    frontEnd.volumeControllerShow();
    frontEnd.resetEnemyHpBar();
    frontEnd.resetPlayerHpBar();
  });

  $("#volume-mute").on("click", function () {
    sounds.mute();
    frontEnd.volumeControllerHide();
  });

  $("#volume-low").on("click", function () {
    sounds.setVolume();
    frontEnd.volumeControllerHide();
  });

  $("#volume-medium").on("click", function () {
    sounds.setVolumeMedium();
    frontEnd.volumeControllerHide();
  });

  $("#volume-high").on("click", function () {
    sounds.setVolumeHigh();
    frontEnd.volumeControllerHide();
  });

  $("#fight").on("click", function () {
    frontEnd.hideBattleOptions();
    frontEnd.showMoveOptions();
  });

  $("#run").on("click", function () {
    frontEnd.battleHide();
    frontEnd.startShow();
    sounds.stopMainSongs();
    sounds.startSongIntro();
  });

  // Handle move selection
  $("#move-1").on("click", function () {
    currentBattle.handlePlayerMoveSelection(playerPokemon.moves[0]);
  });
  $("#move-2").on("click", function () {
    currentBattle.handlePlayerMoveSelection(playerPokemon.moves[1]);
  });
  $("#move-3").on("click", function () {
    currentBattle.handlePlayerMoveSelection(playerPokemon.moves[2]);
  });
  $("#move-4").on("click", function () {
    currentBattle.handlePlayerMoveSelection(playerPokemon.moves[3]);
  });
});
