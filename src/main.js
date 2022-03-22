import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Pokemon from './js/pokemon';
import PokemonService from './js/pokemon-service';
import Battle from './js/battle';
import GameSounds from './js/audio.js';

//API Calls
async function makePokedexCall(region) {
  const response = await PokemonService.getPokedex(region);
  return response;
}
async function makePokemonCall(name) {
  const response = await PokemonService.getPokemon(name);
  return response;
}
// async function randomPokemonCall(region) {
//   const response = await PokemonService.randomPokemon(region);
//   return response;
// }
async function getMoveData(name) {
  const response = await PokemonService.getMove(name);
  return response;
}
// async function getTypeData(type) {
//   const response = await PokemonService.getType(type);
//   return response;
// }

//Random Functions
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * ((max - min) + 1) + min); //Can reach max
}

function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//Battle Functions
function createBattleObject(playerPokemon, opposingPokemon) {
  // Create battle object
  console.log(playerPokemon);
  console.log(opposingPokemon);
  console.log(`${capitalizeFirst(playerPokemon["name"])} entered fight with ${capitalizeFirst(opposingPokemon["name"])}!`);
  currentBattle = new Battle(playerPokemon, opposingPokemon);
}

//Pokemon Functions
function pokemonCreate(pokeObject, startingLevel) {
  let pokemonMade = new Pokemon(pokeObject, startingLevel);
  pokemonChangeMove(pokemonMade, 0);
  pokemonChangeMove(pokemonMade, 1);
  pokemonChangeMove(pokemonMade, 2);
  pokemonChangeMove(pokemonMade, 3);
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

// //Front-End interactions

function playerSetHealthBar(playerHp) {
  const playerHpBar = $("#inner-hp-bar-2");
  //below pokemonTotalHp value will be replaced by pokemon hp total
  const pokemonTotalHp = playerHp;
  //jquery solution to setting the data attribute of the playerHpBar element
  playerHpBar.attr('data-value', pokemonTotalHp);
  playerHpBar.attr('data-total', pokemonTotalHp);
}

function damageToPlayerHealthBar(damagePlayer) {
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
  console.log(newHpValue);
}

function enemySetHealthBar(enemyHp) {
  const enemyHpBar = $("#inner-hp-bar-1");
  //below pokemonTotalHp value 
  const enemyTotalHp = enemyHp;
  enemyHpBar.attr('data-value', enemyTotalHp);
  enemyHpBar.attr('data-total', enemyTotalHp);
}

function damageToEnemyHealthBar(damageEnemy) {
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
  console.log(newHpValue);
}

// audio area
// let gameAudio = sounds;

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
  const sounds = new GameSounds();
  makePokemonCall(getRandomNumber(1, pokemonList.length)).then((pokemonName) => {
    playerPokemon = pokemonCreate(pokemonName, 1);
  });
  makePokemonCall(getRandomNumber(1, pokemonList.length)).then((pokemonName) => {
    opposingPokemon = pokemonCreate(pokemonName, 1);
  });

  //for testing new hp bar functions below
  let playerPokeHealth = 120
  let enemyPokeHealth = 100
  let playerPokeDamage = 10
  let enemyPokeDamage = 20
  $("#items").click(function () {
    sounds.battleRandomSound();
    playerSetHealthBar(playerPokeHealth);
    enemySetHealthBar(enemyPokeHealth);
  });
  $("#run").click(function () {
    // sounds.sound1.play();
    damageToPlayerHealthBar(enemyPokeDamage);
    damageToEnemyHealthBar(playerPokeDamage);
    sounds.playBlip();
  });
  //end of test/ change and remove above

  // fightToMoves();
  $("#header-image").on("click", function () { createBattleObject(playerPokemon, opposingPokemon); });
  $("#fight").on("click", function () { console.log("fight!"); });
  $("#run").on("click", function () { console.log("run!"); });
  $("#pokemon").on("click", function () { console.log("party!"); });
  $("#items").on("click", function () { console.log("items!"); });
});