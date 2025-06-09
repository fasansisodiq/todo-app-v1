import AccountSection from "./AccountSection";
import PreferenceSection from "./PreferenceSection";
import ProfileSection from "./ProfileSection";

function SettingsPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-white to-emerald-100 dark:from-[#232b25] dark:via-[#181f1b] dark:to-[#232b25] flex flex-col items-center py-10 px-2">
      <section className="w-full max-w-2xl bg-white/90 dark:bg-[#232b25]   rounded-2xl shadow-2xl border border-emerald-100 p-8 flex flex-col gap-8">
        <header className="mb-4">
          <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 tracking-wide text-center">
            Settings
          </h1>
          <p className="text-slate-500 dark:text-yellow-200 text-base md:text-lg mt-2 text-center">
            Manage your preferences, notifications, and account.
          </p>
        </header>

        {/* Profile Section */}
        <ProfileSection />

        {/* Preferences Section */}
        <PreferenceSection />

        {/* Account Section */}
        <AccountSection />
      </section>
    </div>
  );
}

export default SettingsPage;
// This code defines a SettingsPage component that renders a settings page with sections for profile, preferences, and account management.
// It uses Tailwind CSS for styling and includes a header with a title and description. Each section is styled with appropriate margins, padding, and background colors to create a clean and user-friendly interface.
