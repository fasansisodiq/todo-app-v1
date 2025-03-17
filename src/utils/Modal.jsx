
function Modal({openModal,bg, onClose, children}) {  
  return (
    <div  className={`abslute inset-0 flex justify-center items-center transition-colors ${openModal ? `visible bg-${bg}/10` : "invisible"}`}>
      <div onClick={(e)=>e.stopPropagation()} className={` shadow-lg rounded-xl transition-all ${openModal ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>{children}</div>
    </div>
  )
}

export default Modal
