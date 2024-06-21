import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const ShortlistForm = (candidateId,jobId) => {
  const [message, setMessage] = useState('');
  const currentUser = useSelector((state) => state.user);
  const  currentJob  = useSelector((state) => state.jobs);

//  console.log("current",currentJob.application._id)

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/v1/jobs/shortlist-candidate', 
      {
        jobId,
        candidateId,
        message:message||"congratulation you are selected"
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser?.data?.refreshToken}`,
        }
      });
      toast.success("successfully send message")
      // console.log(response.data);
    } catch (error) {
      toast.error("somthing went wrong while sending a message")
      console.error('Error shortlisting candidate:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message for candidate"
        className="w-full p-2 border border-gray-300 rounded-md"
        required
      />
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Shortlist Candidate and Send Message
      </button>
    </form>
  );
};

export default ShortlistForm;
