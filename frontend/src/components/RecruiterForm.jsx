// components/RecruiterForm.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const RecruiterForm = () => {
  const [responses, setResponses] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: ''
  });
  const handleChange = (event) => {
    const { id, value } = event.target;
    setResponses(prevResponses => ({
      ...prevResponses,
      [id]: value
    }));
  };
  const navigate=useNavigate()
  const currentUser=useSelector((state)=>state.user)
  const currentJob=useSelector((state)=>state.jobs)
  const r2Form=[responses.q1,responses.q2,responses.q3,responses.q4,responses.q5]
  const jobId=currentJob.jobs._id
  const recruiterId=currentJob.jobs.recruiterId

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/v1/jobs/assign-recruiter-form',{
        jobId, 
        recruiterId,
         r2Form},{
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer${currentUser?.data?.refreshToken}`,
        }
      } );
      navigate('/recruiter/dashboard/get-applied-job')
      toast.success("Successfully Review applicatiion")
      console.log(response.data); // Handle success response
    } catch (error) {
      console.error('Error saving recruiter responses:', error); // Handle error
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="q1" className="block font-medium text-gray-700">
            Does the candidate meet the required qualifications?
          </label>
          <select
            id="q1"
            value={responses.q1}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label htmlFor="q2" className="block font-medium text-gray-700">
          Can the candidate work flexible hours?          </label>
          <select
            id="q2"
            value={responses.q2}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label htmlFor="q3" className="block font-medium text-gray-700">
          Is the candidate eligible to work in india?
          </label>
          <select
            id="q3"
            value={responses.q3}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label htmlFor="q4" className="block font-medium text-gray-700">
          Does the candidate have experience with software?          </label>
          <select
            id="q4"
            value={responses.q4}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label htmlFor="q5" className="block font-medium text-gray-700">
          Has the candidate previously worked in a leadership role?               </label>
          <select
            id="q5"
            value={responses.q5}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Repeat similar structure for remaining questions */}

        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Recruiter Responses
        </button>
      </form>
    </div>
  );
};

export default RecruiterForm;
