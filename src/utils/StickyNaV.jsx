function StickyNav({ children }) {
  return (
    <nav
      className="w-full   bg-gradient-to-r from-emerald-50 via-white to-emerald-100 dark:from-[#232b25] dark:via-[#181f1b] dark:to-[#232b25]
        border-b 
         sm:justify-end sm:gap-2 md:gap-4 lg:gap-8
        h-14  lg:px-12
        rounded-b-2xl backdrop-blur-md
        duration-300 text-[0.7rem] sm:text-[0.9rem]  transition-colors  bg-white/80 dark:bg-[#232b25]/80 border-emerald-100 dark:border-emerald-900 sm:h-15 md:h-24  shadow-2xl fixed top-0 right-0 left-0 z-50 justify-between px-4  sm:px-6 md:px-8 flex  items-center"
    >
      {children}
    </nav>
  );
}

export default StickyNav;
