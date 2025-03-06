import React, { useEffect } from "react";
import { pokemonTypes } from "../utils";
import { useAppDispatch } from "../app/hooks";
import { addPokemonToList } from "../app/reducers/addPokemonToList";
import { setPokemonTab } from "../app/slices/AppSlice";
import { pokemonTabs } from "../utils/constants";

// Define necessary types within the file
/**
 * @typedef {Object} currentPokemonType
 * @property {number} id
 * @property {string} name
 * @property {Object[]} types
 * @property {string} image
 * @property {Object[]} stats
 * @property {string[]} encounters
 * @property {number} evolutionLevel
 * @property {Object[]} evolution
 * @property {Object} pokemonAbilities
 */

/**
 * @typedef {Object} pokemonStatsType
 * @property {string} name
 * @property {string} value
 */

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default function Info({ data }) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const progressBars = document.querySelectorAll("progress");
    progressBars.forEach((progressBar) => {
      progressBar.style.width = "10rem";
    });
  }, []);
  const createStatsArray = (types, statType) => {
    const statsSet = new Set();
    types.forEach((type) => {
      if (pokemonTypes[type] && pokemonTypes[type][statType]) {
        pokemonTypes[type][statType].forEach((stat) => {
          if (!statsSet.has(stat)) {
            statsSet.add(stat[0].toUpperCase() + stat.slice(1));
          }
        });
      }
    });
    return Array.from(statsSet);
  };
  return (
    <ErrorBoundary>
      <div className="details">
        <h1 className="name">{data?.name}</h1>
        <h3>Type: {data?.types.join(" - ")}</h3>
        <h3>Evolution: {data?.evolutionLevel}</h3>
        <button onClick={() => dispatch(setPokemonTab(pokemonTabs.evolution))}>
          See next evolution
        </button>
      </div>
      <div className="stats">
        <ul>
          {data?.stats.map((stat) => {
            return (
              <li key={stat.name}>
                {stat.name}: {stat.value}
                <progress max={100} value={stat.value} />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="battle-stats">
        <ul>
          <li>
            <span>Strengths:</span>
            <span>{createStatsArray(data?.types, "strength").join(", ")}</span>
          </li>
          <li>
            <span>Weakness:</span>
            <span>{createStatsArray(data?.types, "weakness").join(", ")}</span>
          </li>
          <li>
            <span>Resistant:</span>
            <span>
              {createStatsArray(data?.types, "resistance").join(", ")}
            </span>
          </li>
          <li>
            <span>Vulnerable:</span>
            <span>
              {createStatsArray(data?.types, "vulnerable").join(", ")}
            </span>
          </li>
        </ul>
        <button
          onClick={() => dispatch(addPokemonToList(data))}
          className="add-pokemon"
        >
          Add Pokemon
        </button>
      </div>
    </ErrorBoundary>
  );
}
