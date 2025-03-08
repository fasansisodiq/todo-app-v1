import { CiBellOn } from "react-icons/ci"


function NotificationBell() {
  return (
    <div className="relative flex size-3">
        <CiBellOn/>
        <div className="absolute left-93 top-25">
            <span className="relative flex size-3 top-[-30]">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-700 opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
            </span>
      </div>
    </div>
   
  )
}

export default NotificationBell
