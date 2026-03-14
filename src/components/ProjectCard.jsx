import React from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-gray-800 hover:border-[#64ffda]/30 transition-all duration-300 hover:transform hover:scale-105">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-[#64ffda] font-mono text-sm">{project.version}</span>
            <h3 className="text-2xl font-bold text-gray-200 mt-1">{project.title}</h3>
          </div>
          <div className="flex gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#64ffda] transition-colors"
            >
              <FiGithub size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#64ffda] transition-colors"
            >
              <FiExternalLink size={20} />
            </a>
          </div>
        </div>

        <p className="text-gray-400 mb-4">{project.description}</p>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Features:</h4>
          <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
            {project.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {project.tech.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-[#64ffda]/10 text-[#64ffda] rounded-full text-xs font-mono"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between items-center text-sm">
          <span className="text-gray-500">{project.date}</span>
          <span className="text-[#64ffda]">Client: {project.client || 'Personal Project'}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;