# *Pokemon site idk*

Pokemon site that allows for catching Pokemon and taking them into battle.
Primary language: JS
API: https://pokeapi.co/

Wednesday plan: Project creation, Front-end for catching/displaying pokemon, backend for pokemon data, functions for getting API data

Minimum requirements:
* Generate random pokemon from API (use region, store as array) - Lucian, Tristen
* Fetch pokemon randomly by region/gen, some kind of rarity system - Kiernan
* Battle system - moves, stats, weaknesses, status effects, etc. - Chris, Tristen
* Battle system - switching pokemon, events (death, victory, player vs AI) - Chris, Tristen
* Front end for buttons and showing images, etc. (handle front-back connections) - Lucian
* Store caught pokemon with cookies ([info](https://www.w3schools.com/js/js_cookies.asp)) - Geoff
* Front end for battles (using battle sprites and backgrounds) - Geoff, Lucian
* Levels for evolutions (x^3) - Chris

Stretch goals:
* Held items
* Change growth-rate speed using endpoint for levels
* Sound effects
* Additional pokemon data (eg. gender, abilities, EVs?)
* Alternate forms (eg. alolan, mega)
* Gyms
* Change in stats from level-ups
* Battle AI difficulty
* “Hard mode” where pokemon is gone when it faints in battle

Battle system notes:
* Player selects a pokemon to take into battle (select 1 from party)
* Move selection menu for the pokemon when it’s their turn
* Moves take stats, PP, types, and effects into account (don’t have to be accurate to games)

AI’s turn:
* Draws random move for its pokemon (pokemon & level is also selected at random; have level be within reason to player’s level)
* Order of pokemon attacks is based on speed
* When pokemon faints, battle ends (stretch goal of switching pokemon if parties are a thing)

Catching pokemon notes:
* Get random pokemon (no battle for it) and starts at level 5
* Gets 4 random moves
* Player gets choice to keep or discard pokemon
* Only allow catching if 5 pokemon or less in party

Leveling notes:
* AI and player pokemon stats are +1 to base stats for each level
* Evolutions requiring holding an item are ignored, evolve without item for MVP

Front-end notes:
  Party menu:
  * Select current pokemon from party of 6, opens a page that shows details on selected pokemon, has button for discarding the pokemon
  Party menu:
  * Each pokemon in main menu has a toggle for it being selected pokemon for use in battles
Battle system:
* Battle backgrounds & pokemon sprites, text for current action (eg. “Pikachu used Thunder”) in a log, buttons for pokemon’s moves when it’s their turn, HP (numbers or bars)

API notes:
api/v2/pokedex/2  =>  pokedex entries for the kanto region and games that were there


### License

Copyright (c) 2022
This software is licensed under the MIT license.