import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteUserFailed, deleteUserStart,deleteUserSuccess } from '../redux/user/userSlice';
import toast from 'react-hot-toast';
function RecruiterDashboard() {
	const { currentUser } = useSelector(state => state.user);
	const[dashboardData,setDashboardData]=useState([])
const dispatch=useDispatch()

	const handleLogoutUser=async()=>{
		try{
			dispatch(deleteUserStart());
			const response= await axios.post('/api/v1/users/logout' ,  { userId: currentUser.data.user._id },{
				headers:{
					Authorization: `Bearer ${(currentUser?.data?.refreshToken) }`
				}    
			})
			const data= await response.data;
			if(data.success===false){
				toast.error("failed to logout account" )
				dispatch(deleteUserFailed(data.message))
				return;
			}
				  toast.success("successfully logout account");
				dispatch(deleteUserSuccess(data));
				navigate('/login');
				
		} catch(error){
			toast.error("failed to logout account" )
		   dispatch(deleteUserFailed(error.message))
		}
	}
	useEffect(() => {
		axios.get('/api/v1/recruiter/dashboard')
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
      <h2 className="text-2xl font-bold mb-4">Recruiter Dashboard</h2>
      <h2 className="mb-2">Greetings, {currentUser?.data?.user?.fullname}!</h2>
	  <h4> contact : {currentUser?.data?.user.contact}</h4>
	  <h5>email : {currentUser?.data?.user.email} </h5>
	  <li
	  onClick={handleLogoutUser}
	  className='list-none text-lg text-blue-700 hover:underline'
	  >Logout</li>
    </div>

	</>
  )
}

export default RecruiterDashboard