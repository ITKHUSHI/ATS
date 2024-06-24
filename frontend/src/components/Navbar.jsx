import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);

  const renderLinks = () => {

    if (currentUser?.data?.user.role === 'Candidate') {
      return (
        <>
          <Link to="/candidate/dashboard/profile" className="nav-link">Profile</Link>
          <Link to="/candidate/dashboard/appling-job" className="nav-link">Applications</Link>
          <Link to="/candidate/dashboard/job-status" className="nav-link">Job Status</Link>
        </>
      );
    } else if (currentUser?.data?.user.role === 'Employer') {
      return (
        <>
          <Link to="/employer/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/employer/dashboard/create-job-post" className="nav-link">Create Job Post</Link>
          <Link to="/employer/dashboard/get-applied-job" className="nav-link">View Applications</Link>
        </>
      );
    } else if (currentUser?.data?.user.role === 'Coordinator') {
      return (
        <>
          <Link to="/coordinator/dashboard/home" className="nav-link">Dashboard</Link>
          <Link to="/coordinator/dashboard/assigned-recruiter" className="nav-link">Assign Recruiters</Link>
          <Link to="/coordinator/dashboard/get-applied-job" className="nav-link">View Applications</Link>
        </>
      );
    } else if (currentUser?.data?.user.role === 'Recruiter') {
      return (
        <>
          {/* <Link to="/recruiter/dashboard/home" className="nav-link">Home</Link> */}
          <Link to="/recruiter/dashboard/profile" className="nav-link">Profile</Link>
          <Link to="/recruiter/dashboard/get-applied-job" className="nav-link">View Applications</Link>
        </>
      );
    } else {
      return (
        <>
          <Link to="/signup" className="nav-link">Sign Up</Link>
          <Link to="/login" className="nav-link">Log In</Link>
        </>
      );
    }
  };

  return (
    <nav className="bg-red-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className='text-xl font-bold'>ATS Application</h1>
        <div className="flex space-x-4">
          {renderLinks()}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
