import { FcBarChart, FcCheckmark, FcCollaboration } from "react-icons/fc";
import { BsBell, BsFilter } from "react-icons/bs";
import { MdEdit, MdSecurity } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
// Feature list
const texts = [
  {
    icon: <MdEdit />,
    text: "Add, edit,trash, and delete tasks: You can add new tasks, edit existing tasks, and remove tasks.",
  },
  {
    icon: <FcCheckmark />,
    text: "Mark tasks as completed or pending: You can mark tasks as completed or pending without deleting them.",
  },
  {
    icon: <BsFilter />,
    text: "Filter tasks:Tasks are filtered into different categories. Quickly find tasks by status, due date, or assignee.",
  },
  {
    icon: <FcBarChart />,
    text: "Statistics: Visualize your productivity with real-time stats.",
  },
  {
    icon: <TbReportAnalytics />,
    text: "Reporting: Get insightful reports on your time and productivity with real-time tracking and reporting.",
  },
  {
    icon: <MdSecurity />,
    text: "Robust security and user access management:Focus on managing your tasks and projects, protect your data and control access with confidence.",
  },
  {
    icon: <FcCollaboration />,
    text: "Robust collaboration : Work more effectively and seamlessly with your team, achieve goals and drive success in real-time.",
  },
  {
    icon: <BsBell />,
    text: "Reminders  : Stay organized, focused and ensure you never miss a deadline.",
  },
];

function FeatureList() {
  return (
    <ol className="text-base px-6 list-none text-slate-700 space-y-2 mb-6">
      {texts.map(({ icon, text }, idx) => {
        const [title, ...descArr] = text.split(":");
        const desc = descArr.join(":").trim();
        return (
          <li key={idx} className="flex items-start gap-2">
            <span className=" text-emerald-800 text-lg mr-2 mt-1">{icon}</span>
            <span>
              <span className="font-bold text-emerald-600">{title}</span>
              {desc && (
                <span>
                  {": "}
                  {desc}
                </span>
              )}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export default FeatureList;
