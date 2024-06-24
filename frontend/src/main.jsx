import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { persistor, store } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
// import EmployerDashboard from './pages/EmployerDashboard.jsx';
import RecruiterDashboard from './pages/RecruiterDashboard.jsx';
// import CoordinatorDashboard from './pages/CoordinatorDashboard.jsx';
import CandidateDashboard from './pages/CandidateDashboard.jsx';
import Application from './pages/Application.jsx';
import GetAppliedJob from './pages/GetAppliedJob.jsx';
import CreateJobPost from './components/CreateJobPost.jsx';
import JobStatus from './pages/JobStatus.jsx';
import AssignedRecruiter from './pages/AssignedRecruiter.jsx';
import RecruiterLayout from './Layout/RecruiterLayout.jsx'
import CoordinatorLayout from './Layout/CoordinatorLayout.jsx';
import EmployerLayout from './Layout/EmployerLayout.jsx';
import CandidateLayout from './Layout/CandidateLayout.jsx';
import CandidateApplingJob from './components/CandidateApplingJob.jsx';
import CoordinatorDashboard from './pages/CoordinatorDashboard.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },

      {
        path: '/candidate/dashboard',
        element: (
          <ProtectedRoute role="Candidate">
            <CandidateLayout />
          </ProtectedRoute>
        ),
        children: [
          {path:'home', element:<Home/>},
          { path: 'profile', element: <CandidateDashboard /> },
          { path: 'appling-job', element: <CandidateApplingJob/> },
          { path: 'job-status', element: <JobStatus /> },
        ],
      },

      {
        path: '/employer/dashboard',
        element: (
          <ProtectedRoute role="Employer">
            <EmployerLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: 'create-job-post', element: <CreateJobPost /> },
          { path: 'get-applied-job', element: <GetAppliedJob /> },
        ],
      },

      {
        path: '/coordinator/dashboard',
        element: (
          <ProtectedRoute role="Coordinator">
            <CoordinatorLayout />
          </ProtectedRoute>
        ),
        children: [
          {path:'home',element:<CoordinatorDashboard/>},
          { path: 'assigned-recruiter', element: <AssignedRecruiter /> },
          { path: 'get-applied-job', element: <GetAppliedJob /> },
        ],
      },

      {
        path: '/recruiter/dashboard',
        element: (
          <ProtectedRoute role="Recruiter">
            <RecruiterLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: 'profile', element: <RecruiterDashboard /> },
          { path: 'get-applied-job', element: <GetAppliedJob /> },

        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
