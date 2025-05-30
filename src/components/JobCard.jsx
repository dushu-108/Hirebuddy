import { useState } from 'react';

const JobCard = ({ job }) => {
  console.log('Job data:', job); // Debug log
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Ensure job data exists
  if (!job) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-red-100">
        <p className="text-red-500">No job data available</p>
      </div>
    );
  }

  // Destructure with default values for the job data
  const { 
    company = 'Company Not Specified',
    title = 'Job Title Not Available',
    location = 'Location Not Specified',
    description = 'No description available.',
    applyLink = '#',
    salary,
    skills = []
  } = job;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 mb-6 w-full max-w-4xl mx-auto">
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
            <p className="text-gray-600 font-medium mb-2">{company}</p>
            
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location}
              </div>
              {salary && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {salary}
                </div>
              )}
            </div>

            {skills && skills.length > 0 && (
              <div className="mt-3">
                <div className="text-sm text-gray-500 mb-1">Skills:</div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-4 sm:mt-0">
            <a
              href={applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Apply Now
            </a>
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap">
              Save Job
            </button>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
        <h4 className="font-medium text-gray-800 mb-2">Job Description</h4>
        <p className={`text-gray-600 text-sm ${!isExpanded ? 'line-clamp-3' : ''}`}>
          {description}
        </p>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="mt-2 text-blue-600 text-sm font-medium hover:underline"
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;