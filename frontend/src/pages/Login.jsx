import React,{Children, useState} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import { signInStart , signInFailed, signInSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
function Login() {
  const navigate=useNavigate()
  const currentUser =useSelector((state)=>state.user)
  console.log(currentUser)
  const dispatch=useDispatch();
  console.log(currentUser)
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});
	const[loading ,setLoading]=useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setInputs({ ...inputs, [name]: value });
	  };
    const handleSubmit= async(e)=>{ 
    e.preventDefault();
    setLoading(true);
    dispatch(signInStart());
    try {
      const { email, password } = inputs;
      const response = await axios.post('/api/v1/users/login', { email, password });
      toast.success("Successfully logged in");
      dispatch(signInSuccess(response.data));

      const userRole = response.data.data.user.role;

      switch (userRole) {
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
        email: "",
        password: "",
      });
    } catch (error) {
      dispatch(signInFailed(error.message));
      setInputs({
        email: "",
        password: "",
      });
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }

  };

  return (
	<div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
        
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            {loading?"loading":"Login"}
          </button>
		  <div className=" flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 ">
		         <p className="mx-2  text-center font-semibold text-slate-500">
            Or
             </p>
		       </div>
           <div className=" font-semibold text-sm m-4 text-slate-500 text-center md:text-left ">
          Don&apos;t have an account?{" "}
          <Link
            className="text-red-600 hover:underline hover:underline-offset-4"
            to="/signup"
          >
            Signup
          </Link>
        </div>
        </form>
      </div>
    </div>
  )
}

export default Login