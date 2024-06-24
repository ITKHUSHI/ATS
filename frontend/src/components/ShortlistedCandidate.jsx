import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const ShortlistedCandidates = () => {
  const [shortlistedCandidates, setShortlistedCandidates] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentJob = useSelector((state) => state.jobs.currentJob);

  const jobId = currentJob?.shortlistedCandidates._id;

  useEffect(() => {
    const fetchShortlistedCandidates = async () => {
      try {
        const response = await axios.get(`/api/v1/jobs/shortlisted-candidates/${jobId}`, {
          headers: {
            Authorization: `Bearer ${currentUser?.data?.refreshToken}`,
          },
        });
        setShortlistedCandidates(response.data.shortlistedCandidates);
      } catch (error) {
        toast.error("Failed to fetch shortlisted candidates");
        console.error('Error fetching shortlisted candidates:', error);
      }
    };

    if (jobId) {
      fetchShortlistedCandidates();
    }
  }, [jobId, currentUser?.data?.refreshToken]);

  return (
    <div className='m-4 '>
      <h2 className="text-2xl font-bold mb-4 text-center">Shortlisted Candidates</h2>
      {shortlistedCandidates.length > 0 ? (
        <ul>
          {shortlistedCandidates.map((candidate) => (
            <li key={candidate._id} className="mb-4 p-4 border rounded-md">
              <p><strong>Candidate ID:</strong> {candidate.candidateId._id}</p>
              <p><strong>Name:</strong> {candidate.candidateId.name}</p>
              <p><strong>Email:</strong> {candidate.candidateId.email}</p>
              <p><strong>Message:</strong> {candidate.message}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xl font-semibold text-center" > candidates Not shortlisted yet.</p>
      )}
    </div>
  );
};

export default ShortlistedCandidates;
