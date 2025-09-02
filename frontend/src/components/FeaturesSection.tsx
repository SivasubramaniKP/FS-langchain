'use client';

import { motion } from 'framer-motion';
import { BanknotesIcon, ChartPieIcon, ShieldCheckIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

const features = [
  {
    icon: BanknotesIcon,
    title: "Comprehensive Net Worth Analysis",
    description: "Gain a holistic view of your financial standing with detailed breakdowns of assets and liabilities.",
  },
  {
    icon: ChartPieIcon,
    title: "Intelligent Investment Performance",
    description: "Track and analyze your SIPs and other investments against market benchmarks.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Personalized Financial Health Score",
    description: "Receive an objective score and actionable recommendations to improve your financial well-being.",
  },
  {
    icon: AcademicCapIcon,
    title: "Smart Retirement Planning",
    description: "Simulate retirement scenarios and get insights on required corpus and monthly SIPs.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-950 text-white w-full px-6">
      <div className="container mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold mb-12 text-indigo-400"
        >
          Powerful Features at Your Fingertips
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <feature.icon className="h-16 w-16 text-indigo-500 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
