import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import SkillBadge from '../components/SkillBadge';
import CertificateCard from '../components/CertificateCard';
import StatCard from '../components/StatCard';
import { personalInfo, skills, projects, certifications, achievements, education, experience } from '../utils/constants';
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiCalendar, FiAward } from 'react-icons/fi';

const Home = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="container section-padding">
      {/* Hero Section */}
      <motion.section 
        className="min-h-[80vh] flex items-center"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <div className="space-y-6">
          <span className="text-[#64ffda] font-mono">Hi, I'm</span>
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="gradient-text">{personalInfo.name}</span>
          </h1>
          <h2 className="text-3xl md:text-4xl text-gray-400">{personalInfo.title}</h2>
          <p className="max-w-2xl text-gray-400 text-lg">
            Building scalable web applications and turning ideas into real products. 
            Passionate about clean code, modern tech, and solving real-world problems.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] rounded-lg hover:bg-[#64ffda]/10 transition-colors"
            >
              <FiGithub /> GitHub
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] rounded-lg hover:bg-[#64ffda]/10 transition-colors"
            >
              <FiLinkedin /> LinkedIn
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-2 px-6 py-3 border border-[#64ffda] text-[#64ffda] rounded-lg hover:bg-[#64ffda]/10 transition-colors"
            >
              <FiMail /> Contact Me
            </a>
          </div>

          <div className="flex flex-wrap gap-6 pt-6">
            <div className="flex items-center gap-2 text-gray-400">
              <FiMapPin className="text-[#64ffda]" />
              <span>{personalInfo.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <FiCalendar className="text-[#64ffda]" />
              <span>{personalInfo.batch}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <FiAward className="text-[#64ffda]" />
              <span>{personalInfo.cgpa} CGPA</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section 
        className="section-padding"
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <SectionHeading number="01." title="Skills" />
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-300 mb-4">Languages</h3>
            <div className="flex flex-wrap gap-3">
              {skills.languages.map((skill, index) => (
                <SkillBadge key={index} skill={skill} category="languages" />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-300 mb-4">Web Technologies</h3>
            <div className="flex flex-wrap gap-3">
              {skills.webTechnologies.map((skill, index) => (
                <SkillBadge key={index} skill={skill} category="webTechnologies" />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-300 mb-4">Databases</h3>
            <div className="flex flex-wrap gap-3">
              {skills.databases.map((skill, index) => (
                <SkillBadge key={index} skill={skill} category="databases" />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-300 mb-4">Tools & Platforms</h3>
            <div className="flex flex-wrap gap-3">
              {skills.tools.map((skill, index) => (
                <SkillBadge key={index} skill={skill} category="tools" />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-300 mb-4">Soft Skills</h3>
            <div className="flex flex-wrap gap-3">
              {skills.softSkills.map((skill, index) => (
                <SkillBadge key={index} skill={skill} category="softSkills" />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        className="section-padding"
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <SectionHeading number="02." title="Projects" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </motion.section>

      {/* Achievements Section */}
      <motion.section 
        className="section-padding"
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <SectionHeading number="03." title="Achievements" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            label="LeetCode Problems" 
            value={achievements.leetcode.solved} 
            subValue={`${achievements.leetcode.easy} Easy · ${achievements.leetcode.medium} Medium · ${achievements.leetcode.hard} Hard`}
          />
          <StatCard 
            label="Current Streak" 
            value={`${achievements.leetcode.streak} days`} 
            subValue={`Longest: ${achievements.leetcode.longestStreak} days`}
          />
          <StatCard 
            label="GitHub Repos" 
            value={achievements.github.repos} 
            subValue={`${achievements.github.commits} commits`}
          />
          <StatCard 
            label="HackerRank" 
            value={`${achievements.leetcode.badges} badges`} 
            subValue="7+ platforms"
          />
        </div>

        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
          <h3 className="text-xl font-semibold text-gray-300 mb-4">GitHub Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-gray-400">Followers</p>
              <p className="text-2xl font-bold text-[#64ffda]">{achievements.github.followers}</p>
            </div>
            <div>
              <p className="text-gray-400">Following</p>
              <p className="text-2xl font-bold text-[#64ffda]">{achievements.github.following}</p>
            </div>
            <div>
              <p className="text-gray-400">PRs</p>
              <p className="text-2xl font-bold text-[#64ffda]">{achievements.github.pullRequests}</p>
            </div>
            <div>
              <p className="text-gray-400">Top Lang</p>
              <p className="text-2xl font-bold text-[#64ffda]">{achievements.github.topLang}</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Certifications Section */}
      <motion.section 
        className="section-padding"
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <SectionHeading number="04." title="Certifications" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <CertificateCard key={index} certificate={cert} />
          ))}
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section 
        className="section-padding"
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <SectionHeading number="05." title="Education" />
        
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div key={index} className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-gray-200">{edu.degree}</h3>
                <span className="text-[#64ffda] font-mono">{edu.period}</span>
              </div>
              <p className="text-gray-400 mb-2">{edu.institution}, {edu.location}</p>
              <p className="text-gray-500">{edu.score}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section 
        className="section-padding"
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <SectionHeading number="06." title="Leadership & Experience" />
        
        <div className="space-y-6">
          {experience.map((exp, index) => (
            <div key={index} className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-gray-200">{exp.role}</h3>
                <span className="text-[#64ffda] font-mono">{exp.date}</span>
              </div>
              <p className="text-gray-400 mb-2">{exp.organization}</p>
              <p className="text-gray-500">{exp.description}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Home;