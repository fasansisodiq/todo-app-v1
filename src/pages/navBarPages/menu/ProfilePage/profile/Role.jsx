import React from "react";
import { useAuth } from "../../../../../authentication/useAuth";

const roles = [
  { value: "user", label: "User" },
  { value: "manager", label: "Manager" },
  { value: "admin", label: "Admin" },
];

function Role() {
  const { role, setRole } = useAuth();

  return (
    <div className="w-full">
      <label
        htmlFor="role"
        className="block mb-1 text-emerald-700 font-semibold capitalize"
      >
        Role
      </label>
      <select
        id="role"
        name="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full rounded-lg border border-emerald-200 focus:border-emerald-500 focus:ring-emerald-100 px-4 py-2 text-base transition-all shadow-sm bg-white"
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
