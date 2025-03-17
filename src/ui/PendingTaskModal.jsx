import AlertingModal from "../utils/AlertingModal"
import CustomButton from "../utils/CustomButton"


function PendingTaskModal({tittle, icon}) {
  return (
     <AlertingModal
tittle={tittle}
iconColor={'text-yellow-500 '}
// animation={' animate-ping'}
modalMessage={'You want to mark this task pending?'}
icon={icon}
    >
   <CustomButton size={'sm'} type={'secondary'} label={"no"}/>
    <CustomButton size={'sm'} type={'others'} bg={'bg-yellow-500 '} label={"yes"}/>
    </AlertingModal>
  )
}

export default PendingTaskModal
