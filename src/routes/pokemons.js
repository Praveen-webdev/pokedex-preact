import { Link } from "preact-router/match";
import ProfileCard from "../components/card/profile-card";
import SearchInput from "../components/input/search-input";
import useGetData, { getData } from "/utils/get-data";
import { useState, useEffect, useCallback, useRef } from "preact/hooks";
import { spinningBall } from "../components/loading";
import errorPage from "../components/error";

function Pokemons(props) {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const loadBtnRef = useRef(null);
  const {
    data: pokemonsData,
    error,
    setError,
    loading,
    setLoading,
  } = useGetData(`https://pokeapi.co/api/v2/pokemon?limit=18&offset=${offset}`);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const pokemonsResults = pokemonsData.results;
        const pokeProfiles = await Promise.all(
          pokemonsResults.map(async (pokemon) => {
            const pokemonData = await getData(pokemon.url);
            return {
              name: pokemon.name,
              image: pokemonData.sprites.front_default,
              id: pokemonData.id,
            };
          })
        );
        setPokemons((pokemons) => [...pokemons, ...pokeProfiles]);
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    if (pokemonsData) {
      fetchPokemonDetails();
    }
  }, [pokemonsData]);

  useEffect(() => {
    const filtered = searchTerm
      ? pokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        )
      : pokemons;
    setFilteredPokemons(filtered);
  }, [searchTerm, pokemons]);

  useEffect(() => {
    if (loading && loadBtnRef.current) {
      loadBtnRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading]);

  const loadMore = useCallback(() => {
    setOffset((offset) => offset + 18);
  }, []);

  const pokemonsProfile = filteredPokemons.map((pokemon) => {
    return (
      <Link
        key={pokemon.id}
        class="pokemon-item"
        href={`/pokemon/${pokemon.id}`}
      >
        <ProfileCard image={pokemon.image} title={pokemon.name} />
      </Link>
    );
  });

  if (error) {
    return errorPage;
  } else {
    return (
      <>
        <SearchInput search={searchTerm} setSearch={setSearchTerm} />
        <div class="pokemons-container mb-1">
          {filteredPokemons.length ? (
            pokemonsProfile
          ) : searchTerm ? (
            <h2>No Pokemons found !</h2>
          ) : (
            ""
          )}
          {loading && spinningBall}
        </div>
        <div class="text-center">
          <button
            type="button"
            class="btn btn-outline-primary btn-med"
            onClick={loadMore}
            ref={loadBtnRef}
          >
            Load more...
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          class="btn-to-top btn-fixed-br"
        >
          <img src="/assets/images/icons8-double-up.gif" alt="Back to top" />
        </button>
      </>
    );
  }
}

export default Pokemons;
