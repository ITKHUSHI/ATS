import React,{useEffect} from 'react'
import { useSelector } from 'react-redux';
import CreateJobPost from '../components/CreateJobPost';
function EmployerDashboard() {
	const { currentUser } = useSelector(state => state.user);

  return (
	<>
	 
	
	 <CreateJobPost/>
	 
	</>
  )
}

export default EmployerDashboard