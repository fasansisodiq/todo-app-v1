
import PageNavigator from "./PageNavigator";
import DisplayHoverMessage from "./DisplayHoverMessage";
function TodoNavigator({element, message, mClassName, to}){
    
  return (
    <PageNavigator to={to} activeClassName={"flex justify-center items-center "}>
      <DisplayHoverMessage  element={element} message={message} mClassName={mClassName}/>
</PageNavigator>
  )
}

export default TodoNavigator
