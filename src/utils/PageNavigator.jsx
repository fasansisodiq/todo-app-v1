import { NavLink } from "react-router-dom"
import React from 'react'

function PageNavigator({to, children, activeClassName, notActiveClassName}) {
  return (
    <NavLink to={to} className={({ isActive }) =>
              isActive ? `h-5 xl:h-fit  text-slate-800 font-semibold
               bg-white p-1 rounded 
              border-x-3 
              lg:border-x-6 border-x-green-500
              transition-all duration-3 ${activeClassName} shadow ` : ` hover:border-x-2 hover:border-x-green-600 xl:hover:border-x-8  xl:hover:rounded-7xl   hover:p-1 hover:h-fit    
                 hover:rounded hover:bg-slate-200 ${notActiveClassName}` 
            }>
      {children}
    </NavLink>
  )
}

export default PageNavigator



