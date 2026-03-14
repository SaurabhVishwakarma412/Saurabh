import React from 'react';
import { FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi';
import { personalInfo } from '../utils/constants';

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800 py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-[#64ffda] mb-2">Saurabh Vishwakarma</h3>
            <p className="text-gray-400">Full Stack Developer & Problem Solver</p>
          </div>

          <div className="flex gap-6">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#64ffda] transition-colors text-2xl"
            >
              <FiGithub />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#64ffda] transition-colors text-2xl"
            >
              <FiLinkedin />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-gray-400 hover:text-[#64ffda] transition-colors text-2xl"
            >
              <FiMail />
            </a>
            <a
              href={`tel:${personalInfo.phone}`}
              className="text-gray-400 hover:text-[#64ffda] transition-colors text-2xl"
            >
              <FiPhone />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Saurabh Vishwakarma. All rights reserved.</p>
          <p className="mt-2">Built with React & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;