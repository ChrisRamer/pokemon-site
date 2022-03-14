import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Pokemon from './js/pokemon';
import PokemonService from './js/pokemon-service';

function getElements(response) {
  console.log(response);
}

async function makePokedexCall(region) {
  const response = await PokemonService.getPokedex(region);
  getElements(response);
}

async function makePokemonCall(name) {
	const response = await PokemonService.getPokemon(name);
	getElements(response);
}

 async function newPokemonCreate(name) {
  const response = await PokemonService.getPokemon(name);
  let pokemon = new Pokemon(response);
  getElements(pokemon);
}

async function randomPokemonCall(region) {
  const response = await PokemonService.randomPokemon(region);
  getElements(response);
}

async function getMoveData(name) {
  const response = await PokemonService.getMove(name);
  getElements(response);
}

$(document).ready(function () {
  makePokedexCall(2); // TODO:  Use configurable region
	makePokemonCall("bulbasaur");
  randomPokemonCall("2");
  newPokemonCreate("bulbasaur");
});