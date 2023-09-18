import { useContext } from "preact/hooks";
import { PokemonContext } from "../components/pokemon-provider";
import { Link } from "preact-router";
import ProfileCard from "../components/card/profile-card";

function CaughtPokemons() {
  const { state: pokemonData,dispatch } = useContext(PokemonContext);

  const pokemonsProfile = pokemonData.map((pokemon) => {
    return (
      <div class="btn-group">
        <Link
          key={pokemon.id}
          class="pokemon-item"
          href={`/pokemon/${pokemon.id}`}
        >
          <ProfileCard image={pokemon.image} title={pokemon.name} />
        </Link>
        <button type="button" class="btn btn-warning" onClick={()=>dispatch({type:'DELETE',payload:pokemon.id})}>
          Release
        </button>
      </div>
    );
  });

  if(pokemonData.length===0){
    return <div class="pokemons-container mb-1"><h2>No pokemons found !</h2></div>;
  }else{
    return <div class="pokemons-container mb-1">{pokemonsProfile}</div>;
  }
 
}

export default CaughtPokemons;
