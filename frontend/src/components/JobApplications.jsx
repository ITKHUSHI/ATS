import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';


function JobApplications() {
	const { currentUser } = useSelector(state => state.user);
	const [jobPosts, setJobPosts] = useState([]);
	const [isOpen , setIsOpen]=useState(false)
	const handleToggle=()=>{
	  setIsOpen(!isOpen);
	}
  
	useEffect(() => {
		async function fetchJobPosts() {
		  try {
			const response = await axios.get(`/api/v1/jobs/get-job-post/${currentUser.data.user._id}` ,{
			  headers:{
				Authorization:`Bearer ${currentUser?.data?.refreshToken}`
			  }
			});
			console.log(response.data);
			setJobPosts(response.data.data);
		  } catch (error) {
			console.error("Error fetching job posts", error);
		  }
		}
		fetchJobPosts();
	  }, [currentUser]);
  return (

<div className="max-w-4xl mx-auto p-4"> 
      <div className="mt-8 text-black">
        <h2 className="text-2xl font-bold mb-4">Job Posts</h2>

        <ul>
          
          {Array.isArray(jobPosts) && jobPosts.map((data) => (
           <div >
             <li key={data._id} className="p-4 border-b">
              <h3 className="text-lg font-bold"> post name {data.postName}</h3>
              <div className='flex  justify-start  items-start'>
              <h2 className="text-gray-500 mr-2 ">🌏{(data.location || 'Indore')}</h2>
              <h2 className="text-gray-500 mr-2">🤑{(data.salary || '100000')}</h2>
              </div>
              <p className='font-semibold'>Company: {data.companyName}</p>
              <p>Key Skills: {data.keySkills}</p>
              <div className={` ${isOpen?'hidden':'block'}`}>
                <p>Job Responsblitis : {data.responsibilities}</p>
                <p>Description : {data.jobDescription}</p>
              </div>
              <button className="text-blue-500 hover:underline" onClick={handleToggle}>
                {isOpen? 'show more':'show less'}
              </button>
              
            </li>
           </div>
          ))}
          
        </ul>
      </div>
	  </div>
  
  )
}

export default JobApplications