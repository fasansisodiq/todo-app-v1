// Testimonials
const testimonials = [
  {
    name: "Jane Doe",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "todopro has completely changed how I organize my day. It's simple, beautiful, and powerful!",
    role: "Product Designer",
  },
  {
    name: "Alex Smith",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "The stats and reporting features help me stay on top of my goals. Highly recommended!",
    role: "Freelancer",
  },
  {
    name: "Maria Garcia",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
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
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-white border border-emerald-100 rounded-xl shadow p-4 w-64"
          >
            <img
              src={t.avatar}
              alt={t.name}
              className="w-14 h-14 rounded-full mb-2 border-2 border-emerald-200 object-cover"
            />
            <div className="italic text-slate-600 text-center mb-2">
              &quot;{t.quote}&quot;
            </div>
            <div className="font-bold text-emerald-700">{t.name}</div>
            <div className="text-xs text-slate-400">{t.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
