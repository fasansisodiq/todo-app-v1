import AlertingModal from "../utils/AlertingModal"
import CustomButton from "../utils/CustomButton"


function CompletedTaskModal({tittle, icon}) {
  return (
    <AlertingModal
tittle={tittle}
iconColor={'text-emerald-700 '}
// animation={' animate-ping'}
modalMessage={'want to mark this task completed?'}
icon={icon}
    >
   <CustomButton size={'sm'} type={'secondary'} label={"no"}/>
    <CustomButton size={'sm'} type={'primary'} label={"yes"}/>
    </AlertingModal>
  )
}

export default CompletedTaskModal
