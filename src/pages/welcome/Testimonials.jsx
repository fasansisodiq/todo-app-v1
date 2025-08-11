import { FaAngleRight, FaQuoteLeft } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa6";

// Testimonials
const testimonials = [
  {
    name: "Jane Doe",
    quote:
      "todopro has completely changed how I organize my day. It's simple, beautiful, and powerful!",
    role: "Product Designer",
  },
  {
    name: "Alex Smith",
    quote:
      "The stats and reporting features help me stay on top of my goals. Highly recommended!",
    role: "Freelancer",
  },
  {
    name: "Maria Garcia",
    quote:
      "I love the real-time sync and mobile-friendly design. My tasks are always with me.",
    role: "Project Manager",
  },
];

function Testimonials() {
  return (
    <div className="w-full my-6">
      <h3 className="text-lg lg:text-xl font-bold text-emerald-700 mb-4 text-center">
        What our users say
      </h3>
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <FaAngleLeft />
        <>
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white border border-emerald-100 rounded-xl shadow p-4 w-64"
            >
              <span className="text-emerald-200">
                <FaQuoteLeft />
              </span>
              <div className="italic text-slate-600 text-center mb-2">
                &quot;{t.quote}&quot;
              </div>
              <div className="font-bold text-emerald-700">{t.name}</div>
              <div className="text-xs text-slate-400">{t.role}</div>
            </div>
          ))}
        </>
        <FaAngleRight />
      </div>
    </div>
  );
}

export default Testimonials;
