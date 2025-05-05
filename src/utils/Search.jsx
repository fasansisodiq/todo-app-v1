import { FaSearch } from "react-icons/fa";
import { useFocus } from "../customHooks/tasks/useFocus";

function Search({ handleSearch, placeholder }) {
  let searchQuery;
  let setSearchQuery;
  const { isFocused, setIsFocused, useFocusOnMouseOver } = useFocus();
  const searchRef = useFocusOnMouseOver(isFocused);
  return (
    <div className="flex justify-center items-center w-full h-10 ">
      <form
        onSubmit={handleSearch}
        className="
        w-30 h-5 sm:w-5/6 md:w-5/6 lg:w-4/6 shadow text-center  bg-white border-2 border-white sm:h-7
      md:h-8 lg:h-10 flex justify-center self-center  rounded-full  items-center  pl-1 
      outline-0  hover:bg-emerald-100  hover:border-emerald-100   
      
      "
      >
        <span className="text-[0.5rem] sm:text-[0.8rem]  md:text-lg text-slate-600 lg:text-lg  ">
          <FaSearch />
        </span>
        <input
          ref={searchRef}
          onMouseEnter={() => setIsFocused(true)}
          onMouseLeave={() => setIsFocused(false)}
          className={` w-27 sm:w-4/5 md:w-4/5 h-4 md:h-5 lg:w-6/7 text-[0.7rem] placeholder:text-[0.5rem] sm:placeholder:text-[0.7rem] md:placeholder:text-[0.7rem] lg:placeholder:text-[0.8rem] lg:h-10 p-2  border-none outline-0 border-[#fff]   text-slate-900 lg:text-xl  `}
          type="search"
          name="search"
          id="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
        />
      </form>
    </div>
  );
}

export default Search;
