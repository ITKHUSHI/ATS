import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

  
  const ProtectedRoute = ({ role, children }) => {
    const { currentUser } = useSelector((state) => state.user);
  
    if (!currentUser ) {
      return <Navigate to="/login" />;
    }
   if(currentUser?.data?.user.role !== role){
    return <Navigate to="/"/>
   }
    return children;


  // const { currentUser } = useSelector((state) => state.user);

  // if (!currentUser || !currentUser.data || !currentUser.data.user) {
  //   // If the user is not authenticated, redirect to the login page
  //   return <Navigate to="/signup" />;
  // }

  // const userRole = currentUser.data.user.role;

  // // Check if the user's role is included in the allowedRoles array
  // if (!role.includes(userRole)) {
  //   // If the user's role is not allowed, redirect to unauthorized page or homepage
  //   return <Navigate to="/signup" />;
  // }

  // // If the user is authenticated and has an allowed role, render the children components
  // return children;
};

export default ProtectedRoute;
