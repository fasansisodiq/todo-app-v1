import Ui from "./Ui";

function ShowUi({ label, icon, showLabel, children, onClick }) {
  return (
    <div
      className={` ${
        showLabel &&
        " items-center  bg-gradient-to-br from-emerald-50 via-emerald-50 to-emerald-100 dark:from-[#232b25] dark:via-[#181f1b] dark:to-[#232b25] rounded-2xl shadow-2xl font-sans  border-emerald-100 dark:border-emerald-900 transition-colors duration-300 px-3"
      } `}
    >
      <Ui label={label} icon={icon} onClick={onClick} />
      <div className="mb-2">{children}</div>
    </div>
  );
}

export default ShowUi;
