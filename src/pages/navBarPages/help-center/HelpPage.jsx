import Search from "../../../utils/Search";
import FAQ from "./FAQ";

function HelpPage() {
  return (
    <div className=" w-full flex flex-col pt-3  justify-between items-start">
      <h1 className="self-center pb-2 lg:text-xl">How can we help ?</h1>
      <div className="self-center text-center p-2 pb-4 w-full">
        <Search placeholder={"Search how-tos and more..."} />
      </div>
      <div className=" flex-col lg:flex  justify-between ">
        <FAQ />
        <div className="flex justify-center w-fit text-[0.7rem]  gap-2">
          <span>need more help?</span>
          <span>contact us</span>
        </div>
      </div>
    </div>
  );
}

export default HelpPage;
