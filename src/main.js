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
	return Math.ceil(Math.random() * ((max - min) + 1) + min);
}

function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


//Battle Functions
function createBattleObject() {
	// Gets random pokemon object
	// let randNum = getRandomNumber(0, pokemonList.length - 1);
	// let randPokemon = pokemonList[randNum];
  // makePokemonCall(randPokemon).then((tempPokemon1) => {
  //   let playerPokemon = pokemonCreate(tempPokemon1, 1);
	// 	randNum = getRandomNumber(0, pokemonList.length - 1);
	// 	randPokemon = pokemonList[randNum];
  //   makePokemonCall(randPokemon).then((tempPokemon2) => {
  //     let opposingPokemon = pokemonCreate(tempPokemon2, 1);
			// Create battle object
      console.log(pokemon1);
      console.log(pokemon2);
			currentBattle = new Battle(pokemon1, pokemon2);
			console.log(`${capitalizeFirst(pokemon1["name"])} entered fight with ${capitalizeFirst(pokemon2["name"])}!`);
	// 	});
	// });
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


//Declare Variables
let currentBattle;
let pokemonList = [];
let pokemon1 = {};
let pokemon2 = {};


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
    pokemon1 = pokemonCreate(pokemonName, 1);
  });
  makePokemonCall(getRandomNumber(1, pokemonList.length)).then((pokemonName) => {
    pokemon2 = pokemonCreate(pokemonName, 1);
  });
  $("#fight").on("click", function() {createBattleObject();});
  $("#run").on("click", function () {console.log("run!");});
  $("#pokemon").on("click", function() {console.log("Pokemon!");});
  $("#items").on("click", function() {console.log("items!");});
});