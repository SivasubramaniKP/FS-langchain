'use client';

import { motion } from 'framer-motion';
import { RocketLaunchIcon, CubeTransparentIcon, LightBulbIcon } from '@heroicons/react/24/outline';

const coolnessFactors = [
  {
    icon: RocketLaunchIcon,
    title: "Blazing Fast Insights",
    description: "Leveraging cutting-edge AI for instantaneous financial analysis and recommendations.",
  },
  {
    icon: CubeTransparentIcon,
    title: "Hyper-Personalized Advice",
    description: "Every insight is tailored to your unique financial profile, goals, and risk tolerance.",
  },
  {
    icon: LightBulbIcon,
    title: "Intuitive & Intelligent",
    description: "Interact naturally, ask complex questions, and receive clear, actionable financial guidance.",
  },
];

const CoolnessSection = () => {
  return (
    <section className="py-20 bg-black text-white w-full px-6">
      <div className="container mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold mb-12 text-green-400"
        >
          Why Our AI Agent is Simply Unbeatable
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {coolnessFactors.map((factor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-gray-800 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-700"
            >
              <factor.icon className="h-16 w-16 text-green-500 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4">{factor.title}</h3>
              <p className="text-gray-300">{factor.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoolnessSection;
