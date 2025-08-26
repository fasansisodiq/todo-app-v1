function StickyNav ({children}) => {
 return (
   <nav className="w-full h-12 bg-emerald-50 sm:h-15 md:h-24  shadow-2xl fixed top-0 right-0 left-0 z-50 justify-between px-4  sm:px-6 md:px-8 flex  items-center">{children}</nav>
)
}