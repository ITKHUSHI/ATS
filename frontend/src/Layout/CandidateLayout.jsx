import React from 'react'
// import CandidateDashboard from '../pages/CandidateDashboard'
import { Outlet } from 'react-router-dom'

function CandidateLayout() {
  return (
	<>
	{/* <CandidateDashboard/> */}
	<Outlet/>
	</>
  )
}

export default CandidateLayout