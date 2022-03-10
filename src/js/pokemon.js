Pokemon = {
  name: "Bulbasaur",
  level: 1,
  experience: 0,
  experienceBase: 64,
  type: ["grass", "poison"],
  spriteFront: "<string link>",
  spriteBack: "<string link>",
  maxStats: {
    hp: 45,
    attack: 49,
    defense: 49,
    specialAttack: 65,
    specialDefense: 65,
    speed: 45
  },
  currentStats: {
    hp: 45,
    attack: 49,
    defense: 49,
    specialAttack: 65,
    specialDefense: 65,
    speed: 45
  },
  moves: [
    {
      name: "Pound",
      flavorText: "Inflicts regular damage.",
      power: 40,
      ppMax: 35,
      ppCurrent: 35,
      statChange: [],
      target: "opponent",
      type: "normal"
    },
    {
      name: "Sword-Dance",
      flavorText: "Raises the user's Attack by two stages.",
      power: null,
      ppMax: 20,
      ppCurrent: 20,
      statChange: [ {change: 2, statName: "attack"} ],
      target: "user",
      type: "normal"
    }
  ]
}