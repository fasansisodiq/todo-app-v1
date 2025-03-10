import { FaSearch } from "react-icons/fa";

// shadow-0.5
function Search() {
  return (
    <div
      className="
        w-30 h-5 md:w-50 lg:w-65 shadow text-center   lg:ml-2 bg-white border-2 border-white 
       lg:h-10 flex justify-center  rounded-full  items-center  pl-1
      outline-0  hover:bg-emerald-100 hover:border-emerald-100 md:hover:w-50    lg:hover:w-65 lg-pl-4 lg:hover:pl-4 lg:active:w-60 
      "
    >
      <span className="text-[0.5rem] text-slate-600 lg:text-lg  ">
        <FaSearch />
      </span>
      <input
        className=" w-27 md:w-47 h-4 md:h-5 lg:w-57 text-[0.7rem] placeholder:text-[0.5rem] md:placeholder:text-[0.7rem] lg:placeholder:text-[0.8rem] lg:h-10 p-2 lg:px-4 lg:py-2 border-none outline-0 border-[#fff] hover:w-30 active:w-30 lg:hover:w-57 lg:active:w-57  text-slate-900 lg:text-xl  "
        type="search"
        name="search"
        id="search"
        placeholder="Search here..."
      />
    </div>
  );
}

export default Search;
