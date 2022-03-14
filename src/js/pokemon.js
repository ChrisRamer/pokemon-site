export default class Pokemon {
  constructor(bigPokemon, startingLevel) {
    this.name = bigPokemon.name;
    this.level = 0;
    this.experience = 0;
    this.experienceBase = bigPokemon["base_experience"];
    this.type = [];
    this.spriteFront = bigPokemon.sprites["back_default"];
    this.spriteBack = bigPokemon.sprites["front_default"];
    this.baseStats = {
      hp: bigPokemon.stats[0]["base_stat"],
      attack: bigPokemon.stats[1]["base_stat"],
      defense: bigPokemon.stats[2]["base_stat"],
      specialAttack: bigPokemon.stats[3]["base_stat"],
      specialDefence: bigPokemon.stats[4]["base_stat"],
      speed: bigPokemon.stats[5]["base_stat"],
    };
    this.maxStats = {
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefence: 0,
      speed: 0,
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
    this.levelSet(startingLevel);
  }

  levelSet(newLevel) {
    this.level = newLevel;
    this.maxStats = {
      hp: Math.ceil(((this.baseStats.hp * 2 * this.level) / 100) + this.level + 10),
      attack: Math.ceil(((this.baseStats.attack * 2 * this.level) / 100) + 5),
      defense: Math.ceil(((this.baseStats.defense * 2 * this.level) / 100) + 5),
      specialAttack: Math.ceil(((this.baseStats.specialAttack * 2 * this.level) / 100) + 5),
      specialDefence: Math.ceil(((this.baseStats.specialDefence * 2 * this.level) / 100) + 5),
      speed: Math.ceil(((this.baseStats.speed * 2 * this.level) / 100) + 5)
    };
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
//   baseStats:{
//     hp: 45,
//     attack: 49,
//     defense: 49,
//     specialAttack: 65,
//     specialDefense: 65,
//     speed: 45
//   },
//   maxStats: {
//     hp: 12,
//     attack: 6,
//     defense: 6,
//     specialAttack: 12,
//     specialDefense: 12,
//     speed: 6
//   },
//   currentStats: {
//     hp: 12,
//     attack: 6,
//     defense: 6,
//     specialAttack: 12,
//     specialDefense: 12,
//     speed: 6
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
//     },
//     null,
//     null
//   ],
//   movesPossible: ["pound", "sword-dance", "tackle"]
// }