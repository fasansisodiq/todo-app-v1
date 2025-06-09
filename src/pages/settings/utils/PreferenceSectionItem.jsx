function PreferenceSectionItem({ label, onChange, checked }) {
  return (
    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        className="w-5 h-5 accent-emerald-600 dark:accent-yellow-500 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700 dark:focus:ring-yellow-500 rounded-lg"
        onChange={onChange}
        checked={checked}
        aria-label={`Toggle ${label}`}
        title={`Toggle ${label}`}
        id={`preference-${label.toLowerCase().replace(/\s+/g, "-")}`}
        name={`preference-${label.toLowerCase().replace(/\s+/g, "-")}`}
        value={label}
        aria-labelledby={`preference-${label
          .toLowerCase()
          .replace(/\s+/g, "-")}`}
      />
      <span className="text-slate-700 dark:text-yellow-50">{label}</span>
    </label>
  );
}

export default PreferenceSectionItem;
