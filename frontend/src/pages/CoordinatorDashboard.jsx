import React ,{useEffect} from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import ShortlistedCandidates from '../components/ShortlistedCandidate';
import CandidateApplingJob from '../components/CandidateApplingJob';
import JobApplications from '../components/JobApplications';



function CoordinatorDashboard() {
	const { currentUser } = useSelector(state => state.user);
console.log("currentUser" , currentUser)
	useEffect(() => {
		try{
		const response= axios.get('/api/users/v1/coordinator/dashboard',{
			headers: {
				Authorization: `Bearer ${currentUser?.data?.refreshToken}`,
			  }
	  
		})
		  
			setDashboardData(response.data);
		  }
		  catch(error) {
			console.error('Error fetching coordinator dashboard:', error);
		  };
	  }, []);
  return (
	<>
	  <div className="p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Coordinator Dashboard</h2>
      <p className="mb-2">Welcome, {currentUser?.data?.user?.fullname} !</p>
      {/* Add coordinator-specific content and actions */}
    </div>

	<JobApplications/>
	</>
  )
}

export default CoordinatorDashboard