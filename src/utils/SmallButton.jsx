function SmallButton({ label, onClick, w, bg }) {
  return (
    <div>
      <button
        className={`w-${w} h-10 border-1 border-[#fff] bg-emerald-400 text-lg text-[#183a1f]  opacity-80  rounded font-bold capitalize p-0.5 px-1 shadow0.5 hover:bg-[#008000] hover:text-[#fff] active:text-[#fff] active:bg-[#008000] `}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
}

export default SmallButton;
