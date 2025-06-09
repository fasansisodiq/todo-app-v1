const roles = [
  { value: "user", label: "User" },
  { value: "manager", label: "Manager" },
  { value: "admin", label: "Admin" },
  { value: "team_leader", label: "Team Leader" },
  { value: "team_member", label: "Team Member" },
];

function Role({ value, onChange }) {
  return (
    <div className="w-full flex  gap-2 md:gap-4 items-center">
      <label
        htmlFor="role"
        className="block mb-1 text-emerald-700 dark:text-yellow-200 font-semibold capitalize"
      >
        Role
      </label>
      <select
        id="role"
        name="role"
        value={value}
        onChange={onChange}
        className="
          capitalize border-0 dark:border dark:border-yellow-100
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-100 dark:focus:ring-yellow-500
          p-1 lg:p-2 text-[0.9rem] sm:text-base md:text-sm lg:text-lg xl:text-lg rounded-2xl
          bg-white/90 dark:bg-[#232b25]/90 text-emerald-700 dark:text-yellow-100
          shadow transition-colors duration-200
        "
      >
        {roles.map((r) => (
          <option key={r.value} value={r.value}>
            {r.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Role;
