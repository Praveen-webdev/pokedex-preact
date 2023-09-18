import { Link } from "preact-router/match";
import { useContext } from "preact/hooks";
import { PokemonContext } from "./pokemon-provider";

const Header = () => {
  const { state } = useContext(PokemonContext);

  return (
    <header class="header sticky text-center mb-1 d-flex">
      <div class="logo-text-center">
        <img
          class="pokemon-logo"
          src="/assets/images/pngimg.com - pokemon_logo_PNG6.png"
        />
      </div>
      <nav class="nav-link">
        <Link activeClassName="active btn btn-primary base-link" href="/">
          Base
        </Link>
        <Link
          activeClassName="active btn btn-primary collection-link"
          href="/my-pokemons"
        >
          Collection
          <span class="btn btn-secondary btn-square btn-shadow-inset">
            {state.length}
          </span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
