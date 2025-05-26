function Gif() {
  return (
    <div className="w-full flex justify-center my-4">
      <img
        src="/demo-todopro.png"
        alt="todopro demo screenshot"
        className="rounded-xl shadow-lg border border-emerald-100 max-w-xs sm:max-w-md"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}

export default Gif;
