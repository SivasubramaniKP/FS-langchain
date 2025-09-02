'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import React from 'react';

const HeroSectionClient = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="relative flex place-items-center mb-12">
        {/* Hero Section */}
        <h1 className="text-6xl font-extrabold tracking-tight text-center sm:text-7xl lg:text-8xl leading-tight">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="block"
          >
            Your Personal
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="block text-indigo-400"
          >
            AI Finance Assistant
          </motion.span>
        </h1>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        className="text-xl text-gray-300 text-center max-w-2xl mb-8"
      >
        Get smart insights, manage your wealth, and achieve your financial goals with personalized guidance.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
      >
        <Link
          href="/chatbot"
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-lg transform hover:scale-105"
        >
          Start Chatting
          <svg
            className="ml-2 -mr-1 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
      </motion.div>
    </main>
  );
};

export default HeroSectionClient;
