import Table from "../../utils/Table";

function TableHeader({ height }) {
  return (
    <div className=" w-full bg-white ">
      <Table
        // type="header"
        bg="bg-white"
        className={`py-2  font-semibold lg:text-xl  `}
        height={height}
      >
        <div className="w-full flex justify-between normal-case text-gray-400">
          <span>Name</span>
          <span>Due date</span>
          <span>Priority</span>
          {/* <span className="flex gap-2 sm:gap-10 lg:gap-18 lg:pr-26 sm:pr-14 ">
            <span>Due date</span>
            <span>Priority</span>
          </span> */}
        </div>
      </Table>
    </div>
  );
}

export default TableHeader;
