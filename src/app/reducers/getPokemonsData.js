import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { defaultImages, images, pokemonTypes } from "../../utils";

export const getPokemonsData = createAsyncThunk(
  "pokemon/randomPokemon",
  async (pokemons) => {
    try {
      const pokemonsData = [];
      for await (const pokemon of pokemons) {
        const { data } = await axios.get(pokemon.url);
        const types = data.types.map(({ type: { name } }) => ({
          [name]: pokemonTypes[name],
        }));
        let image = images[data.id];
        if (!image) {
          image = defaultImages[data.id];
        }
        if (image) {
          pokemonsData.push({
            name: pokemon.name,
            id: data.id,
            image,
            types,
          });
        }
      }
      return pokemonsData;
    } catch (err) {
      console.error(err);
    }
  }
);
