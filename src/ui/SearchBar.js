import { useSearchParams } from "react-router-dom";

function SearchBar() {
  const [search, setSearch] = useSearchParams("");

  function handleClick(e) {
    e.preventDefault();
    if (e.target.value === null) search.set(null);
    search.set("search", e.target.value);
    setSearch(search);
  }

  return (
    <>
      <input
        type="text"
        className="rounded-lg md:w-[35rem] my-8 p-1 bg-violet-100 shadow-2xl focus:caret-violet-800  sm:w-[20rem] w-[24rem]  border border-violet-700 focus:border-violet-900 focus:outline-none"
        placeholder="Search"
        onChange={(e) => handleClick(e)}
      />
    </>
  );
}

export default SearchBar;
