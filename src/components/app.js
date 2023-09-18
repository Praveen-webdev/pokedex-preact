import { h } from "preact";
import { Router } from "preact-router";
import Header from "./header";
import NotFound from "../routes/not-found";
import Pokemons from "../routes/pokemons";
import Pokemon from "../routes/pokemon";
import PokemonProvider from "../components/pokemon-provider";
import CaughtPokemons from "../routes/my-pokemons";

const handleRouteChange = (e) => {
  if (e.previous === "/pokemons") {
    const pokemons = localStorage.getItem('pokemons');
    if (pokemons) {
      localStorage.setItem('pokemons', pokemons);
    }
  }
};

const App = () => (
  <div id="app">
    <PokemonProvider>
      <Header />
      <main class="wrapper">
        <Router onChange={handleRouteChange}>
          <Pokemons path="/" />
          <Pokemon path="/pokemon/:id" />
          <CaughtPokemons path="/my-pokemons" />
          <NotFound default />
        </Router>
      </main>
    </PokemonProvider>
  </div>
);

export default App;
