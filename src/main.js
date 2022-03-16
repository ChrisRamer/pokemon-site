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

//Store list of pokemon by region
let pokemonList = [];
makePokedexCall(1).then((response) => {
  response["pokemon_entries"].forEach((pokemon) => {
    pokemonList.push(pokemon["entry_number"]);
  });
});

$(document).ready(function () {
  $("#fight").on("click", function() {createBattleObject();});
  $("#run").on("click", function () {console.log("run!");});
  $("#pokemon").on("click", function() {console.log("party!");});
  $("#items").on("click", function() {console.log("items!");});
});