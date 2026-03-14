import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../utils/constants';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  
  const technologies = ['all', ...new Set(projects.flatMap(p => p.tech))];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.tech.includes(filter));

  return (
    <div className="container section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading number="02." title="All Projects" />
        
        <p className="text-gray-400 max-w-3xl mb-8">
          Here's a collection of my work - from full-stack applications to interactive web experiences. 
          Each project represents a unique challenge and learning opportunity.
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {technologies.map((tech, index) => (
            <button
              key={index}
              onClick={() => setFilter(tech)}
              className={`px-4 py-2 rounded-lg text-sm font-mono transition-all duration-300 ${
                filter === tech
                  ? 'bg-[#64ffda] text-[#0a0a0a]'
                  : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#64ffda]/10 hover:text-[#64ffda]'
              }`}
            >
              {tech === 'all' ? 'All Projects' : tech}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No projects found with this technology.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Projects;