import {
  FaShareAlt,
  FaDownload,
  FaWhatsapp,
  FaEnvelope,
  FaUserFriends,
} from "react-icons/fa";
import { useState } from "react";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";

// Helper to generate a PDF Blob from a DOM node using jsPDF and html-to-image
const getPdfBlobUrl = async (pdfRef) => {
  if (!pdfRef?.current) throw new Error("Unable to get the target element");
  // Hide elements to exclude
  const excluded = pdfRef.current.querySelectorAll(".exclude-from-pdf");
  const prevDisplay = [];
  excluded.forEach((el, i) => {
    prevDisplay[i] = el.style.display;
    el.style.display = "none";
  });

  // Generate image from the visible DOM
  const imgData = await toPng(pdfRef.current, { cacheBust: true });

  // Restore excluded elements
  excluded.forEach((el, i) => {
    el.style.display = prevDisplay[i];
  });
  // Create an image to get width/height
  const img = new window.Image();
  img.src = imgData;
  await new Promise((resolve) => (img.onload = resolve));
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: [img.width, img.height],
  });
  pdf.addImage(imgData, "PNG", 0, 0, img.width, img.height);
  const blob = pdf.output("blob");
  return URL.createObjectURL(blob);
};

function ShareProgress({ setShow, pdfRef, userList = [] }) {
  const [copied, setCopied] = useState(false);
  const [showInAppShare, setShowInAppShare] = useState(false);
  const url = window.location.href;
  function onExport() {
    () => setShow(false);
    // This function is passed as a prop to handle exporting the PDF
    getPdfBlobUrl(pdfRef)
      .then((pdfUrl) => {
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = "progress.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        console.error("Error generating PDF:", err);
        alert("Unable to generate PDF for export.");
      });
  }
  // Share PDF via WhatsApp (as a link to download the PDF)
  const handleShareWhatsApp = async () => {
    try {
      const pdfUrl = await getPdfBlobUrl(pdfRef);
      const text = encodeURIComponent(
        `Check out my progress on TodoPro!\n\nDownload PDF: ${pdfUrl}`
      );
      window.open(`https://wa.me/?text=${text}`, "_blank");
    } catch (err) {
      console.log(err);
      alert("Unable to generate PDF for sharing.");
    }
  };

  // Share PDF via Email (as an attachment link)
  const handleShareEmail = async () => {
    try {
      const pdfUrl = await getPdfBlobUrl(pdfRef);
      const subject = encodeURIComponent("My TodoPro Progress");
      const body = encodeURIComponent(
        `Check out my progress on TodoPro!\n\nDownload PDF: ${pdfUrl}`
      );
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    } catch (err) {
      alert("Unable to generate PDF for sharing.");
      console.log(err);
    }
  };

  // In-app share (simulate sending to another user)
  const handleInAppShare = (recipient) => {
    alert(`Progress shared with ${recipient}!`);
    setShowInAppShare(false);
  };

  // Native share (if supported)
  const handleNativeShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "My TodoPro Progress",
          url,
        })
        .then(() => setCopied(true))
        .catch((error) => console.log("Error sharing", error));
    } else {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setCopied(true);
          alert("URL copied to clipboard!");
        })
        .catch((error) => console.error("Could not copy URL", error));
    }
  };

  return (
    <div className="bg-white dark:bg-[#232b25] rounded-xl shadow p-6 flex flex-col items-center gap-4 transition-colors duration-300">
      <h2 className="text-lg font-bold text-emerald-700 dark:text-yellow-200 mb-2 flex items-center gap-2">
        <FaShareAlt /> Share or Export Progress
      </h2>

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={onExport}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-800 dark:hover:bg-emerald-900 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
        >
          <FaDownload /> Export as PDF
        </button>
        <button
          onClick={handleShareWhatsApp}
          className="flex items-center gap-2 bg-green-100 hover:bg-green-200 dark:bg-[#1f2e1f] dark:hover:bg-[#234d23] text-green-700 dark:text-green-300 font-semibold px-4 py-2 rounded-lg shadow transition"
        >
          <FaWhatsapp /> WhatsApp
        </button>
        <button
          onClick={handleShareEmail}
          className="flex items-center gap-2 bg-emerald-100 hover:bg-emerald-200 dark:bg-[#232b25] dark:hover:bg-[#181f1b] text-emerald-700 dark:text-yellow-200 font-semibold px-4 py-2 rounded-lg shadow transition"
        >
          <FaEnvelope /> Email
        </button>
        <button
          onClick={() => setShowInAppShare((s) => !s)}
          className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 dark:bg-[#232b35] dark:hover:bg-[#181f2b] text-blue-700 dark:text-blue-200 font-semibold px-4 py-2 rounded-lg shadow transition"
        >
          <FaUserFriends /> In-app Share
        </button>
        <button
          onClick={handleNativeShare}
          className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-[#232b25] dark:hover:bg-[#181f1b] text-slate-700 dark:text-yellow-200 font-semibold px-4 py-2 rounded-lg shadow transition"
        >
          <FaShareAlt /> System Share
        </button>
      </div>
      {/* In-app share dropdown */}
      {showInAppShare && (
        <div className="mt-4 w-full max-w-xs bg-white dark:bg-[#232b25] border border-emerald-100 dark:border-emerald-900 rounded-xl shadow p-4">
          <div className="mb-2 font-semibold text-emerald-700 dark:text-yellow-200">
            Share with a TodoPro user:
          </div>
          <ul className="flex flex-col gap-2">
            {userList.length === 0 && (
              <li className="text-slate-400 dark:text-yellow-400 text-sm">
                No users available
              </li>
            )}
            {userList.map((user) => (
              <li key={user.id}>
                <button
                  onClick={() => handleInAppShare(user.name)}
                  className="w-full text-left px-3 py-1 rounded bg-emerald-50 dark:bg-[#181f1b] hover:bg-emerald-100 dark:hover:bg-[#232b25] text-emerald-700 dark:text-yellow-200 transition"
                >
                  {user.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ShareProgress;
