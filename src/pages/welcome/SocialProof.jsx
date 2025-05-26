// Social proof (trusted by)
const socialProof = [
  { logo: "🌍", label: "10,000+ users worldwide" },
  { logo: "🏆", label: "4.9/5 average rating" },
  { logo: "💼", label: "Used by teams & individuals" },
];

function SocialProof() {
  return (
    <div className="w-full flex flex-wrap gap-4 justify-center items-center my-4">
      {socialProof.map((item, idx) => (
        <span
          key={idx}
          className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-semibold text-sm shadow"
        >
          <span className="text-lg">{item.logo}</span>
          {item.label}
        </span>
      ))}
    </div>
  );
}

export default SocialProof;
