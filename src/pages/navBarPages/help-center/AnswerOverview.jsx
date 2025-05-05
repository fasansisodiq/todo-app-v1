import DeleteTaskAns from "./DeleteTaskAns";
import NewTaskAns from "./NewTaskAns";

function AnswerOverview({ showAnswer }) {
  return (
    <div className="w-fit h-fit bg-white sm:mr-2 flex items-center justify-center">
      {showAnswer && <NewTaskAns />}
      {showAnswer && <DeleteTaskAns />}
    </div>
  );
}

export default AnswerOverview;
