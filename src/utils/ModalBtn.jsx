function ModalBtn({ children, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className=" flex  items-center gap-4 pl-10 hover:pl-10  w-60 h-6 hover:px-5 hover:bg-slate-200"
    >
      <span className="text-slate-700 ">{icon}</span>
      <span>{children}</span>
    </button>
  );
}

export default ModalBtn;
