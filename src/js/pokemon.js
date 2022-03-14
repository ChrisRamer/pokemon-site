export default class Pokemon {
  constructor(bigPokemon) {
    this.name = bigPokemon.name;
    this.level = 1;
    this.experience = 0;
    this.experienceBase = bigPokemon["base_experience"];
    this.type = [];
    this.spriteFront = bigPokemon.sprites["back_default"];
    this.spriteBack = bigPokemon.sprites["front_default"];
    this.maxStats = {
      hp: bigPokemon.stats[0]["base_stat"],
      attack: bigPokemon.stats[1]["base_stat"],
      defense: bigPokemon.stats[2]["base_stat"],
      specialAttack: bigPokemon.stats[3]["base_stat"],
      specialDefence: bigPokemon.stats[4]["base_stat"],
      speed: bigPokemon.stats[5]["base_stat"],
    };
    this.currentStats = this.maxStats;
    this.moves = [null, null, null, null];
    this.movesPossible = [];

    bigPokemon.types.forEach((typeObject) => {
      this.type.push(typeObject.type.name);
    });
    bigPokemon.moves.forEach((moveObject) => {
      this.movesPossible.push(moveObject.move.name);
    });
  }


}


// Pokemon = {
//   name: "Bulbasaur",
//   level: 1,
//   experience: 0,
//   experienceBase: 64,
//   type: ["grass", "poison"],
//   spriteFront: "<string link>",
//   spriteBack: "<string link>",
//   maxStats: {
//     hp: 45,
//     attack: 49,
//     defense: 49,
//     specialAttack: 65,
//     specialDefense: 65,
//     speed: 45
//   },
//   currentStats: {
//     hp: 45,
//     attack: 49,
//     defense: 49,
//     specialAttack: 65,
//     specialDefense: 65,
//     speed: 45
//   },
//   moves: [
//     {
//       name: "Pound",
//       flavorText: "Inflicts regular damage.",
//       power: 40,
//       ppMax: 35,
//       ppCurrent: 35,
//       statChange: [],
//       target: "opponent",
//       type: "normal"
//     },
//     {
//       name: "Sword-Dance",
//       flavorText: "Raises the user's Attack by two stages.",
//       power: null,
//       ppMax: 20,
//       ppCurrent: 20,
//       statChange: [ {change: 2, statName: "attack"} ],
//       target: "user",
//       type: "normal"
//     }
//   ]
// }