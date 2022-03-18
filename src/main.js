import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Pokemon from './js/pokemon';
import PokemonService from './js/pokemon-service';
import Battle from './js/battle';

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

// example code for random integer within range taken from MDN Docs
// found at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //Can not reach max
}

function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


//Battle Functions
function createBattleObject(playerPokemon, opposingPokemon) {
	// Create battle object
  console.log(playerPokemon);
  console.log(opposingPokemon);
  currentBattle = new Battle(playerPokemon, opposingPokemon);
  console.log(`${capitalizeFirst(playerPokemon["name"])} entered fight with ${capitalizeFirst(opposingPokemon["name"])}!`);
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

function playerHealthBar(pokemonHp) {
  // next 3 vars below finds and stores player hp bar from html
  const playerHpBar = $("#inner-hp-bar-2");
  const bar = playerHpBar.find("#hp-player-container");
  const hit = playerHpBar.find("#player-bar-visual");
  //below pokemonTotalHp value will be replaced by pokemon hp total
  const pokemonTotalHp = pokemonHp;
  //jquery solution to setting the data attribute of the playerHpBar element
  playerHpBar.attr('data-value', pokemonTotalHp);
  playerHpBar.attr('data-total', pokemonTotalHp);
  // click function to test hp bar below event type can be changed
  $("#items").click(function () {
    const damageFromEnemy = getRandomInt(5, 20); // damage numbers change number with enemy damage
    const totalBarHp = playerHpBar.data('total');
    const value = playerHpBar.data("value");
    const hpDamage = damageFromEnemy;
    const newHpValue = value - hpDamage;
    const barWidth = (newHpValue / totalBarHp) * 100;
    const hitBarWidth = (hpDamage / value) * 100;
    hit.css('width', barWidth + "%"); //remaining bar width
    playerHpBar.data('value', newHpValue);
    bar.css('hit', hitBarWidth + "%");
  });
}

function enemyHealthBar(enemyHp) {
  // next 3 vars below finds and stores enemy hp bar from html
  const enemyHpBar = $("#inner-hp-bar-1");
  const bar = enemyHpBar.find("#hp-enemy-container");
  const hit = enemyHpBar.find("#enemy-bar-visual");
  //below enemyTotalHp value will be replaced by pokemon hp total
  const enemyTotalHp = enemyHp;
  //jquery solution to setting the data attribute of the enemyHpBar element
  enemyHpBar.attr('data-value', enemyTotalHp);
  enemyHpBar.attr('data-total', enemyTotalHp);
  // click function to test hp bar below event type can be changed
  $("#run").click(function () {
    const damageFromPlayer = getRandomInt(5, 20); // damage numbers. change number with player damage
    const totalBarHp = enemyHpBar.data('total');
    const value = enemyHpBar.data("value");
    const hpDamage = damageFromPlayer;
    const newHpValue = value - hpDamage;
    const barWidth = (newHpValue / totalBarHp) * 100;
    const hitBarWidth = (hpDamage / value) * 100;
    hit.css('width', barWidth + "%"); //remaining bar width
    enemyHpBar.data('value', newHpValue);
    bar.css('hit', hitBarWidth + "%");
  });
}

//when fight is clicked will transition to moves menu
function fightToMoves() {
  $("#fight").click(function () {
    $("#battle-option-box").css("visibility", "hidden");
    $("#move-options").css("visibility", "visible");
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

$(document).ready(function () {
  makePokemonCall(getRandomNumber(1, pokemonList.length)).then((pokemonName) => {
    playerPokemon = pokemonCreate(pokemonName, 1);
  });
  makePokemonCall(getRandomNumber(1, pokemonList.length)).then((pokemonName) => {
    opposingPokemon = pokemonCreate(pokemonName, 1);
  });

  // fightToMoves();
  playerHealthBar(100);
  enemyHealthBar(120);
  $("#fight").on("click", function () { createBattleObject(playerPokemon, opposingPokemon); });
  $("#run").on("click", function () { console.log("run!"); });
  $("#pokemon").on("click", function () { console.log("party!"); });
  $("#items").on("click", function () { console.log("items!"); });
});