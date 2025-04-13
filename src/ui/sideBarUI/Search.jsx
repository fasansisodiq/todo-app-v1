import { FaSearch } from "react-icons/fa";

// shadow-0.5
function Search() {
  return (
    <div
      className="
        w-30 h-5 sm:w-45 md:w-50 lg:w-65 shadow text-center    bg-white border-2 border-white sm:h-7
      md:h-8 lg:h-10 flex justify-center self-center  rounded-full  items-center  pl-1 hover:pl-1
      outline-0  hover:bg-emerald-100  hover:border-emerald-100 sm:hover:w-45 md:hover:w-50 sm:pl-2 sm:hover:pl-2 md:pl-3 md:hover:pl-3 sm:active:w-45 md:active:w-46   lg:hover:w-65 lg-pl-4 lg:hover:pl-4 lg:active:w-60 
      
      "
    >
      <span className="text-[0.5rem] sm:text-[0.8rem]  md:text-lg text-slate-600 lg:text-lg  ">
        <FaSearch />
      </span>
      <input
        className=" w-27 sm:w-43 md:w-47 h-4 md:h-5 lg:w-57 text-[0.7rem] placeholder:text-[0.5rem] sm:placeholder:text-[0.7rem] md:placeholder:text-[0.7rem] lg:placeholder:text-[0.8rem] lg:h-10 p-2 lg:px-4  border-none outline-0 border-[#fff] hover:w-30 active:w-30 sm:hover:w-45 sm:active:w-45 md:hover:w-47 md:active:w-47 lg:hover:w-57 lg:active:w-57  text-slate-900 lg:text-xl  "
        type="search"
        name="search"
        id="search"
        placeholder="Search here..."
      />
    </div>
  );
}

export default Search;
