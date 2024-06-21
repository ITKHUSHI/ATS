import React from 'react'
// import EmployerDashboard from '../pages/EmployerDashboard'
import { Outlet } from 'react-router-dom'

function EmployerLayout() {
  return (
	<>
	<main>
		{/* <EmployerDashboard/> */}
		<Outlet/>
	</main>
	</>
  )
}

export default EmployerLayout