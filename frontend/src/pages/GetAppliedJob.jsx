// pages/GetAppliedJob.jsx
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import RecruiterForm from '../components/RecruiterForm';
import ShortlistForm from '../components/ShortlistForm';

function GetAppliedJob() {
  const [dashboardData, setDashboardData] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const { currentJob } = useSelector((state) => state.jobs);
  const [isReview, setIsReview] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [shortlistCandidateId, setShortlistCandidateId] = useState(null);

  const jobId = currentJob?._id;
  console.log(currentJob.shortlistedCandidates.candidateId);

  useEffect(() => {
    async function fetchJobApplications() {
      try {
        const response = await axios.get(`/api/v1/jobs/get-job-applications/${jobId}`, {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`
          }
        });
        // console.log(response.data.data.applications);
        setDashboardData(response?.data?.data?.applications);
      } catch (error) {
        console.error("Error fetching job applications", error);
      }
    }

    if (currentUser && currentJob) {
      fetchJobApplications();
    }
  }, [currentUser, currentJob]);

  return (
    <div>
      <h2 className='text-center font-bold text-2xl'> Candidate Applied Jobs</h2>
      
      <ul>
        {dashboardData.map((application) => (
          <li key={application._id} className="p-4 border-b">
            <h3 className="text-lg font-bold">Post Name: {currentJob.postName}</h3>
            <p>Company: {currentJob.companyName}</p>
            <p>Location: {currentJob.location}</p>
            <p>Salary: {currentJob.salary}</p>
            <p>Key Skills: {currentJob.keySkills}</p>
            <div className={`${isOpen ? 'hidden' : 'block'}`}>
              <p>Description: {currentJob.Jobdescription}</p>
              <p>Responsibilities: {currentJob.responseblities}</p>
            </div>
            <h5 className='font-bold'>Candidate Details</h5>
            <p>Resume: {application.resume}</p>
            <p>Contact: {application.contact}</p>
            <p>Email: {application.email}</p>
            <p>Status: {application.status}</p>
            <p>Answer of R1 Form<br />
              <span>{application.q1},<br />{application.q2},<br />{application.q3},<br />{application.q4},<br />{application.q5}</span>
            </p>
            <button className="text-blue-500 hover:underline" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? 'Show more' : 'Show less'}
            </button>
            <button onClick={() => setIsReview(true)}>
              Review
            </button>
            {isReview && <RecruiterForm />}
            <button onClick={() => setShortlistCandidateId(application._id)}>
              Shortlist
            </button>
            {shortlistCandidateId === application._id && (
              <ShortlistForm jobId={jobId} candidateId={application._id} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetAppliedJob;




























