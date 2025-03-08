import { FaSearch } from "react-icons/fa";

// shadow-0.5
function Search() {
  return (
    <div className=" w-120  text-center my-1 ">
      <div
        className="
      w-60 h-10 flex justify-center border-2 border-[#fff] bg-[#fff] rounded-full  items-center gap-2  
      outline-0    hover:bg-emerald-100 hover:w-90 hover:pl-2 active:w-90 
      "
      >
        <span className=" shadow pl-1 text-lg text-[#183a1f] ">
          <FaSearch />
        </span>
        <input
          className="w-40 h-10 px-3 py-2 border-none outline-0 border-[#fff] hover:w-90 active:w-90  text-[#183a1f] text-xl  "
          type="search"
          name="search"
          id="search"
          placeholder="Search here..."
        />
      </div>
    </div>
  );
}

export default Search;
