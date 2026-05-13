import { useState } from "react";
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
  {
    name: " damilola amosun",
    quote:
      "The real-time update are life saver. I can see exactly when a  teammate comletes a task or leaves a comments and feedback directly on the task cards keeps all our context in one place ",
    role: "back-end developer",
  },
  {
    name: "fasansi sodiq",
    quote:
      "I love the real-time sync and mobile-friendly design. My tasks are always with me.",
    role: "front-end developer",
  },
];

function Testimonials() {
  const [startIndex, setStartIndex] = useState(0);

  //show only 3 testimonials at a time
  const visibleTestimonials = testimonials.slice(startIndex, startIndex + 3);

  //function to show next testimonial
  const handleNext = () => {
    //only move forward if there is atleast one or more testimonials
    if (startIndex + 3 < testimonials.length) {
      setStartIndex((prev) => prev + 1);
    }
  };

  //function to show previous testimonial
  const handlePrevious = () => {
    //only move back if we aren't at the very beginning
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full my-6">
      <h3 className="text-lg lg:text-xl font-bold text-emerald-700 mb-4 text-center">
        What our users say
      </h3>
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        {startIndex > 0 && <FaAngleLeft onClick={handlePrevious} />}

        <>
          {visibleTestimonials.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white border border-emerald-100 rounded-xl shadow p-4 w-64"
            >
              <div className="italic text-slate-600 text-center mb-2">
                &quot;{t.quote}&quot;
              </div>
              <div className="font-bold text-emerald-700 capitalize">
                {t.name}
              </div>
              <div className="text-xs text-slate-400 capitalize">{t.role}</div>
            </div>
          ))}
        </>
        {startIndex + 3 < testimonials.length && (
          <FaAngleRight onClick={handleNext} />
        )}
      </div>
    </div>
  );
}

export default Testimonials;
