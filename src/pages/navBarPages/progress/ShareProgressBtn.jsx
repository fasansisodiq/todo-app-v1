import {
  WhatsappShareButton,
  EmailShareButton,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

const ShareProgressBtn = () => {
  const url = window.location.href;
  const title = "See progress, stats, and manage  tasks at a glance.";
  return (
    <div>
      <WhatsappShareButton url={url} quote={title}>
        <WhatsappIcon size={25} round />
      </WhatsappShareButton>
      <EmailShareButton url={url} title={title}>
        <EmailIcon size={25} round />
      </EmailShareButton>
    </div>
  );
};
export default ShareProgressBtn;
