import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiFile, FiX, FiCheck, FiLoader } from 'react-icons/fi';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      await processFile(selectedFile);
    }
  };

  const processFile = async (fileToProcess) => {
    if (fileToProcess.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    setFile(fileToProcess);
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('resume', fileToProcess);

      const fetchResponse = await fetch("https://hirebuddy-backend-za19.onrender.com/api/resume/upload", {
        method: 'POST',
        body: formData,
      });

      if (!fetchResponse.ok) {
        const errorData = await fetchResponse.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to process resume');
      }

      const apiData = await fetchResponse.json();
      
      // Transform the backend response to match our frontend format
      const allJobs = apiData.data.matchedJobs || [];
      
      // Format all jobs
      const formattedJobs = allJobs.map(job => ({
        id: job._doc._id,
        title: job._doc.job_title,
        company: job._doc.company_name,
        location: job._doc.job_location,
        applyLink: job._doc.apply_link,
        description: job._doc.job_description,
        source: job._doc.source,
        matchScore: job.relevance,
        skills: job.reason ? job.reason.split(', ').map(skill => skill.replace('Direct matches found: ', '').trim()) : [],
        postedDate: new Date().toISOString().split('T')[0]
      }));

      // Navigate to jobs page with the formatted jobs and pagination info
      navigate('/jobs', { 
        state: { 
          jobs: formattedJobs,
          fromResume: true
        } 
      });
      
    } catch (err) {
      console.error('Error processing resume:', err);
      setError(err.message || 'Failed to process resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-[calc(100vh-88px)] bg-gray-50 flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-[1200px]">
        <div className="bg-white rounded-3xl shadow-lg p-12">
          <h2 className="text-4xl font-semibold text-center text-gray-900 mb-3">Welcome to Hirebuddy</h2>
          <p className="text-xl text-gray-500 text-center mb-12">Upload your resume to find the best job matches</p>
          
          <div 
            className={`border-2 border-dashed rounded-3xl p-16 text-center transition-all duration-200 cursor-pointer ${
              isDragging ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
            } ${isLoading ? 'opacity-70 pointer-events-none' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleButtonClick}
          >
            {isLoading ? (
              <div className="flex flex-col items-center">
                <FiLoader className="w-12 h-12 text-green-500 animate-spin mb-4" />
                <p className="text-lg text-gray-600">Analyzing your resume and finding matches...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                  <FiUpload className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Drag & drop your resume here</h3>
                <p className="text-gray-500 text-lg mb-8">or click to browse files (PDF only)</p>
                <button 
                  type="button"
                  className="px-8 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all text-base font-medium shadow-sm hover:shadow"
                  onClick={(e) => e.stopPropagation()}
                >
                  Select File
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf"
                />
              </div>
            )}
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg text-center">
              {error}
            </div>
          )}

          {file && !isLoading && (
            <div className="mt-6 p-5 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-xl mr-4">
                  <FiFile className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-base font-medium text-gray-800">{file.name}</p>
                  <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 text-base font-medium mr-4 flex items-center">
                  <FiCheck className="mr-1.5" /> Ready to upload
                </span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                  className="text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Remove file"
                  disabled={isLoading}
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;