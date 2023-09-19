import { h } from "preact";
import { Router } from "preact-router";
import Header from "./header";
import NotFound from "../routes/not-found";
import Pokemons from "../routes/pokemons";
import Pokemon from "../routes/pokemon";
import PokemonProvider from "../components/pokemon-provider";
import MyPokemons from "../routes/my-pokemons";



const App = () => (
  <div id="app">
    <PokemonProvider>
      <Header />
      <main class="wrapper">
        <Router onChange={(e)=>console.log("changing route",e)}>
          <Pokemons path="/" />
          <Pokemon path="/pokemon/:id" />
          <MyPokemons path="/my-pokemons" />
          <NotFound default />
        </Router>
      </main>
    </PokemonProvider>
  </div>
);

export default App;
