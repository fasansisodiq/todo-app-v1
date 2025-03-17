import AlertingModal from "../utils/AlertingModal"
import CustomButton from "../utils/CustomButton"

function DeleteTaskModal({tittle, icon}) {
  return (
    <AlertingModal
tittle={tittle}
iconColor={'text-rose-600 '}
animation={' animate-ping'}
modalMessage={' Are you sure you want to delete this task?'}
icon={icon}
    >
   <CustomButton size={'sm'} type={'secondary'} label={"cancel"}/>
    <CustomButton size={'sm'} type={'others'} bg={'bg-red'} label={"delete"}/>
    </AlertingModal>
 
  )
}

export default DeleteTaskModal

