import { useState } from "react";
import faqSections from "./faqSections";

function FAQ({ searchQuery = "" }) {
  const [showMore, setShowMore] = useState(false);
  const [openId, setOpenId] = useState(null);

  // Flatten all FAQs for filtering
  const allFaqs = faqSections.flatMap((section) =>
    section.faqs.map((faq) => ({ ...faq, section: section.header }))
  );

  // Filter by search query
  const filteredFaqs = searchQuery
    ? allFaqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allFaqs;

  const visibleFaqs =
    showMore || searchQuery ? filteredFaqs : filteredFaqs.slice(0, 6);

  // Group by section for rendering
  const groupedFaqs = visibleFaqs.reduce((acc, faq) => {
    if (!acc[faq.section]) acc[faq.section] = [];
    acc[faq.section].push(faq);
    return acc;
  }, {});

  return (
    <div className="w-full flex flex-col gap-4">
      {Object.entries(groupedFaqs).map(([section, faqs]) => (
        <div key={section} className="mb-4">
          <h3 className="font-bold text-emerald-700 mb-2 text-base capitalize">
            {section}
          </h3>
          <ul className="space-y-2">
            {faqs.map((faq) => (
              <li key={faq.id}>
                <button
                  className={`w-full text-left px-3 py-2 rounded transition-colors ${
                    openId === faq.id
                      ? "bg-emerald-600 text-white"
                      : "hover:bg-emerald-100 text-emerald-900"
                  }`}
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  aria-expanded={openId === faq.id}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  {faq.question}
                </button>
                {openId === faq.id && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    className="bg-white border border-emerald-200 rounded p-3 mt-1 text-gray-800 shadow"
                  >
                    {faq.answer}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="text-center">
        {!showMore && !searchQuery && filteredFaqs.length > 6 && (
          <button
            className="text-emerald-700 underline font-medium"
            onClick={() => setShowMore(true)}
          >
            See more...
          </button>
        )}
        {showMore && !searchQuery && (
          <button
            className="text-emerald-700 underline font-medium"
            onClick={() => setShowMore(false)}
          >
            See less...
          </button>
        )}
        {filteredFaqs.length === 0 && (
          <div className="text-gray-500 mt-4">
            No FAQs found for your search.
          </div>
        )}
      </div>
    </div>
  );
}

export default FAQ;
