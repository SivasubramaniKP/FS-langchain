import { motion } from 'framer-motion';
import Image from 'next/image';

interface DashboardDisplayProps {
  chartPaths: string[];
}

const DashboardDisplay: React.FC<DashboardDisplayProps> = ({ chartPaths }) => {
  if (!chartPaths || chartPaths.length === 0) {
    return null; // Or a placeholder message
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700 max-w-4xl mx-auto my-10"
    >
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Your Financial Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {chartPaths.map((path, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-gray-700 p-4 rounded-lg shadow-md flex flex-col items-center"
          >
            <Image 
                src={`http://localhost:8000${path}`} 
                alt={`Financial Chart ${index + 1}`} 
                width={500} 
                height={400} 
                className="rounded-lg mb-4"
            />
            <p className="text-gray-300 text-center text-sm">{path.split('/').pop()?.replace(/_/g, ' ').replace('.png', '')}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DashboardDisplay;
