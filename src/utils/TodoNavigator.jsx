import PageNavigator from "./PageNavigator";
import DisplayHoverMessage from "./DisplayHoverMessage";
function TodoNavigator({ element, message, mClassName, to }) {
  return (
    <div className=" flex justify-center items-center">
      <PageNavigator
        to={to}
        activeClassName={"flex justify-center items-center "}
        notActiveClassName={" hover:px-0.5 px-0.5 pb-1 hover:pb-1"}
      >
        <DisplayHoverMessage
          element={element}
          message={message}
          mClassName={mClassName}
        />
      </PageNavigator>
    </div>
  );
}

export default TodoNavigator;
