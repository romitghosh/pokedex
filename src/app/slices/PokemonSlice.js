import { createSlice } from "@reduxjs/toolkit";
import { getInitialPokemonData } from "../reducers/getInitialPokemonData";
import { getPokemonsData } from "../reducers/getPokemonsData";
import { getUserPokemons } from "../reducers/getUserPokemons";
import { removePokemonFromUserList } from "../reducers/removePokemonFromUserList";

// Define necessary types within the file
/**
 * @typedef {Object} PokemonInitialStateType
 * @property {undefined | genericPokemonType[]} allPokemon
 * @property {generatedPokemonType[] | undefined} randomPokemons
 * @property {generatedPokemonType[]} compareQueue
 * @property {userPokemonsType[]} userPokemons
 * @property {undefined | currentPokemonType} currentPokemon
 */

/**
 * @typedef {Object} genericPokemonType
 * @property {string} name
 * @property {string} url
 */

/**
 * @typedef {Object} generatedPokemonType
 * @property {string} name
 * @property {number} id
 * @property {string} image
 * @property {pokemonTypeInterface[]} types
 */

/**
 * @typedef {Object} userPokemonsType
 * @property {string} name
 * @property {number} id
 * @property {string} image
 * @property {pokemonTypeInterface[]} types
 * @property {string} [firebaseId]
 */

/**
 * @typedef {Object} currentPokemonType
 * @property {number} id
 * @property {string} name
 * @property {pokemonTypeInterface[]} types
 * @property {string} image
 * @property {pokemonStatsType[]} stats
 * @property {string[]} encounters
 * @property {number} evolutionLevel
 * @property {{ level: number; pokemon: { name: string; url: string } }[]} evolution
 * @property {{ abilities: string[]; moves: string[] }} pokemonAbilities
 */

/**
 * @typedef {Object} pokemonStatsType
 * @property {string} name
 * @property {string} value
 */

/**
 * @typedef {Object} pokemonTypeInterface
 * @property {{ image: string; resistance: string[]; strength: string[]; weakness: string[]; vulnerable: string[] }} [key: string]
 */

const initialState = {
  allPokemon: undefined,
  randomPokemons: undefined,
  compareQueue: [],
  userPokemons: [],
  currentPokemon: undefined,
};

export const PokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    addToCompare: (state, action) => {
      const index = state.compareQueue.findIndex(
        (pokemon) => pokemon.id === action.payload.id
      );
      if (index === -1) {
        if (state.compareQueue.length === 2) {
          state.compareQueue.pop();
        }
        state.compareQueue.unshift(action.payload);
      }
    },
    removeFromCompare: (state, action) => {
      const index = state.compareQueue.findIndex(
        (pokemon) => pokemon.id === action.payload.id
      );
      const queue = [...state.compareQueue];
      queue.splice(index, 1);
      state.compareQueue = queue;
    },
    setCurrentPokemon: (state, action) => {
      state.currentPokemon = action.payload;
    },
    resetRandomPokemons: (state) => {
      state.randomPokemons = undefined;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getInitialPokemonData.fulfilled, (state, action) => {
      state.allPokemon = action.payload;
    });
    builder.addCase(getPokemonsData.fulfilled, (state, action) => {
      state.randomPokemons = action.payload;
    });
    builder.addCase(getUserPokemons.fulfilled, (state, action) => {
      state.userPokemons = action.payload;
    });
    builder.addCase(removePokemonFromUserList.fulfilled, (state, action) => {
      const userPokemons = [...state.userPokemons];
      const index = userPokemons.findIndex(
        (pokemon) => pokemon.firebaseId === action.payload?.id
      );
      userPokemons.splice(index, 1);
      state.userPokemons = userPokemons;
    });
  },
});

export const {
  addToCompare,
  removeFromCompare,
  setCurrentPokemon,
  resetRandomPokemons,
} = PokemonSlice.actions;

export default PokemonSlice.reducer;
