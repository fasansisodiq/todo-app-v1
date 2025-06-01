import {
  WhatsappShareButton,
  EmailShareButton,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

const ShareProgressBtn = ({ share, url }) => {
  const title = "See progress, stats, and manage  tasks at a glance.";

  return (
    <>
      {share && (
        <section className="flex items-center gap-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-semibold px-4 py-2 rounded-lg shadow transition">
          <WhatsappShareButton url={url} quote={title}>
            <WhatsappIcon size={25} round />
          </WhatsappShareButton>
          <EmailShareButton url={url} title={title}>
            <EmailIcon size={25} round />
          </EmailShareButton>
        </section>
      )}
    </>
  );
};
export default ShareProgressBtn;
