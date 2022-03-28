# *Pokemon site*

#### Authors

* [Tristen Everett](https://github.com/TJEverett)
* [Lucian Miller](https://github.com/lucianmiller)
* [Kiernan Beattie](https://github.com/kiernan2)
* Geoffry Millner(geoff.millner22@gmail.com)
* [Chris Ramer](https://github.com/ChrisRamer)

## Technologies Used

* _HTML_
* _CSS_
* _JavaScript_
* _[Pokemon API](https://pokeapi.co/)_

### Battle random Pokémon!

#### Special thanks to the Pokémon API (https://pokeapi.co/)

## Setup/Installation Requirements

1) Clone or download this Project
2) Move to "Main" directory with terminal
3) Run `npm install` to install necessary packages
4) Run `npm run start` to open site on your localhost

## Plan

### Minimum requirements:

```Generate random pokemon from API (use region, store as array) - Lucian, Tristen
Fetch pokemon randomly by region/gen, some kind of rarity system - Kiernan
Battle system - moves, stats, weaknesses, status effects, etc. - Chris, Tristen
Battle system - switching pokemon, events (death, victory, player vs AI) - Chris, Tristen
Front end for buttons and showing images, etc. (handle front-back connections) - Lucian
Store caught pokemon with cookies (info) - Geoff
Front end for battles (using battle sprites and backgrounds) - Geoff, Lucian
Levels for evolutions (x^3) - Chris
```

### Stretch goals:

```Held items
Change growth-rate speed using endpoint for levels
Sound effects
Additional pokemon data (eg. gender, abilities, EVs?)
Alternate forms (eg. alolan, mega)
Gyms
Change in stats from level-ups
Battle AI difficulty
“Hard mode” where pokemon is gone when it faints in battle
```

### Battle system notes:

```Player selects a pokemon to take into battle (select 1 from party)
Move selection menu for the pokemon when it’s their turn
Moves take stats, PP, types, and effects into account (don’t have to be accurate to games)
```

### AI’s turn:

```Draws random move for its pokemon (pokemon & level is also selected at random; have level be within reason to player’s level)
Order of pokemon attacks is based on speed
When pokemon faints, battle ends (stretch goal of switching pokemon if parties are a thing)
```

### Catching pokemon notes:

```Get random pokemon (no battle for it) and starts at level 5
Gets 4 random moves
Player gets choice to keep or discard pokemon
Only allow catching if 5 pokemon or less in party
```

### Leveling notes:

```AI and player pokemon stats are +1 to base stats for each level
Evolutions requiring holding an item are ignored, evolve without item for MVP
```

### Front-end notes: Party menu:

```Select current pokemon from party of 6, opens a page that shows details on selected pokemon, has button for discarding the pokemon Party menu:
Each pokemon in main menu has a toggle for it being selected pokemon for use in battles Battle system:
Battle backgrounds & pokemon sprites, text for current action (eg. “Pikachu used Thunder”) in a log, buttons for pokemon’s moves when it’s their turn, HP (numbers or bars)
```

## Known Bugs / Limitations

* Turns do not take pokemon speed or move priority into consideration
* Pokemon moves have unused PP, meaning a move can be used an unlimited number of times
* Pokemon Type advantages not taken into acount
* "Fight", "Pokemon", "Items", and "Run" buttons do not have function yet
* Start of turn for player starts them in move selection instead of action selection for buttons
* User has to reload page to get different pokemon to fight
* User has to wait about 3 to 5 seconds after page is loaded before initiating a battle
* Battle is started by clicking on logo instead of the Start button
* Clicking on logo before clicking start button starts battle but doesn't move away from start screen

### License

Copyright (c) 2022. This software is licensed under the MIT license.