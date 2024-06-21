import React ,{useEffect} from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import AppliedJob from '../components/CandidateApplingJob';



function CoordinatorDashboard() {
	const { currentUser } = useSelector(state => state.user);
console.log("currentUser" , currentUser)
	useEffect(() => {
		axios.get('/api/v1/coordinator/dashboard')
		  .then(response => {
			setDashboardData(response.data);
		  })
		  .catch(error => {
			console.error('Error fetching coordinator dashboard:', error);
		  });
	  }, []);
  return (
	<>
	  <div className="p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Coordinator Dashboard</h2>
      <p className="mb-2">Welcome, {currentUser?.data?.user?.fullname} !</p>
      {/* Add coordinator-specific content and actions */}
    </div>

	<AppliedJob/>
	</>
  )
}

export default CoordinatorDashboard