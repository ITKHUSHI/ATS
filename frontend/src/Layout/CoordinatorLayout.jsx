import React from 'react'
// import CoordinatorDashboard from '../pages/CoordinatorDashboard'
import { Outlet } from 'react-router-dom'

function CoordinatorLayout() {
  return (
	<>
	{/* <CoordinatorDashboard/> */}
	<Outlet/>
	</>
  )
}

export default CoordinatorLayout