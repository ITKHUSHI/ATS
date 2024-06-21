// components/CandidateR1Form.jsx
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { applyJobStart,applyJobFailed,applyJobSuccess } from '../redux/user/jobSlice';
import axios from 'axios'

const CandidateForm = () => {
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState('');
  const [q4, setQ4] = useState('');
  const [q5, setQ5] = useState('');
  const [applicationData, setApplicationData] = useState({
    resume: null,
    contact: '',
    email: ''
  });
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const[loading,setIsLoading]=useState(false);
  const { currentJob } = useSelector((state) => state.jobs);
  const { currentUser } = useSelector((state) => state.user);

  const handleFileChange = (event) => {
    setApplicationData({ ...applicationData, resume: event.target.files[0] });
  };

  const handleJobApply = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      dispatch(applyJobStart())
      console.log(q1,)
      const { resume, contact, email } = applicationData;
      const response = await axios.post(`/api/v1/jobs/apply-for-job`, 
        {jobId:currentJob?._id , candidateId:currentUser?.data?.user?._id,contact , email,resume,q1:q1, q2:q2, q3:q3, q4:q4, q5:q5, },
         {
        headers: {
          'Content-Type': 'multipart/form-data',
           Authorization: `Bearer${currentUser?.data?.refreshToken}`,
        }
      });
      dispatch(applyJobSuccess(response.data.data))
      navigate("/candidate/dashboard/appling-job")
       const data=response.data
       console.log(response.data,"data" )
      toast.success("Applied successfully!",data);
    } catch (error) {
      dispatch(applyJobFailed(error.message))
      toast.error("Failed to apply.",error.message);
      setIsLoading(false)
    }
  };


  return (
    <div className="w-[80vw] ">
      <div className="flex justify-end">
        {/* <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none  ">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button> */}
      </div>
      <form onSubmit={handleJobApply} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full ">
      <h2 className="text-2xl font-bold mb-4">Candidate R1 Form</h2>
       <h3>{}</h3>
        <div className="mb-4">
          <label htmlFor="contact" className="block font-medium text-gray-700">
            Contact
          </label>
          <input
            type="text"
            id="contact"
            value={applicationData.contact}
            onChange={(event) =>
              setApplicationData({ ...applicationData, contact: event.target.value })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={applicationData.email}
            onChange={(event) =>
              setApplicationData({ ...applicationData, email: event.target.value })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="resume" className="block font-medium text-gray-700">
            Resume
          </label>
          <input
            type="file"
            id="resume"
            onChange={handleFileChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

      <div className="mb-4 ">
        <label htmlFor="q1" className="block font-medium text-gray-700">
          Do you have experience in web Development?
        </label>
        <select
          id="q1"
          value={q1}
          onChange={(event) => setQ1(event.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        >
          <option value="">Select option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="q2" className="block font-medium text-gray-700">
        Are you willing to relocate for this job?        </label>
        <select
          id="q2"
          value={q2}
          onChange={(event) => setQ2(event.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        >
          <option value="">Select option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="q3" className="block font-medium text-gray-700">
        Have you worked in a similar industry before?        </label>
        <select
          id="q3"
          value={q3}
          onChange={(event) => setQ3(event.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        >
          <option value="">Select option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="q4" className="block font-medium text-gray-700">
        Are you available to start within 2 weeks?        </label>
        <select
          id="q4"
          value={q4}
          onChange={(event) => setQ4(event.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        >
          <option value="">Select option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className="mb-4 ">
        <label htmlFor="q5" className="block font-medium text-gray-700">
          Do you have experience in backend?
        </label>
        <select
          id="q5"
          value={q5}
          onChange={(event) => setQ5(event.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        >
          <option value="">Select option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading?'Loading..':'Apply'}
      </button>
    </form>

    </div>
  );
};

export default CandidateForm;