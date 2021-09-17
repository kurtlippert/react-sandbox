import "./styles.css";
import "bootstrap-utilities";
import { useState } from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

export async function getPokemon(pokemonName = "bulbasaur") {
  const pokemonResponse = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );
  const pokemonData = pokemonResponse.data.forms[0];
  console.log(pokemonResponse.data.forms[0]);
  return JSON.stringify(pokemonData);
}

export function Pokemon() {
  const [pokemon, setPokemon] = useState("No pokemon");

  if (pokemon === "No pokemon") {
    (async () => {
      const pokemonData = await getPokemon();
      setPokemon(JSON.stringify(pokemonData));
    })();
  }

  return (
    <>
      <div className="p-2">{pokemon}</div>
      <br />
      <button
        onClick={async () => {
          const pokemonData = await getPokemon((Math.random() * 100).toFixed());
          setPokemon(JSON.stringify(pokemonData));
        }}
      >
        refresh
      </button>
    </>
  );
}

export function Home() {
  const [count, setCount] = useState(0);
  return (
    <>
      <br />
      <br />
      <button onClick={() => setCount(count + 1)}>inc</button>
      <br />
      <br />
      <div>{count}</div>
      <br />
      <button onClick={() => setCount(count - 1)}>dec</button>
    </>
  );
}

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Howdy world</h2>
      <Router>
        <Link to="/" className="p-2">
          home
        </Link>
        <Link to="/about" className="p-2">
          about
        </Link>
        <Link to="/pokemon" className="p-2">
          pokemon
        </Link>
        <Route exact path="/" component={Home} />
        <Route path="/pokemon" component={Pokemon} />
      </Router>
      {/*  */}
    </div>
  );
}
