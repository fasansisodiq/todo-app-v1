import Table from "../utils/Table";
function TableHeader() {
  return (
    <div className="text-stone-900 font-bold">
      <Table bg={"bg-slate-100"}>
        <span>s/n</span>
        <span>tittle</span>
        <span>assignee</span>
        <span>due-date</span>
        <span className="">task-class</span>
        <span>priority</span>
        {/* <span>description</span> */}
      </Table>
    </div>
  );
}

export default TableHeader;
