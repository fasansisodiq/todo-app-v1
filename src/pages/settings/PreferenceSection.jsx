import PreferenceSectionItem from "./utils/PreferenceSectionItem";
import { useNotifications } from "../../customHooks/notification/useNotifications";
import { useDarkMode } from "../../customHooks/DarkModeContext";

function PreferenceSection() {
  const { enableNotifications, setEnableNotifications } = useNotifications();
  const { darkMode, setDarkMode } = useDarkMode();

  const preferences = [
    {
      label: "Enable dark mode",
      checked: darkMode,
      onChange: () => setDarkMode(!darkMode),
    },
    {
      label: "Enable notifications",
      checked: enableNotifications,
      onChange: () => setEnableNotifications(!enableNotifications),
    },
    { label: "Receive weekly summaries", checked: false, onChange: () => {} },
    { label: "Allow location access", checked: false, onChange: () => {} },
    { label: "Enable email reminders", checked: false, onChange: () => {} },
    { label: "Sync with calendar", checked: false, onChange: () => {} },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-slate-700 dark:text-yellow-300/70">
        Preferences
      </h2>
      <div className="flex flex-col gap-3">
        {preferences.map((pref, index) => (
          <PreferenceSectionItem
            key={index}
            label={pref.label}
            checked={pref.checked}
            onChange={pref.onChange}
          />
        ))}
      </div>
    </div>
  );
}

export default PreferenceSection;
