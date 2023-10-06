import React from 'react'
import { Route, Routes } from 'react-router-dom'
import InterviewSelection from "./InterviewSelection"

const AllRoute = () => {
  return (
    <Routes>
        <Route path='/' element={<InterviewSelection/>}> </Route>
        <Route path="/:interviewType"></Route>
    </Routes>
  )
}

export default AllRoute