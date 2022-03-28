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
function createBattleObject(playerPokemon, opposingPokemon) {
  // Create battle object
  currentBattle = new BattleUILogic(playerPokemon, opposingPokemon);
}


//Pokemon Functions
function pokemonCreate(pokeObject, startingLevel) {
  const timeDelay = 1000;
  let pokemonMade = new Pokemon(pokeObject, startingLevel);
  for (let i = 0; i <= 3; i++) { //move to pokemonChangeMove
    pokemonChangeMove(pokemonMade, i);
    setTimeout(() => {
      if (pokemonMade.moves[i] === null) {
        pokemonChangeMove(pokemonMade, i);
      }
    }, timeDelay);
  }
  pokemonMade.name = capitalizeFirst(pokemonMade.name);
  return pokemonMade;
}
function pokemonChangeMove(pokemonToChange, slot) {
  let randNum = getRandomNumber(0, pokemonToChange.movesPossible.length - 1);
  let moveName = pokemonToChange.movesPossible[randNum];
  pokemonToChange.movesPossible.splice(randNum, 1);
  getMoveData(moveName).then((bigMove) => {
    pokemonToChange.changeMove(bigMove, slot);
  });
}

//Declare Variables
let currentBattle;
let pokemonList = [];
let playerPokemon = {};
let opposingPokemon = {};


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
  const frontEnd = new FrontEnd();
  const sounds = new GameSounds();
  sounds.setVolume();
  waitMilliseconds(1000).then(() => {
    makePokemonCall(getRandomNumber(1, pokemonList.length)).then((pokemonName) => {
      playerPokemon = pokemonCreate(pokemonName, 1);
    });
  });
  waitMilliseconds(1000).then(() => {
    makePokemonCall(getRandomNumber(1, pokemonList.length)).then((pokemonName) => {
      opposingPokemon = pokemonCreate(pokemonName, 1);
    });
  });

  $("#start-button").click(function () {
    frontEnd.startHide();
    frontEnd.battleShow();
  });

<<<<<<< HEAD
  $("#run").click(function () {
    sounds.battleLoop.play();
  });

=======
>>>>>>> master
  $("#volume").click(function () {
    frontEnd.volumeControllerShow();
    frontEnd.resetEnemyHpBar();
    frontEnd.resetPlayerHpBar();
  });

  $("#items").click(function () {
    frontEnd.battleHide();
    frontEnd.loadShow();
  });

  $("#loading-text").click(function () {
    frontEnd.loadHide();
    frontEnd.battleShow();
  });

  $("#volume-mute").click(function () {
    sounds.mute();
    frontEnd.volumeControllerHide();
  });

  $("#volume-low").click(function () {
    sounds.setVolume();
    frontEnd.volumeControllerHide();
  });

  $("#volume-medium").click(function () {
    sounds.setVolumeMedium();
    frontEnd.volumeControllerHide();
  });

  $("#volume-high").click(function () {
    sounds.setVolumeHigh();
    frontEnd.volumeControllerHide();
  });

  //end of test/ change and or remove above
  // fightToMoves();
  $("#header-image").on("click", function () { createBattleObject(playerPokemon, opposingPokemon); });
  $("#fight").on("click", function () { console.log("fight!"); });
  $("#run").on("click", function () { console.log("run!"); });
  $("#pokemon").on("click", function () { console.log("party!"); });
  $("#items").on("click", function () { console.log("items!"); });

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