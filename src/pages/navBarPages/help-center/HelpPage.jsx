import { useState } from "react";
import Search from "../../../utils/Search";
import FAQ from "./FAQ";
import { FiMail, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Handle search submit (optional: can be used for analytics or focus)
  const handleSearch = (e) => {
    e.preventDefault();
    // Optionally, you can scroll to FAQ section or highlight results here
  };

  return (
    <div className="w-full flex flex-col pt-6 px-4 max-w-3xl mx-auto">
      <h1 className="self-center pb-4 text-2xl font-bold text-emerald-800">
        Help Center
      </h1>
      <div className="self-center w-full max-w-md mb-6">
        <Search
          placeholder="Search help articles, how-tos, or keywords..."
          value={searchQuery}
          handleSearch={handleSearch}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2 text-emerald-700">
          Frequently Asked Questions
        </h2>
        <FAQ searchQuery={searchQuery} />
      </section>
      <section className="bg-emerald-50 rounded-lg p-4 flex flex-col items-center">
        <h3 className="font-semibold mb-1 text-emerald-700">Need more help?</h3>
        <p className="text-sm mb-2 text-gray-700">
          If you can't find your answer in the FAQ, reach out to our support
          team.
        </p>
        <a
          href="mailto:todoprosuput@gmail.com"
          className="flex items-center gap-2 text-emerald-800 underline font-medium mb-1"
        >
          <FiMail /> Email: todoprosuput@gmail.com
        </a>
        <a
          href="https://wa.me/2349036115780"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-emerald-800 underline font-medium mb-1"
        >
          <FaWhatsapp /> WhatsApp: 09036115780
        </a>
        <span className="flex items-center gap-2 text-emerald-800 font-medium">
          <FiPhone />
          Phone:{" "}
          <a href="tel:09036115780" className="underline">
            09036115780
          </a>
        </span>
      </section>
    </div>
  );
}

export default HelpPage;
