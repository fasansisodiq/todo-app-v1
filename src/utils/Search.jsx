import { CiSearch } from "react-icons/ci";

function Search({ handleSearch, placeholder, value, onChange }) {
  return (
    <div className="flex justify-center items-center w-full h-12">
      <form
        onSubmit={handleSearch}
        className="flex items-center w-full max-w-md bg-gradient-to-r from-emerald-50 via-white to-emerald-100 dark:from-[#232b25] dark:via-[#181f1b] dark:to-[#232b25] border border-emerald-200 dark:border-emerald-800 rounded-full shadow-lg focus-within:ring-2 focus-within:ring-emerald-400 transition-all duration-200"
        role="search"
        aria-label="Search tasks"
      >
        <button
          type="submit"
          className="flex items-center justify-center w-5 h-5 pl-1 sm:pl-0 sm:h-10 sm:w-10 rounded-full text-emerald-700 dark:text-yellow-300 hover:bg-emerald-100 dark:hover:bg-[#232b25] focus:outline-none transition-colors duration-200"
          aria-label="Search"
        >
          <CiSearch />
        </button>
        <input
          className="flex-1 h-6 sm:h-10 placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base bg-transparent border-none outline-none px-3 text-slate-900 dark:text-yellow-100 text-base placeholder:text-emerald-400 dark:placeholder:text-yellow-400 rounded-full transition-all duration-200 focus:placeholder:text-emerald-600 dark:focus:placeholder:text-yellow-200"
          type="search"
          name="search"
          id="search"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="off"
        />
      </form>
    </div>
  );
}

export default Search;
