import { FcCheckmark, FcTodoList } from "react-icons/fc";
import { MdEdit } from "react-icons/md";

// How it works steps
const steps = [
  {
    icon: <FcTodoList className="text-2xl" />,
    title: "Sign Up",
    desc: "Create your free todopro account in seconds.",
  },
  {
    icon: <MdEdit className="text-emerald-500 text-2xl" />,
    title: "Add Tasks",
    desc: "Quickly add, organize, and prioritize your tasks.",
  },
  {
    icon: <FcCheckmark className="text-2xl" />,
    title: "Stay Productive",
    desc: "Track progress, complete tasks, and achieve your goals!",
  },
];

function HowItWorks() {
  return (
    <div className="w-full my-6 flex flex-col items-center">
      <h3 className="text-lg lg:text-xl font-bold text-emerald-700 mb-4">
        How it works
      </h3>
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-emerald-50 border border-emerald-100 rounded-xl shadow p-4 w-56"
          >
            <div className="mb-2">{step.icon}</div>
            <div className="font-bold text-emerald-700 text-base mb-1">{`${
              idx + 1
            }. ${step.title}`}</div>
            <div className="text-slate-600 text-sm text-center">
              {step.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default HowItWorks;
