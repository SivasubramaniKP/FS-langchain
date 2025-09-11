'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { DocumentArrowUpIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface DocumentUploaderProps {
  onDashboardGenerated: (chartPaths: string[]) => void;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({ onDashboardGenerated }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadedFilePath, setUploadedFilePath] = useState<string | null>(null);
  const [dashboardLoading, setDashboardLoading] = useState<boolean>(false);
  const [dashboardMessage, setDashboardMessage] = useState<string | null>(null);
  const [dashboardIsSuccess, setDashboardIsSuccess] = useState<boolean | null>(null);
  // chartPaths are now managed by the parent component, we just pass them up
  // const [dashboardChartPaths, setDashboardChartPaths] = useState<string[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setMessage(null);
      setIsSuccess(null);
      setUploadedFilePath(null); // Reset path when new file is selected
      onDashboardGenerated([]); // Clear old dashboard plots in parent
      setDashboardMessage(null);
      setDashboardIsSuccess(null);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedFile) {
      setMessage("Please select a file to upload.");
      setIsSuccess(false);
      return;
    }

    setLoading(true);
    setMessage(null);
    setIsSuccess(null);
    setUploadedFilePath(null);
    onDashboardGenerated([]); // Clear old dashboard plots in parent
    setDashboardMessage(null);
    setDashboardIsSuccess(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch('http://localhost:8000/upload-document', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        setIsSuccess(true);
        setSelectedFile(null); // Clear selected file on success
        setUploadedFilePath(result.file_path); // Store the file path
      } else {
        setMessage(result.error || "Failed to upload document.");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Error uploading document:", error);
      setMessage("An error occurred during upload.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateDashboard = async () => {
    if (!uploadedFilePath) {
      setDashboardMessage("Please upload a document first to generate a dashboard.");
      setDashboardIsSuccess(false);
      return;
    }

    setDashboardLoading(true);
    setDashboardMessage(null);
    setDashboardIsSuccess(null);
    onDashboardGenerated([]); // Clear old dashboard plots in parent

    try {
      const response = await fetch(`http://localhost:8000/generate-dashboard?file_path=${encodeURIComponent(uploadedFilePath)}`, {
        method: 'POST',
      });

      const result = await response.json();

      if (response.ok) {
        setDashboardMessage(result.message);
        setDashboardIsSuccess(true);
        onDashboardGenerated(result.chart_paths.map((path: string) => `/dashboard_plots/${path}`)); // Pass paths to parent
      } else {
        setDashboardMessage(result.error || "Failed to generate dashboard.");
        setDashboardIsSuccess(false);
      }
    } catch (error) {
      console.error("Error generating dashboard:", error);
      setDashboardMessage("An error occurred during dashboard generation.");
      setDashboardIsSuccess(false);
    } finally {
      setDashboardLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700 max-w-lg mx-auto my-10"
    >
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Upload Financial Documents</h2>
      <p className="text-gray-400 mb-8 text-center">
        Upload your PDF, TXT, or DOCX financial statements to enable personalized RAG analysis.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
        <label
          htmlFor="file-upload"
          className="relative cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 w-full"
        >
          <DocumentArrowUpIcon className="h-6 w-6" />
          <span>{selectedFile ? selectedFile.name : "Choose File"}</span>
          <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.txt,.docx" />
        </label>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading || !selectedFile}
        >
          {loading ? "Uploading..." : "Upload and Process"}
        </motion.button>
      </form>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`mt-6 p-4 rounded-lg flex items-center space-x-3 ${isSuccess ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}
        >
          {isSuccess ? <CheckCircleIcon className="h-6 w-6" /> : <XCircleIcon className="h-6 w-6" />}
          <p>{message}</p>
        </motion.div>
      )}

      {uploadedFilePath && isSuccess && (
        <motion.button
          onClick={handleGenerateDashboard}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          disabled={dashboardLoading}
        >
          {dashboardLoading ? "Generating Dashboard..." : "Generate Dynamic Dashboard"}
        </motion.button>
      )}

      {dashboardMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`mt-6 p-4 rounded-lg flex items-center space-x-3 ${dashboardIsSuccess ? "bg-blue-500/20 text-blue-300" : "bg-red-500/20 text-red-300"}`}
        >
          {dashboardIsSuccess ? <CheckCircleIcon className="h-6 w-6" /> : <XCircleIcon className="h-6 w-6" />}
          <p>{dashboardMessage}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DocumentUploader;
