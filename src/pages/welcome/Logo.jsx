import { FaCheckCircle } from "react-icons/fa";

function Logo({ size = 40 }) {
  return (
    <span
      className="flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 via-emerald-600 to-emerald-700 shadow-lg"
      style={{ width: size, height: size }}
    >
      <FaCheckCircle className="text-white" size={size * 0.7} />
      <span className="sr-only">todopro logo</span>
    </span>
  );
}

export default Logo;
