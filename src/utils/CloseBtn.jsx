import { useTodos } from "../customHooks/TodosContext"
import DisplayHoverMessage from "./DisplayHoverMessage"


function CloseBtn({btnPosition, mClassName, onClick}) {
  const {isOpen} = useTodos()
  return (
    
      <DisplayHoverMessage 
      element={isOpen && <button onClick={onClick} className={`absolute  px-2 pb-1 flex justify-center items-center w-fit h-fit text-[1.7rem] sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-semibold hover:bg-red-600 hover:text-white ${btnPosition}  `}>&times;</button>}
      message={"close"}
      mClassName={mClassName}
      />
    
  )
}

export default CloseBtn
