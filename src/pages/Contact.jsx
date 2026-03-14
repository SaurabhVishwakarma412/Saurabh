import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import { personalInfo } from '../utils/constants';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (using Formspree or EmailJS)
    window.location.href = `mailto:${personalInfo.email}?subject=Portfolio Contact from ${formData.name}&body=${formData.message}%0A%0AFrom: ${formData.email}`;
  };

  return (
    <div className="container section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading number="03." title="Get In Touch" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-3xl font-bold text-gray-200 mb-4">Let's Create Something Amazing</h3>
            <p className="text-gray-400 mb-8 text-lg">
              Have a project in mind? Let's discuss how we can bring your ideas to life. 
              I'm always excited to work on new challenges and collaborate with amazing people.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1a1a1a] rounded-lg flex items-center justify-center text-[#64ffda] text-xl">
                  <FiMail />
                </div>
                <div>
                  <h4 className="text-gray-300 font-semibold mb-1">Email</h4>
                  <a href={`mailto:${personalInfo.email}`} className="text-gray-400 hover:text-[#64ffda] transition-colors">
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1a1a1a] rounded-lg flex items-center justify-center text-[#64ffda] text-xl">
                  <FiPhone />
                </div>
                <div>
                  <h4 className="text-gray-300 font-semibold mb-1">Phone</h4>
                  <a href={`tel:${personalInfo.phone}`} className="text-gray-400 hover:text-[#64ffda] transition-colors">
                    {personalInfo.phone}
                  </a>
                  <p className="text-gray-500 text-sm mt-1">Available for calls</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1a1a1a] rounded-lg flex items-center justify-center text-[#64ffda] text-xl">
                  <FiMapPin />
                </div>
                <div>
                  <h4 className="text-gray-300 font-semibold mb-1">Location</h4>
                  <p className="text-gray-400">{personalInfo.location}</p>
                  <p className="text-gray-500 text-sm">{personalInfo.university}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-800">
              <h4 className="text-gray-300 font-semibold mb-4">Connect with me</h4>
              <div className="flex gap-4">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[#1a1a1a] rounded-lg flex items-center justify-center text-gray-400 hover:text-[#64ffda] hover:border-[#64ffda] transition-all duration-300"
                >
                  <FiGithub size={20} />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[#1a1a1a] rounded-lg flex items-center justify-center text-gray-400 hover:text-[#64ffda] hover:border-[#64ffda] transition-all duration-300"
                >
                  <FiLinkedin size={20} />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="w-12 h-12 bg-[#1a1a1a] rounded-lg flex items-center justify-center text-gray-400 hover:text-[#64ffda] hover:border-[#64ffda] transition-all duration-300"
                >
                  <FiMail size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#1a1a1a] p-8 rounded-xl border border-gray-800">
            <h3 className="text-2xl font-bold text-gray-200 mb-6">Send Me a Message</h3>
            <p className="text-gray-400 mb-6">
              Let's discuss your project and turn your ideas into reality.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2 font-mono text-sm">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg focus:border-[#64ffda] focus:outline-none text-gray-300 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2 font-mono text-sm">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg focus:border-[#64ffda] focus:outline-none text-gray-300 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2 font-mono text-sm">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg focus:border-[#64ffda] focus:outline-none text-gray-300 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#64ffda] text-[#0a0a0a] rounded-lg font-semibold hover:bg-[#64ffda]/90 transition-colors flex items-center justify-center gap-2"
              >
                <FiSend /> Send Message
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;