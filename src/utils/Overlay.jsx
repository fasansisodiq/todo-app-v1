function Overlay({ isOpen, onClose, children }) {
  return (
    <div className={`block ${isOpen ? "backdrop-blur  bg-slate-200/30 " : ""}`}>
      <div> {children}</div>
    </div>
  );
}

export default Overlay;
