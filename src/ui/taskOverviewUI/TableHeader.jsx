import Table from "../../utils/Table";

function TableHeader({ height }) {
  return (
    <div className=" w-full bg-white dark:bg-[#232b25] ">
      <Table
        // type="header"
        bg="bg-white dark:bg-[#232b25]"
        className={`py-2  font-semibold lg:text-xl  `}
        height={height}
      >
        <div className="w-full flex justify-between normal-case text-gray-400 dark:text-yellow-50 dark:opacity-40  dark:bg-[#232b25]">
          <span>Name</span>
          <span>Due date</span>
          <span>Priority</span>
        </div>
      </Table>
    </div>
  );
}

export default TableHeader;
