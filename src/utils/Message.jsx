function Message({ msg, color }) {
  return <div className={`text-${color}-700 text-wrap`}>{msg}</div>;
}

export default Message;
