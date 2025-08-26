function StickyNav({ children }) {
  return (
    <nav className="w-full h-12 border-b  transition-colors duration-300 bg-white/80 dark:bg-[#232b25]/80 border-emerald-100 dark:border-emerald-900 sm:h-15 md:h-24  shadow-2xl fixed top-0 right-0 left-0 z-50 justify-between px-4  sm:px-6 md:px-8 flex  items-center">
      {children}
    </nav>
  );
}

export default StickyNav;
