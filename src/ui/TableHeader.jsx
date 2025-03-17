import Table from "../utils/Table";
function TableHeader() {
  return (
    <div className="text-stone-900 font-bold ">
      <Table bg={"bg-white"} col={7} className={" py-2"}>
        <span>s/n</span>
        <span className="pr-2">tittle</span>
        <span>assignee</span>
        <span className="pl-4">due-date</span>
        <span className="pl-6">task-class</span>
        <span className="pl-7">priority</span>
      </Table>
    </div>
  );
}

export default TableHeader;
