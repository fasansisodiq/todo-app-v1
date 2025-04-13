import Table from "../../utils/Table";
function TableHeader() {
  return (
    <div className="text-stone-900 font-bold ">
      <Table bg={"bg-white"} col={8} className={" py-2"}>
        <span>s/n</span>
        <span className="pr-2">tittle</span>
        <span>assignee</span>
        <span className="pl-4">due-date</span>
        <span className="pl-6">task-class</span>
        <span className="pl-7">priority</span>
        <span className="pl-1">completed</span>
      </Table>
    </div>
  );
}

export default TableHeader;
