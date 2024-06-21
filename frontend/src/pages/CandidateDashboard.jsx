import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfileStart, updateProfileFailed, updateProfileSuccess , deleteUserStart , deleteUserFailed,deleteUserSuccess  } from '../redux/user/userSlice';
import toast from 'react-hot-toast';

function CandidateDashboard() {
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const candidate = useSelector((state) => state.user.currentUser); // Assuming currentUser holds candidate's profile data
 const [dashboardData,setDashboardData]=useState([]);
  const [editMode, setEditMode] = useState(false); // State to toggle edit mode
  const [formData, setFormData] = useState({
    fullname:  currentUser?.data?.user.fullname ||candidate.fullname || '',
    email:   currentUser?.data?.user.email || candidate.email || '',
    contact:  currentUser?.data?.user.contact || candidate.contact || '',
    skills:    currentUser?.data?.user.skills  ||  candidate.skills || " ",
    certificates:  currentUser?.data?.user.certificates ||candidate.certificates || [],
    resume:   currentUser?.data?.user.resume || candidate.resume || null,
    workExperience:   currentUser?.data?.user.workExperience || candidate.workExperience || [],
    education: currentUser?.data?.user.education || candidate.education || [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };


  const handleArrayChange = (e, index, field) => {
    const updatedArray = formData[field].map((item, idx) =>
      idx === index ? { ...item, [e.target.name]: e.target.value } : item
    );
    setFormData({ ...formData, [field]: updatedArray });
  };

  const addArrayItem = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], {}] });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
     try {
      const { fullname, email, contact, skills, certificates, resume, workExperience, education } = formData;
      console.log(fullname, email, contact, skills, certificates, resume, workExperience, education )
      dispatch(updateProfileStart());
      const response = await axios.patch('/api/v1/users/update-candidate-details',{
        id:currentUser?.data?.user._id,
        fullname, email, contact, skills, certificates, resume, workExperience, education 
        
      },{
        headers:{
          'Content-Type':'application/json',
           Authorization:`Bearer ${currentUser?.data?.refreshToken}`
        }
      })
      setEditMod(false);
      setDashboardData(response.data);
      toast.success("successfully update user details")
      dispatch(updateProfileSuccess(response.data))
      
     } catch (error) {
      setEditMode(false); 
      toast.error("user details not update")
      dispatch(updateProfileFailed(error.message)) 
     }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);

  };

  const handleLogoutUser=async()=>{
		try{
			dispatch(deleteUserStart());
			const response= await axios.post('/api/v1/users/logout' ,   currentUser?.data?.user._id ,{
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
 console.log( "id" ,currentUser?.data?.user._id)
  useEffect(() => {
    async function fetchingCandidateDetails(){
      try{
        const { fullname, email, contact, skills, certificates, resume, workExperience, education } = formData;

     const response =  axios.get('/api/v1/users/candidate/dashboard' , { id:currentUser?.data?.user._id,
      fullname, email, contact, skills, certificates, resume, workExperience, education 
     },{
      headers:{
        Authorization: `Bearer ${(currentUser?.data?.refreshToken) }`
    }  
     })
      
        setDashboardData(response.data);
      }catch(error) {
        console.error('Error fetching candidate dashboard:', error);
      };
    }
    fetchingCandidateDetails();
  }, []);
  const education=currentUser?.data?.user?.education;
  

  return (
    <>
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Candidate Dashboard</h2>
        <p className="mb-2">Hi, {currentUser?.data?.user?.fullname}!</p>
      </div>

      <div className="max-w-4xl mx-auto mt-8 shadow-md p-6 bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Candidate Profile</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            {!editMode && (
              <button
                className="text-blue-500 hover:underline"
                onClick={toggleEditMode}
              >
                Edit
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Name: {candidate?.data?.user?.fullname}</p>
              <p className="text-gray-600">Email: {candidate?.data?.user?.email}</p>
              <p className="text-gray-600">Contact: {candidate?.data?.user?.contact}</p>
              <p>Skills {candidate.skills}</p>
              <p>Education {education}  </p>
               <p>Certificates {currentUser?.data?.user.certificates}</p>
               <p> dashboard : {dashboardData}</p>
            </div>
            <li
            onClick={handleLogoutUser} 
            className='list-none hover:underline flex justify-end items-end m-4 text-lg text-blue-800 ' >logout</li>

            <div>
              {/* Add more personal information fields here */}
            </div>
          </div>

          {editMode && (
            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="fullname"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                  Contact
                </label>
                <input
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                  Resume
                </label>
                <input
                  id="resume"
                  name="resume"
                  value={formData.resume}
                  onChange={handleFileChange}
                  type="file"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                  Skills
                </label>
                <textarea
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="mt-4">
                <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                  Education
                </label>
                {formData.education.map((edu, index) => (
                  <div key={index} className="space-y-2">
                    <input
                      name="school"
                      value={edu.school || ''}
                      onChange={(e) => handleArrayChange(e, index, 'education')}
                      placeholder="School/College Name"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <input
                      name="degree"
                      value={edu.degree || ''}
                      onChange={(e) => handleArrayChange(e, index, 'education')}
                      placeholder="Degree Name"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <input
                      name="branch"
                      value={edu.branch || ''}
                      onChange={(e) => handleArrayChange(e, index, 'education')}
                      placeholder="Branch"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <input
                      name="cgpa"
                      value={edu.cgpa || ''}
                      onChange={(e) => handleArrayChange(e, index, 'education')}
                      placeholder="CGPA/Percentage"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('education')} className="mt-2 text-blue-500 hover:underline">
                  Add More Education
                </button>
              </div>

              <div className="mt-4">
                <label htmlFor="certificates" className="block text-sm font-medium text-gray-700">
                  Certificates
                </label>
                
                {formData.certificates.map((cert, index) => (
                  <div key={index} className="space-y-2">
                    <input
                      name="name"
                      value={cert.name || ''}
                      onChange={(e) => handleArrayChange(e, index, 'certificates')}
                      placeholder="Certificate Name"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <input
                      name="year"
                      value={cert.year || ''}
                      onChange={(e) => handleArrayChange(e, index, 'certificates')}
                      placeholder="Year"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <input
                      name="organization"
                      value={cert.organization || ''}
                      onChange={(e) => handleArrayChange(e, index, 'certificates')}
                      placeholder="Organization"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <input
                      name="link"
                      value={cert.link || ''}
                      onChange={(e) => handleArrayChange(e, index, 'certificates')}
                      placeholder="Certificate Link (optional)"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('certificates')} className="mt-2 text-blue-500 hover:underline">
                  Add More Certificates
                </button>
              </div>

              <div className="mt-4">
                <label htmlFor="workExperience" className="block text-sm font-medium text-gray-700">
                  Work Experience
                </label>
                {formData.workExperience.map((work, index) => (
                  <div key={index} className="space-y-2">
                    <input
                      name="company"
                      value={work.company || ''}
                      onChange={(e) => handleArrayChange(e, index, 'workExperience')}
                      placeholder="Company Name"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <input
                      name="duration"
                      value={work.duration || ''}
                      onChange={(e) => handleArrayChange(e, index, 'workExperience')}
                      placeholder="Duration (e.g., May 2023 - June 2023)"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('workExperience')} className="mt-2 text-blue-500 hover:underline">
                  Add More Work Experience
                </button>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default CandidateDashboard;
