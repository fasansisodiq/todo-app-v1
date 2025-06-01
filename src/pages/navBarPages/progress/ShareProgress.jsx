import { FaShareAlt, FaDownload } from "react-icons/fa";
import ShareProgressBtn from "./ShareProgressBtn";
import { useState } from "react";
import { saveAs } from "file-saver";
import { BlobProvider } from "@react-pdf/renderer";
import ProgressPage from "./ProgressPage";
import generatePDF, { usePDF } from "react-to-pdf";

function ShareProgress({ onExport }) {
  const [share, setShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const url = window.location.href;
  const { toPDF } = usePDF({ filename: "progress.pdf" });
  // Clipboard functionality
  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setShare(!share);
      if (share == false) {
        setCopied(true);
        alert("progress link copied!");
      } else {
        setCopied(false);
        alert("progress link copying canceled!");
      }
    });
  };
  const handleShare = () => {
    setShare(!share);
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          url: url,
        })
        .then(() => setCopied(true))
        .catch((error) => console.log("Error sharing", error));
    } else {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setCopied(false);
          alert("URL copied to clipboard!");
        })
        .catch((error) => console.error("Could not copy URL", error));
    }
  };
  const handleExportAsPdf = (blob) => {
    saveAs(blob, `progress.pdf`);
    window.location.href = `mailto:?subject=${encodeURIComponent(
      `Progress`
    )}&body=${encodeURIComponent(`Kindly find attached progress report`)}`;
  };
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center gap-4">
      <h2 className="text-lg font-bold text-emerald-700 mb-2 flex items-center gap-2">
        <FaShareAlt /> Share or Export Progress
      </h2>
      <div className="flex gap-4">
        <button
          onClick={onExport}
          // onClick={() => generatePDF(targetRef, { filename: "progress.pdf" })}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
        >
          <FaDownload /> Export as PDF
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-semibold px-4 py-2 rounded-lg shadow transition"
        >
          <FaShareAlt /> Share Link
        </button>
        {/* <>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-semibold px-4 py-2 rounded-lg shadow transition"
          >
            <FaShareAlt /> Share Link
          </button>
          {share && copied && <ShareProgressBtn share={share} url={url} />}
        </> */}
      </div>
    </div>
  );
}

export default ShareProgress;
