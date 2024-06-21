import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { signInStart, signInFailed,signInSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';


function Signup() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [inputs, setInputs] = useState({
    fullname :" ",
    email:" ",
    contact:" ",
    password:" ",
    role:"Candidate"
});
const[loading ,setLoading]=useState(false);
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setInputs({ ...inputs, [name]: value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    dispatch(signInStart());
    const { fullname, email, contact, password, role } = inputs;
    const response=await axios.post('/api/v1/users/singup',{fullname,email, contact, password,role},{
      headers:{
        'Content-Type':'application/json'
      }
    });
    console.log(response.data)
    dispatch(signInSuccess(response.data));
    toast.success("Successfully signed up");

    switch (role) {
      case 'Candidate':
        navigate('/candidate/dashboard');
        break;
      case 'Coordinator':
        navigate('/coordinator/dashboard');
        break;
      case 'Recruiter':
        navigate('/recruiter/dashboard');
        break;
      case 'Employer':
        navigate('/employer/dashboard');
        break;
      default:
        navigate('/');
    }

    setInputs({
      fullname: "",
      email: "",
      contact: "",
      password: "",
      role: "Candidate"
    });
  } catch (error) {
    dispatch(signInFailed(error.message));
    toast.error(error.message);
    setLoading(false);
  }
};

  return (
<>
<div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label htmlFor='fullname' className="block text-gray-700">FullName</label>
            <input
              type="fullname"
              value={inputs.fullname}
              id="fullname"
              name="fullname"
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="FullName"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor='email' className="block text-gray-700">Email</label>
            <input
              type="email"
              value={inputs.email}
              id="eamil"
              name='email'
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor='contact' className="block text-gray-700">Contact</label>
            <input
              type="contact"
              value={inputs.contact}
              id="contact"
              name='contact'
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Contact"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor='password' className="block text-gray-700">Password</label>
            <input
              type="password"
              value={inputs.password}
              name='password'
              id='password'
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Password"
              required
              autoComplete='false'
            />
          </div>
          <div className="mb-4">
            <label htmlFor='role' className="block text-gray-700">Role</label>
            <select
              id="role"
              name="role"
              value={inputs.role}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            >
              <option value="Candidate">Candidate</option>
              <option value="Coordinator">Coordinator</option>
              <option value="Recruiter">Recruiter</option>
              <option value="Employer">Employer</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            {loading?"Loading":"Signup"}
          </button>
          <div className=" flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                    <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
                        Or
                    </p>
                </div>
                <div className="m-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                    Have an account?{" "}
                    <Link
                        className="text-red-600 hover:underline hover:underline-offset-4"
                        to="/login"
                    >
                        Login
                    </Link>
                </div>
        </form>
      </div>
    </div>
   
</>
  )
}

export default Signup