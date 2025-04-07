
import { useTodos } from "../customHooks/TodosContext";
import CloseBtn from "./CloseBtn";

function Modal({isOpen, onClose, children }) {
  const {openViewDesc,
        openDelTask,
        openMarkTaskComp,
        openMarkTaskPend} = useTodos()
  if(!isOpen) return null
  return (
    <div
    onClick={onclose}
      className={`  fixed inset-0  z-20 flex justify-center items-center transition-colors  ${isOpen && 'backdrop-blur-sm' }
       
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative border-y-15 justify-center items-center  bg-white 
       border-y-green-700   z-50   border-2  text-slate-700 flex flex-col  md:gap-4 lg:gap-6
        border-slate-200 rounded-7xl    shadow-3xl rounded-xl transition-all text-[1.2rem] sm:text-xl md:text-2xl 
        w-70 sm:w-90 sm:h-100 md:w-100  lg:w-100  xl:w-100 py-2
         ${
          isOpen ? " scale-100 opacity-100" : "scale-125 opacity-0 "
        }`}
      >
       {openViewDesc||
        openDelTask||
        openMarkTaskComp||
        openMarkTaskPend && <CloseBtn mClassName={"-top-1 -right-28 sm:-top-1 sm:-right-35 sm:w-16 sm:text-lg md:-right-39 lg:top-0 lg:text-xl h-7"} btnPosition={"-top-4 -right-35 z-50 sm:-top-3 sm:-right-44 md:-top-3 md:-right-49 lg:-right-49 lg:-top-4"}/>} 
      
        {children}
      </div>
      
    </div>
  );
}

export default Modal;
