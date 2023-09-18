import { useEffect, useState,useContext } from "react";
import useGetData from "../utils/get-data";
import ProfileCard from "../components/card/profile-card";
import errorPage from "../components/error";
import { spinningBall } from "../components/loading";
import { PokemonContext } from "../components/pokemon-provider";
import { Link } from "preact-router";


function Pokemon({ id }) {
  const {state,dispatch}=useContext(PokemonContext);
  const {
    data: pokemonData,
    loading,
    setLoading,
    error,
  } = useGetData(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const [pokemon, setPokemon] = useState(null);
  const [isCaught,setIsCaught]=useState(false);


  useEffect(() => {
    if (pokemonData) {
      setPokemon(() => {
        const name = pokemonData.name
          .charAt(0)
          .toUpperCase()
          .concat(pokemonData.name.slice(1));
        return {
          id: pokemonData.id,
          name,
          image: pokemonData.sprites.front_default,
          weight: pokemonData.weight,
          experience: pokemonData.base_experience,
          abilities: pokemonData.abilities.map(
            (ability) => ability.ability.name
          ),
          moves: pokemonData.moves.map((move) => move.move.name),
          types: pokemonData.types.map((type) => type.type.name),
        };
      });
      setLoading(false);
    }
  }, [pokemonData]); //Note: also run for initial render (pokemonData:null)

  useEffect(()=>{
    if(pokemon){
      setIsCaught(state.some((item)=>pokemon.id===item.id))
    }
  },[pokemon])
  
  function handleCatch(){
    if(isCaught){
      console.log("delete");
      dispatch({type:"DELETE",payload:pokemon.id});
      setIsCaught(false);
    }else{
      console.log("add");
      dispatch({type:"ADD",payload:{id:pokemon.id,name:pokemon.name,image:pokemon.image}})
      setIsCaught(true);
    }
  }

  if (loading) {
    return spinningBall;
  }
  if (error) {
    return errorPage;
  }
  if (pokemon) {
    const types = pokemon.types.map((type) => {
      return <span class={`btn btn-secondary btn-pill ${type}`}>{type}</span>;
    });
    const moves = pokemon.moves.map((move) => {
      return (
        <span class="btn btn-pale btn-black btn-shadow-outline btn-pill">
          {move}
        </span>
      );
    });
    const abilities = pokemon.moves.map((ability) => {
      return (
        <span class="btn btn-pale btn-black btn-shadow-outline btn-pill">
          {ability}
        </span>
      );
    });
    return (
      <div class="pokemon-container">
        <div class="pokemon-profile-info">
          <div class="pokemon-profile" onClick={handleCatch}>
            <figure>
              <ProfileCard role="button"  class="fixed-pokeball" image={isCaught?pokemon.image:"../assets/images/icons8-here-24.png"} title={isCaught?pokemon.name:"catch"} />
            </figure>
            <figcaption>
              <h2 class={`btn ${pokemon.types[0]}`}>{pokemon.name}</h2>
            </figcaption>
          </div>
          <div class="pokemon-basic-info">
            <p>
              <strong>Weight:</strong>
              {pokemon.weight}
            </p>
            <p>
              <strong>Experience:</strong>
              {pokemon.experience}
            </p>
            <strong>Types:</strong>
            <div class="pokemon-type detail-values">{types}</div>
          </div>
        </div>
        <div class="pokemon-details">
          <div class="detail-values mb-1">
            <h4 class="detail-title">Abilities</h4>
            {abilities}
          </div>
          <div class="moves detail-values mb-1">
            <h4 class="detail-title">Moves</h4>
            {moves}
          </div>
        </div>
      </div>
    );
  }
}

export default Pokemon;
