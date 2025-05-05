import { useState } from "react";
import Draggable from "react-draggable";

const faqs = [
  { header: "general usage & Management:" },
  {
    id: 1,
    question: "How do I create a new task/list?",
    answer:
      "To create a new task or list, click on the '➕' button and fill in the details.",
  },
  {
    id: 2,
    question: "How do I delete a task or list?",
    answer:
      "To delete a task or list, select it and click on the ' ••• ', then click on 'Delete' button.",
  },
  {
    id: 3,
    question: "How do I move or reorder tasks?",
    answer:
      "To move or reorder tasks, click and drag the task to the desired position.",
  },
  {
    id: 4,
    question: "Can I set due dates or reminders?",
    answer:
      "Yes, you can set due dates and reminders for tasks in the task details.",
  },
  {
    id: 5,
    question: "How do I mark a task as complete?",
    answer:
      "To mark a task as complete, select it and click on the ' ••• ', then click on 'mark as completed' button..",
  },
  {
    id: 6,
    question: "Can I prioritize tasks?",
    answer:
      "Yes, you can prioritize tasks by checking the priority box while adding it as new task.",
  },
  { header: "sharing and collaboration:" },
  {
    id: 7,
    question: "How do I share a list with someone else?",
    answer:
      "To share a list, click on the 'Share' button and enter the email address of the person you want to share it with.",
  },
  {
    id: 8,
    question: "Can multiple people edit a shared list?",
    answer: "Yes, multiple people can edit a shared list simultaneously.",
  },
  {
    id: 9,
    question: "How can I delegate tasks to others?",
    answer:
      "To delegate tasks, assign them to specific users in the task details while adding it as new task.",
  },
  { header: "Features and Customization:" },
  {
    id: 10,
    question: "What are the different list types?",
    answer:
      "The app supports various list types, including planned lists, social lists, and project lists e.t.c.",
  },
  {
    id: 11,
    question: "Can I create sublists?",
    answer:
      "Yes, you can create sublists within a main list for better organization.",
  },
  {
    id: 12,
    question: "How do I set up recurring tasks?",
    answer:
      "To set up recurring tasks, select the task and choose the recurrence option in the task details.",
  },
  {
    id: 13,
    question: "Can I filter my lists?",
    answer:
      "Yes, you can filter your lists based on due dates, priority levels, and other criteria.",
  },
  {
    id: 14,
    question: "How do I manage notifications?",
    answer:
      "You can manage notifications in the app settings under 'Notifications'.",
  },
  {
    id: 15,
    question: "Can I import or export my data?",
    answer:
      "Yes, you can import and export your data in various formats from the settings menu.",
  },
  { header: "Troubleshooting:" },
  {
    id: 16,
    question: "What if I can't find a task?",
    answer:
      "If you can't find a task, try using the search function or check your trashed tasks.",
  },
  {
    id: 17,
    question: "What if a task disappears?",
    answer:
      "If a task disappears, check your trash or archived tasks to see if it was accidentally deleted.",
  },
  {
    id: 18,
    question: "How do I fix a problem with syncing my list?",
    answer:
      "To fix syncing issues, try refreshing the app or checking your internet connection.",
  },
];
function FAQ() {
  const [showMore, setShowMore] = useState(false);
  const [hide, setHide] = useState(true);
  const [showAnswer, setShowAnswer] = useState(null);

  function handleSeeMore() {
    setShowMore(true);
    setHide(!hide);
  }
  function handleSeeLess() {
    setShowMore(false);
    setHide(!hide);
  }

  function toggleAnswer(id) {
    setShowAnswer(id === showAnswer ? null : id);
  }
  return (
    <div className=" bg-whites w-full flex flex-col sm:grid grid-cols-2 grid-rows-4 justify-between items-start">
      <div className=" w-fit h-fit py-1 pb-4  px-4 sm bg-white rounded-lg shadow-lg">
        <div>FAQs:</div>
        <ul className="text-[0.8rem] md:text-[0.9rem] lg:text-lg ">
          {faqs.map((faq, idx) => (
            <li key={idx}>
              <header className="font-semibold capitalize">{faq.header}</header>
              <div
                className={`px-2 ${
                  showAnswer === faq.id
                    ? "bg-emerald-600 text-white "
                    : "hover:bg-emerald-200 "
                } cursor-pointer text-blue-900  sm:text-[0.7rem] md:text-[0.8rem] lg:text-lg       
      `}
                onClick={() => toggleAnswer(faq.id)}
              >
                {faq.question}
              </div>

              {showAnswer === faq.id && (
                <div className="text-[0.8rem] lg:text-lg px-2  w-full h-fit border-2 p-2 border-emerald-400 rounded-lg shadow-lg bg-white m-1 sm:text-[0.7rem] md:text-[0.8rem] ">
                  {faq.answer}
                </div>
              )}
            </li>
          ))}
        </ul>
        {/* <Draggable>
          <div>i can drag easily</div>
        </Draggable> */}
        <div
          onClick={handleSeeLess}
          className=" text-center cursor-pointer normal-case"
        >
          {!hide && <>see less...</>}
        </div>
      </div>
    </div>
  );
}

export default FAQ;
{
  /* <div>general usage & Management</div>;
<ul className="text-[0.8rem] ">
          {faqs.map((faq) => (
            <li key={faq.id}>
              <header>{faq.header}</header>
              <FAQStyle>{faq.question}</FAQStyle>
            </li>
          ))}
          <li>
            <FAQStyle setShowAnswer={setShowAnswer} id={1}>
              How do I create a new task/list?
            </FAQStyle>
          </li>
          <li>
            <FAQStyle setShowAnswer={setShowAnswer} id={2}>
              How do I delete a task or list?
            </FAQStyle>
          </li>
          <li>
            <FAQStyle>How do I move or reorder tasks?</FAQStyle>
          </li>
          <li>
            <FAQStyle>Can I set due dates or reminders?</FAQStyle>
          </li>
          <li>
            <FAQStyle>How do I mark a task as complete?</FAQStyle>
          </li>
          <li>
            <FAQStyle>Can I prioritize tasks?</FAQStyle>
          </li>
        </ul>
        <div>Sharing and Collaboration:</div>
        <ul className="text-[0.8rem] ">
          <li>
            <FAQStyle> How do I share a list with someone else?</FAQStyle>
          </li>
          <li>
            <FAQStyle>Can multiple people edit a shared list?</FAQStyle>
          </li>
          <li>
            <FAQStyle>How can I delegate tasks to others?</FAQStyle>
          </li>
        </ul>
        <div
          onClick={handleSeeMore}
          className=" text-center normal-case cursor-pointer pt-1"
        >
          {hide && <>see more...</>}
        </div>
        {showMore && (
          <>
            <div>Features and Customization:</div>
            <ul className="text-[0.8rem] ">
              <li>
                <FAQStyle>What are the different list types ?</FAQStyle>
              </li>
              <li>
                <FAQStyle>Can I create sublists?</FAQStyle>
              </li>
              <li>
                <FAQStyle>How do I set up recurring tasks?</FAQStyle>
              </li>
              <li>
                <FAQStyle>Can I filter my lists?</FAQStyle>
              </li>
              <li>
                <FAQStyle>How do I manage notifications?</FAQStyle>
              </li>
              <li>
                <FAQStyle>Can I import or export my data?</FAQStyle>
              </li>
            </ul>
            <div>Troubleshooting:</div>
            <ul className="text-[0.8rem] ">
              <li>
                <FAQStyle>What if I can't find a task?</FAQStyle>
              </li>
              <li>
                <FAQStyle>What if a task disappears?</FAQStyle>
              </li>
              <li>
                <FAQStyle>
                  How do I fix a problem with syncing my list?
                </FAQStyle>
              </li>
            </ul>
          </> */
}
