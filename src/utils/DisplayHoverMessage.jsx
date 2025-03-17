import { useState } from "react";

function DisplayHoverMessage({mClassName, element, message}) {
     const [showMessage, setShowMessage] = useState(false);
  return (
    <div className="w-fit h-fit p-1 relative cursor-pointer " onMouseEnter={() => setShowMessage(true)}
          onMouseLeave={() => setShowMessage(false)}>
           {element}  
       {showMessage && (
            <span className={`
             absolute flex justify-center items-center  p-2 pb-3  text-slate-700 sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem] xl:text-[1.2rem] border-l-3 sm:border-l-4 md:border-l-5  lg:border-l-6 xl:border-l-7  border-t-green-600 border-l-green-600  rounded shadow-3xl bg-white border-t-2  z-40  ${mClassName}`
             }>
              <p className="capitalize">{message}</p>
            </span>
          )}
    </div>
  )
}

export default DisplayHoverMessage
