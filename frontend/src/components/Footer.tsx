'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-gray-800 text-gray-300 py-10 w-full px-6"
    >
      <div className="container mx-auto text-center">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-2xl font-bold text-white hover:text-indigo-400 transition-colors">
              FinBot
            </Link>
            <p className="text-sm mt-2">&copy; {new Date().getFullYear()} FinBot. All rights reserved.</p>
          </div>

          <nav className="mb-4 md:mb-0">
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/chatbot" className="hover:text-white transition-colors">
                  Chatbot
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaGithub className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaTwitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaLinkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
        <p className="text-xs text-gray-500">Built with ❤️ by Your Team Name</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
