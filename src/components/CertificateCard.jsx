import React from 'react';
import { FiExternalLink } from 'react-icons/fi';

const CertificateCard = ({ certificate }) => {
  return (
    <a
      href={certificate.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 hover:border-[#64ffda]/30 transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-200">{certificate.title}</h3>
        <FiExternalLink className="text-gray-400 hover:text-[#64ffda]" />
      </div>
      <p className="text-[#64ffda] mb-2">{certificate.issuer}</p>
      <p className="text-gray-500 text-sm">{certificate.date}</p>
    </a>
  );
};

export default CertificateCard;