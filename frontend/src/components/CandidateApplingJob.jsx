import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import CandidateForm from './CandidateForm';
import { setCurrentJob } from '../redux/user/jobSlice';

function CandidateApplingJob() {
  const { currentUser } = useSelector(state => state.user);
  const { currentJob } = useSelector((state) => state.jobs);
const jobId=currentJob._id;
  const [jobPosts, setJobPosts] = useState([]);
  const [expandedJobId, setExpandedJobId] = useState(null); // Track expanded job id for description
  const [selectedJobId, setSelectedJobId] = useState(null); // Track selected job id for application
  const dispatch = useDispatch();

  const handleToggle = (postId) => {
    setExpandedJobId(postId === expandedJobId ? null : postId);
  }

  const handleToggleApply = (job) => {
    setSelectedJobId(job._id);
    dispatch(setCurrentJob(job));
  }

  useEffect(() => {
    async function fetchJobPosts() {
      try {
        const response = await axios.get(`/api/v1/jobs/get-job-post/${jobId}`, {
          headers: {
            Authorization: `Bearer ${currentUser?.data?.refreshToken}`
          }
        });
        setJobPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching job posts", error);
      }
    }

    if (currentUser) {
      fetchJobPosts();
    }
  }, [currentUser]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mt-8 text-black">
        <h2 className="text-2xl font-bold mb-4">Job Posts</h2>
        <ul>
          {jobPosts.length > 0 ? (
            jobPosts.map((post) => (
              <div key={post._id}>
                <li className="p-4 border-b">
                  <h3 className="text-lg font-bold">{post.postName}</h3>
                  <div className='flex justify-start items-start'>
                    <h2 className="text-gray-500 mr-2">🌏{post.location || "indore"}</h2>
                    <h2 className="text-gray-500 mr-2">🤑{post.salary || "10000"}</h2>
                  </div>
                  <p>Company: {post.companyName}</p>
                  <p>Key Skills: {post.keySkills}</p>
                  <div className={`${expandedJobId === post._id ? 'block' : 'hidden'}`}>
                    <p> Description : <br />{post.jobDescription}</p>
                    <p> Responsibilities : <br />{post.responsibilities}</p>
                  </div>
                  <div className='flex justify-between'>
                    <button className="text-blue-500 hover:underline" onClick={() => handleToggle(post._id)}>
                      {expandedJobId === post._id ? 'show less' : 'show more'}
                    </button>
                    <button
                      className='bg-blue-400 text-white rounded-lg p-2 hover:bg-blue-700'
                      onClick={() => handleToggleApply(post)}
                    >
                      Apply
                    </button>
                  </div>
                  <div className='bg-gray-200 p-2'>
                    {selectedJobId === post._id && <CandidateForm onClose={() => setSelectedJobId(null)} />}
                  </div>
                </li>
              </div>
            ))
          ) : (
            <p className='text-red-500 text-xl'>Do not have any job yet</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default CandidateApplingJob;



















