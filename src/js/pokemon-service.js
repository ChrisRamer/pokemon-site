export default class PokemonService {
  static async getPokedex(region) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokedex/${region}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }

      return response.json();
    } catch (error) {
      return error.message;
    }
  }

  static async getPokemon(name) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }

      return response.json();
    } catch (error) {
      return error.message;
    }
  }
}