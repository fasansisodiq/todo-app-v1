import Table from "../../utils/Table";

const columns = [
  { label: "s/n" },
  { label: "title", className: "pr-2" },
  { label: "assignee" },
  { label: "due-date", className: "pl-4" },
  { label: "task-class", className: "pl-6" },
  { label: "priority", className: "pl-7" },
  { label: "completed", className: "pl-1" },
];

function TableHeader({ height, width }) {
  return (
    <div className=" w-full bg-white">
      <Table
        type="header"
        bg="bg-white"
        col={columns.length}
        className={`py-2  font-semibold lg:text-xl ${
          width ? width : "lg:w-[78%]"
        } `}
        height={height}
      >
        {columns.map((col) => (
          <span key={col.label} className={col.className || ""}>
            {col.label}
          </span>
        ))}
      </Table>
    </div>
  );
}

export default TableHeader;
