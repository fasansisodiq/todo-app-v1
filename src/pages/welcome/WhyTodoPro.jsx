const texts = [
  { icon: "🔒", label: "Secure & Private" },
  { icon: "⚡", label: "Real-time Sync" },
  { icon: "📱", label: "Mobile Friendly" },
  { icon: "🌙", label: "Dark Mode Ready" },
  { icon: "🆓", label: "Free to Use" },
];

function WhyTodoPro() {
  return (
    <div className="w-full mt-6 mb-4 flex flex-col items-center">
      <h2 className="text-lg lg:text-2xl font-bold text-emerald-700 mb-2">
        Why Choose <span className="text-green-700">todopro</span>?
      </h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {texts.map((item, idx) => (
          <span
            key={idx}
            className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-semibold text-sm shadow"
          >
            <span>{item.icon}</span>
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default WhyTodoPro;
