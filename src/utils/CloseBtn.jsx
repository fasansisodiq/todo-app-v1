import DisplayHoverMessage from "./DisplayHoverMessage";

function CloseBtn({ btnPosition, mClassName, onClick, isOpen }) {
  return (
    <DisplayHoverMessage
      element={
        isOpen && (
          <button
            onClick={onClick}
            className={`absolute  px-2 flex justify-center items-center w-fit h-fit text-[1.7rem] sm:text-2xl md:text-3xl lg:text-4xl  font-semibold hover:text-red-600  ${btnPosition}  `}
          >
            &times;
          </button>
        )
      }
      message={"close"}
      mClassName={mClassName}
    />
  );
}

export default CloseBtn;
