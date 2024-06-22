import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function ApplicationProgress() {
  const { currentUser } = useSelector(state => state.user);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const response = await axios.get(`/api/v1/applications?candidateId=${currentUser._id}`);
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications", error);
      }
    }
    fetchApplications();
  }, [currentUser]);

  const getStatusIndex = (status) => {
    switch (status) {
      case 'Applied': return 0;
      case 'Viewed': return 1;
      case 'Interview': return 2;
      case 'Hired': return 3;
      default: return 0;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center ">Application Progress</h2>
      <ul>
        {applications.map((application) => (
          <li key={application.job._id} className="p-4 border-b">
            <h3 className="text-lg font-bold">{application.job.postName}</h3>
            <p>Company: {application.job.companyName}</p>
            <div className="mt-2">
              <h4 className="font-bold">Progress:</h4>
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${(getStatusIndex(application.status) + 1) * 25}%` }}
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-${application.status === 'Hired' ? 'green' : 'blue'}-500`}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between text-xs">
                <span>Applied</span>
                <span>Viewed</span>
                <span>Interview</span>
                <span>Hired</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApplicationProgress;
