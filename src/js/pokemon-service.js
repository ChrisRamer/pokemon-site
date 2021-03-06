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

  static async getMove(name) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/move/${name}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }

      return response.json();
    } catch (error) {
      return error.message;
    }
  }

  static async getType(type) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }

      return response.json();
    } catch (error) {
      return error.message;
    }
  }

  static async randomPokemon(region) {
    const testService = await this.getPokedex(region);
    const randomNumber = Math.floor(Math.random() * (testService["pokemon_entries"].length));
    const name = (testService["pokemon_entries"][randomNumber]["pokemon_species"]["name"]);
    return this.getPokemon(name);
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