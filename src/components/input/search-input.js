import { useCallback } from "react";

function SearchInput({ search, setSearch }) {

    const handleInputChange=useCallback((e)=>{
        setSearch((search)=>e.target.value)
    },[]);

  return (
    <div class="input-container  text-center mb-1">
      <input
        class="search-input"
        value={search}
        aria-label="search"
        placeholder="Search here..."
        autocomplete="off"
        onInput={handleInputChange}
      />
    </div>
  );
}

export default SearchInput;
