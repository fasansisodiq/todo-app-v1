
function ChildModal({modal, show, showNextModal, setShowNextModal, childModal, mClassName}) {
  
      
  //  const muteOnMouseEnter = useEffect(()=>{
  //     const interval = setInterval(()=>{() => !show && setShowNextModal(true)}, 1000)
  //     return clearInterval(interval);
  //   }, [!show])  
  return (
    <div className="md:w-fit md:h-fit md:p-1 md:relative md:cursor-pointer " onMouseEnter={() => !show && setShowNextModal(true)}
          onMouseLeave={() => setShowNextModal(false)}>
           {modal}  
       {showNextModal && (
            <span className={`
             md:absolute md:flex justify-center items-center xl:top-28 xl:-right-81  z-40  ${mClassName}`
             }>
              {childModal}
            </span>
          )}
    </div>
  )
}

export default ChildModal
