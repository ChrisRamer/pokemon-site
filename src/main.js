import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Pokemon from './js/pokemon';
import PokemonService from './js/pokemon-service';

async function makePokedexCall(region) {
  const response = await PokemonService.getPokedex(region);
  return response;
}

// async function makePokemonCall(name) {
// 	const response = await PokemonService.getPokemon(name);
// 	return response;
// }

async function newPokemonCreate(name) {
  const response = await PokemonService.getPokemon(name);
  let pokemon = new Pokemon(response, 1);
  return pokemon;
}

// async function randomPokemonCall(region) {
//   const response = await PokemonService.randomPokemon(region);
//   return response;
// }

// async function getMoveData(name) {
//   const response = await PokemonService.getMove(name);
//   return response;
// }

// async function getTypeData(type) {
//   const response = await PokemonService.getType(type);
//   return response;
// }

function getRandomNumber(min, max) {
  return Math.ceil(Math.random() * ((max - min) + 1) + min);
}

function createBattleObject() {
  // Gets random pokemon object
  let randNum = getRandomNumber(0, pokemonList.length - 1);
  let randPokemon = pokemonList[randNum];
  newPokemonCreate(randPokemon).then((playerPokemon) => {
    randNum = getRandomNumber(0, pokemonList.length - 1);
    randPokemon = pokemonList[randNum];
    newPokemonCreate(randPokemon).then((opposingPokemon) => {
      console.log(`${capitalizeFirst(playerPokemon["name"])} entered fight with ${capitalizeFirst(opposingPokemon["name"])}!`);
    });
  });
}

function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//example code for random integer within range taken from MDN Docs
//found at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function playerHealthBar() {
  const playerHpBar = $("#inner-hp-bar-2");
  const bar = playerHpBar.find("#hp-player-container");
  const hit = playerHpBar.find("#player-bar-visual");
  $("#items").click(function () {
    // const damageFromEnemy = Math.floor(Math.random() * 6) + 1;
    const damageFromEnemy = getRandomInt(1, 6);
    console.log("random math log", damageFromEnemy);
    const totalBarHp = playerHpBar.data('total');
    console.log("hp bar total", totalBarHp);
    const value = playerHpBar.data("value");
    console.log("hp bar value", value);
    const hpDamage = damageFromEnemy;
    const newHpValue = value - hpDamage;
    const barWidth = (newHpValue / totalBarHp) * 100;
    const hitBarWidth = (hpDamage / value) * 100 + "%";
    console.log('barWidth: ', barWidth);
    //
    hit.css('width', barWidth);
    playerHpBar.data('value', newHpValue);
    bar.css('hit', barWidth + "%");
    // setTimeout(function () {
    //   hit.css({ 'width': '0' });
    //   bar.css('width', barWidth + "%");
    // }, 100);
  });
}

// function enemyHealthBar() {

// }

//when fight is clicked will transition to moves menu
function fightToMoves() {
  $("#fight").click(function () {
    $("#battle-option-box").css("visibility", "hidden");
    $("#move-options").css("visibility", "visible");
  });
}

//Store list of pokemon by region
let pokemonList = [];
makePokedexCall(1).then((response) => {
  response["pokemon_entries"].forEach((pokemon) => {
    pokemonList.push(pokemon["entry_number"]);
  });
});

$(document).ready(function () {
  // fightToMoves();
  playerHealthBar();
  $("#fight").on("click", function () { createBattleObject(); });
  $("#run").on("click", function () { console.log("run!"); });
  $("#pokemon").on("click", function () { console.log("party!"); });
  $("#items").on("click", function () { console.log("items!"); });
});