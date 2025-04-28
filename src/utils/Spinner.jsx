function Spinner() {
  return (
    <div id="spinner-container" className="space-y-10">
      <div className="flex justify-center">
        <div className="w-20 h-20 border-10 border-emerald-500 border-t-transparent rounded-full  animate-spin"></div>
      </div>
    </div>
  );
}

export default Spinner;
