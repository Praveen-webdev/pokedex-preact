import { createContext } from 'preact';
import { useReducer } from 'preact/hooks';

export  const PokemonContext = createContext();

const reducer=(state,action)=>{
    switch (action.type) {
        case "ADD":
            return [...state,action.payload];
        case "DELETE":
            return state.filter((pokemon)=>action.payload!==pokemon.id);

        default:
            return state;
    }
}
const initialState=[];
function PokemonProvider(props) {
    const [state,dispatch]=useReducer(reducer,initialState);

  return (
    <PokemonContext.Provider value={{state,dispatch}}>
        {props.children}
    </PokemonContext.Provider>
  );
}

export default PokemonProvider;