import { pokemonTypes } from "./pokemonTypes";

const pokemonAPI = "https://pokeapi.co/api/v2";
const pokemonsRoute = `${pokemonAPI}/pokemon?limit=5000`;
const pokemonRoute = `${pokemonAPI}/pokemon`;
const pokemonSpeciesRoute = `${pokemonAPI}/pokemon-species`;

const pokemonTabs = {
  description: "description",
  evolution: "evolution",
  locations: "locations",
  moves: "moves",
};

const pokemonTypeImages = pokemonTypes;

export {
  pokemonAPI,
  pokemonsRoute,
  pokemonRoute,
  pokemonSpeciesRoute,
  pokemonTabs,
  pokemonTypeImages,
};
