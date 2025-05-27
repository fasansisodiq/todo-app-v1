import { FaShareAlt, FaDownload } from "react-icons/fa";
import ShareProgressBtn from "./ShareProgressBtn";

function ShareProgress({ onExport, onShare }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center gap-4">
      <h2 className="text-lg font-bold text-emerald-700 mb-2 flex items-center gap-2">
        <FaShareAlt /> Share or Export Progress
      </h2>
      <div className="flex gap-4">
        <button
          onClick={onExport}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
        >
          <FaDownload /> Export as PDF
        </button>
        <ShareProgressBtn
          onClick={onShare}
          className="flex items-center gap-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-semibold px-4 py-2 rounded-lg shadow transition"
        >
          <FaShareAlt /> Share Link
        </ShareProgressBtn>
      </div>
    </div>
  );
}

export default ShareProgress;
