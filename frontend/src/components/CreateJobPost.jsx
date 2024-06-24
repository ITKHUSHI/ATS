import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import JobApplications from '../components/JobApplications'

function CreateJobPost() {
  const { currentUser } = useSelector(state => state.user);
  const [formData, setFormData] = useState({
    companyName: '',
    recruiterName: '',
    postName: '',
    keySkills: '',
    responsibilities: '',
    jobDescription: '',
    location:'',
    salary:'',
  });
  const [jobPosts, setJobPosts] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {companyName,recruiterName, postName, keySkills, responsibilities , jobDescription , location ,salary}=formData
      console.log(companyName,recruiterName,postName,keySkills,jobDescription ,location , salary)
      const response = await axios.post('/api/v1/jobs/create-job-post', {
        recruiterId: currentUser?.data?.user._id,
        companyName,
        recruiterName, 
        postName,
        keySkills, 
        responsibilities , 
        jobDescription,
        location,
        salary,
        headers:{
          'Content-Type':'application/json'
        }
      });
      toast.success("Job posted successfully!");
      setFormData({
        companyName: '',
        recruiterName: '',
        postName: '',
        keySkills: '',
        responsibilities: '',
        jobDescription: '',
        location:'',
        salary:'',
      })
      setJobPosts(response.data);
    } catch (error) {
      toast.error("Failed to post job.");
    }
  };



  return (
      
      <div className="max-w-4xl mx-auto p-4">
        <JobApplications/>

      <h2 className="text-2xl font-bold mb-4">Post a Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Recruiter Name</label>
          <input
            type="text"
            name="recruiterName"
            value={formData.recruiterName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Post Name</label>
          <input
            type="text"
            name="postName"
            value={formData.postName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Salary</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Key Skills</label>
          <input
            type="text"
            name="keySkills"
            value={formData.keySkills}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Responsibilities</label>
          <textarea
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Description</label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}

export default CreateJobPost;
